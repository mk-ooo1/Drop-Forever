// ─────────────────────────────────────────────────────────────────────────────
// FILE: api/upload.js   (place this inside your /api folder in Vercel project)
// PURPOSE: Proxy upload to Archive.org server-side — fixes CORS/503 error
// RUNTIME: Vercel Edge (supports streaming, no body size limit, no timeout)
// ─────────────────────────────────────────────────────────────────────────────

export const config = { runtime: "edge" };

export default async function handler(req) {
  // ── CORS preflight ────────────────────────────────────────────────────────
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "*",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ── Read metadata from request headers ───────────────────────────────────
  const filename   = req.headers.get("x-file-name");
  const identifier = req.headers.get("x-identifier");
  const mediatype  = req.headers.get("x-mediatype") || "data";
  const ak         = req.headers.get("x-ak");
  const sk         = req.headers.get("x-sk");
  const contentType = req.headers.get("content-type") || "application/octet-stream";

  if (!filename || !identifier || !ak || !sk) {
    return new Response(JSON.stringify({ error: "Missing required headers." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ── Forward upload to Archive.org S3 API ─────────────────────────────────
  const iaUrl = `https://s3.us.archive.org/${identifier}/${encodeURIComponent(filename)}`;

  let iaRes;
  try {
    iaRes = await fetch(iaUrl, {
      method: "PUT",
      headers: {
        "Authorization":                  `LOW ${ak}:${sk}`,
        "Content-Type":                   contentType,
        "x-amz-auto-make-bucket":         "1",
        "x-archive-meta-mediatype":       mediatype,
        "x-archive-queue-derive":         "0",
        "x-archive-meta-access":          "public",
        "x-archive-meta-title":           filename,
        "x-archive-meta-subject":         "file-hosting",
        "x-archive-meta-description":     "Uploaded via DropForever",
      },
      body: req.body,         // stream file body directly to Archive.org
      duplex: "half",         // required for streaming request body
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: `Network error: ${err.message}` }), {
      status: 502,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  // ── Handle Archive.org errors ─────────────────────────────────────────────
  if (!iaRes.ok) {
    let detail = "";
    try { detail = await iaRes.text(); } catch (_) {}

    const friendly =
      iaRes.status === 401 ? "Invalid API keys. Check your Access & Secret Key." :
      iaRes.status === 403 ? "Access denied. Make sure your Archive.org account has S3 API enabled." :
      iaRes.status === 503 ? "Archive.org is temporarily unavailable. Try again in a minute." :
      `Archive.org returned HTTP ${iaRes.status}.`;

    return new Response(JSON.stringify({ error: friendly, detail: detail.slice(0, 300) }), {
      status: iaRes.status,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  // ── Success — return permanent links ──────────────────────────────────────
  const downloadUrl = `https://archive.org/download/${identifier}/${encodeURIComponent(filename)}`;
  const itemUrl     = `https://archive.org/details/${identifier}`;

  return new Response(JSON.stringify({ success: true, downloadUrl, itemUrl }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
