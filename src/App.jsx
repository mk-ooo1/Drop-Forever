import { useState, useRef, useCallback, useEffect } from "react";

// ── Replace with your real values after AdSense approval ──────────────────────
const ADSENSE_CLIENT = "ca-pub-3652630297983259";
const AD_SLOT_TOP    = "1111111111";
const AD_SLOT_MID    = "2222222222";
const AD_SLOT_BTM    = "3333333333";
const SITE_NAME      = "DropForever";
const SITE_URL       = "https://my-app-chi-eight-73.vercel.app";
const CONTACT_EMAIL  = "bg00998835@gmail.com";
// ──────────────────────────────────────────────────────────────────────────────

function getMediatype(name) {
  const e = name.split(".").pop().toLowerCase();
  if (["apk","ipa","aab","exe","dmg","msi","deb","xapk"].includes(e)) return "software";
  if (["mp4","avi","mkv","mov","webm","flv","wmv"].includes(e))        return "movies";
  if (["mp3","wav","flac","ogg","aac","m4a"].includes(e))              return "audio";
  if (["jpg","jpeg","png","gif","webp","bmp","svg"].includes(e))       return "image";
  if (["pdf","epub","doc","docx","txt","mobi"].includes(e))            return "texts";
  return "data";
}

function getEmoji(name) {
  const e = (name.split(".").pop() || "").toLowerCase();
  if (["apk","ipa","aab","xapk"].includes(e)) return "📱";
  if (["zip","rar","7z","tar","gz"].includes(e)) return "📦";
  if (["pdf","doc","docx","txt"].includes(e)) return "📄";
  if (["mp4","avi","mkv","mov"].includes(e)) return "🎬";
  if (["mp3","wav","flac","ogg"].includes(e)) return "🎵";
  if (["jpg","jpeg","png","gif","webp"].includes(e)) return "🖼️";
  if (["exe","dmg","msi"].includes(e)) return "⚙️";
  return "📁";
}

function fmtBytes(b) {
  if (!b) return "0 B";
  const k=1024, s=["B","KB","MB","GB"];
  const i=Math.floor(Math.log(b)/Math.log(k));
  return (b/Math.pow(k,i)).toFixed(1)+" "+s[i];
}

function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,40); }
function rid()   { return Math.random().toString(36).slice(2,8); }
function today() { return new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}); }

// ── AdSense component ──────────────────────────────────────────────────────────
function Ad({ slot, format="auto" }) {
  const ref = useRef();
  useEffect(() => {
    try { if (window.adsbygoogle && ref.current) (window.adsbygoogle=[]).push({}); } catch(_){}
  }, []);

  const isPending = ADSENSE_CLIENT === "ca-pub-3652630297983259" || ADSENSE_CLIENT.includes("X");

  return (
    <div className="ad-container" style={{
      margin: "60px 0",
      textAlign: "center",
      minHeight: 120,
      padding: "24px 0",
      borderTop: "1px solid #1a1a1a",
      borderBottom: "1px solid #1a1a1a",
      background: "rgba(0,0,0,0.2)",
      position: "relative"
    }}>
      <div style={{
        fontSize: "10px",
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color: "#555",
        marginBottom: "20px",
        fontWeight: "bold"
      }}>
        SPONSORED ADVERTISEMENT
      </div>

      <div style={{ padding: "0 10px" }}>
        {isPending ? (
          <div style={{
            height: 90,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px dashed #222",
            borderRadius: "4px",
            fontSize: "10px",
            color: "#333",
          }}>
            Ad Placement Area
          </div>
        ) : (
          <ins ref={ref} className="adsbygoogle" style={{display:"block"}}
            data-ad-client={ADSENSE_CLIENT} data-ad-slot={slot}
            data-ad-format={format} data-full-width-responsive="true" />
        )}
      </div>

      <div style={{
        marginTop: "12px",
        fontSize: "9px",
        color: "#222",
        letterSpacing: "0.05em"
      }}>
        The content above is an advertisement.
      </div>
    </div>
  );
}

// ── CSS ────────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@700;800&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{background:#080808;color:#dedad3;font-family:'Space Mono',monospace;font-size:13px;line-height:1.6}

  nav{position:sticky;top:0;z-index:100;background:rgba(8,8,8,.94);border-bottom:1px solid #141414;
    backdrop-filter:blur(14px);padding:0 20px;display:flex;align-items:center;
    justify-content:space-between;height:52px}
  .logo{font-family:'Syne',sans-serif;font-weight:800;font-size:17px;color:#dedad3;cursor:pointer;text-decoration:none}
  .logo span{color:#6366f1}
  .nav-r{display:flex;gap:0;align-items:center}
  .nl{background:none;border:none;color:#4a4a4a;font-family:'Space Mono',monospace;
    font-size:10px;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;
    padding:6px 11px;border-radius:3px;transition:color .15s;text-decoration:none}
  .nl:hover{color:#818cf8}
  .nl.on{color:#6366f1}
  .nc{background:#6366f1;color:#fff;border:none;font-family:'Space Mono',monospace;
    font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
    padding:7px 14px;border-radius:4px;cursor:pointer;transition:background .15s;margin-left:6px;text-decoration:none}
  .nc:hover{background:#4f52d4}

  .page{min-height:calc(100vh - 52px);padding:38px 20px 64px;max-width:660px;margin:0 auto;position:relative}
  .bg{position:fixed;inset:0;pointer-events:none;z-index:0;
    background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:56px 56px}
  .bl{position:fixed;border-radius:50%;pointer-events:none;z-index:0;
    background:radial-gradient(circle,rgba(99,102,241,.065) 0%,transparent 70%)}
  .bl1{width:700px;height:700px;top:-280px;right:-180px}
  .bl2{width:500px;height:500px;bottom:-200px;left:-120px}
  .z{position:relative;z-index:1}

  /* Hero */
  .ey{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#6366f1;margin-bottom:8px}
  .h1{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(30px,9vw,50px);
    line-height:.92;letter-spacing:-.02em;color:#dedad3}
  .h1 s2{color:#6366f1}
  .lead{margin-top:10px;font-size:11px;color:#4a4a4a;letter-spacing:.03em}
  .badge{display:inline-flex;align-items:center;gap:6px;margin:12px 0 26px;
    background:rgba(99,102,241,.08);border:1px solid rgba(99,102,241,.2);
    border-radius:20px;padding:4px 12px;font-size:9px;color:#818cf8;letter-spacing:.12em;text-transform:uppercase}
  .badge::before{content:'';width:5px;height:5px;border-radius:50%;background:#6366f1;box-shadow:0 0 6px #6366f1}

  /* Cards */
  .card{background:#0d0d0d;border:1px solid #1c1c1c;border-radius:6px;padding:24px;margin-bottom:24px}
  .ct{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#6366f1;margin-bottom:16px;
    display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #141414;padding-bottom:10px}
  .ct a{color:#3a3a3a;font-size:9px;text-decoration:none;border-bottom:1px solid #272727;
    padding-bottom:1px;transition:color .15s}
  .ct a:hover{color:#818cf8}
  .kg{display:grid;grid-template-columns:1fr 1fr;gap:10px}
  .kl{font-size:9px;color:#4a4a4a;letter-spacing:.12em;margin-bottom:4px}
  .ki{width:100%;background:#111;border:1px solid #222;border-radius:3px;padding:9px 11px;
    font-family:'Space Mono',monospace;font-size:11px;color:#dedad3;outline:none;transition:border-color .15s}
  .ki::placeholder{color:#2a2a2a}
  .ki:focus{border-color:#6366f1}
  .kok{margin-top:9px;font-size:10px;color:#4caf70;display:flex;align-items:center;gap:5px}

  /* Guide */
  .guide{background:#090909;border:1px solid #171717;border-radius:5px;padding:14px 18px;margin-bottom:12px}
  .gt{font-size:9px;color:#2e2e2e;letter-spacing:.18em;text-transform:uppercase;margin-bottom:9px}
  .steps{display:flex;flex-direction:column;gap:7px}
  .step{display:flex;align-items:flex-start;gap:10px}
  .sn{width:19px;height:19px;border:1px solid #222;border-radius:3px;display:flex;
    align-items:center;justify-content:center;font-size:9px;color:#6366f1;flex-shrink:0}
  .st{font-size:11px;color:#3e3e3e;line-height:1.6}
  .st a{color:#6366f1;text-decoration:none}
  .st a:hover{color:#818cf8}

  /* Drop zone */
  .drop{border:1px dashed #1e1e1e;border-radius:6px;padding:50px 28px;text-align:center;
    cursor:pointer;background:#0a0a0a;transition:all .2s}
  .drop:hover,.drop.ov{border-color:#6366f1;border-style:solid;background:#0c0c10}
  .drop.ov{transform:scale(1.01)}
  .di{width:48px;height:48px;border:1px solid #1e1e1e;border-radius:5px;display:flex;
    align-items:center;justify-content:center;margin:0 auto 14px;font-size:22px;
    background:#111;color:#6366f1;transition:all .2s}
  .drop:hover .di,.drop.ov .di{border-color:#6366f1;background:rgba(99,102,241,.1)}
  .dl{font-family:'Syne',sans-serif;font-size:17px;font-weight:700;color:#dedad3;margin-bottom:4px}
  .ds{font-size:11px;color:#3e3e3e}
  .ds b{color:#6366f1;font-weight:400}
  input[type=file]{display:none}

  /* File row */
  .fr{background:#0d0d0d;border:1px solid #1c1c1c;border-radius:5px;padding:14px 18px;
    display:flex;align-items:center;gap:12px}
  .fi{width:40px;height:40px;background:rgba(99,102,241,.1);border:1px solid rgba(99,102,241,.25);
    border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0}
  .fd{flex:1;min-width:0}
  .fn{font-size:12px;color:#dedad3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:2px}
  .fm{font-size:10px;color:#3e3e3e;letter-spacing:.04em}
  .rm{background:none;border:1px solid #1e1e1e;color:#4a4a4a;width:29px;height:29px;
    border-radius:3px;cursor:pointer;display:flex;align-items:center;justify-content:center;
    font-size:13px;flex-shrink:0;transition:all .15s}
  .rm:hover{border-color:#f87171;color:#f87171}

  /* Button */
  .btn{width:100%;padding:13px;margin-top:10px;background:#6366f1;color:#fff;border:none;
    border-radius:5px;font-family:'Space Mono',monospace;font-size:12px;font-weight:700;
    letter-spacing:.12em;text-transform:uppercase;cursor:pointer;transition:all .2s}
  .btn:hover:not(:disabled){background:#4f52d4;transform:translateY(-1px)}
  .btn:disabled{opacity:.4;cursor:not-allowed;transform:none}

  /* Progress */
  .pw{margin-top:9px;background:#111;border:1px solid #1c1c1c;border-radius:4px;height:3px;overflow:hidden}
  .pb{height:100%;background:linear-gradient(90deg,#6366f1,#818cf8);transition:width .3s ease}
  .ps{font-size:10px;color:#3e3e3e;margin-top:6px;text-align:center;letter-spacing:.05em}

  /* Success */
  .suc{background:#0d0d0d;border:1px solid #162616;border-radius:6px;padding:22px;animation:up .4s ease}
  @keyframes up{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  .sh{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
  .ok{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#4caf70;
    display:flex;align-items:center;gap:5px}
  .ok::before{content:'';width:6px;height:6px;border-radius:50%;background:#4caf70;box-shadow:0 0 7px #4caf70}
  .osz{font-size:10px;color:#333}
  .lb{background:#0a0a0a;border:1px solid #1c1c1c;border-radius:4px;padding:10px 13px;
    display:flex;align-items:center;gap:9px;margin-bottom:7px}
  .ltg{font-size:9px;color:#333;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap}
  .lu{flex:1;font-size:11px;color:#818cf8;word-break:break-all;line-height:1.4}
  .cb{background:none;border:1px solid #222;color:#4a4a4a;padding:5px 9px;
    font-family:'Space Mono',monospace;font-size:10px;border-radius:3px;cursor:pointer;
    white-space:nowrap;transition:all .15s;flex-shrink:0}
  .cb:hover{border-color:#6366f1;color:#818cf8}
  .cb.ok2{border-color:#4caf70;color:#4caf70}
  .acts{display:flex;gap:7px;margin-top:10px}
  .act{flex:1;padding:9px;border-radius:4px;font-family:'Space Mono',monospace;
    font-size:10px;letter-spacing:.08em;cursor:pointer;text-align:center;
    text-decoration:none;display:block;transition:all .15s;background:transparent}
  .ap{border:1px solid rgba(99,102,241,.35);color:#818cf8}
  .ap:hover{background:rgba(99,102,241,.1)}
  .as{border:1px solid #1c1c1c;color:#4a4a4a}
  .as:hover{border-color:#333;color:#777}
  .pn{margin-top:12px;padding:11px 13px;background:#111;border:1px solid #fbbf2420;
    border-radius:4px;font-size:10px;color:#fbbf24;line-height:1.7}
  .pn b{color:#fde68a;font-weight:400}
  .en{margin-top:9px;padding-top:11px;border-top:1px solid #131313;
    font-size:10px;color:#2a2a2a;line-height:1.7}
  .en b{color:#4caf70;font-weight:400}
  .err{background:#100c0c;border:1px solid #2a1515;border-radius:4px;padding:12px 15px;
    font-size:11px;color:#f87171;margin-top:9px;animation:up .3s ease;line-height:1.6}

  /* Divider + footer stats */
  .dv{display:flex;align-items:center;gap:12px;margin:22px 0 0}
  .dl2{flex:1;height:1px;background:#131313}
  .dt{font-size:9px;color:#1e1e1e;letter-spacing:.18em;text-transform:uppercase}
  .stats{margin-top:22px;display:flex;gap:22px;flex-wrap:wrap;justify-content:center}
  .stat{text-align:center}
  .sv{font-family:'Syne',sans-serif;font-size:19px;font-weight:700;color:#6366f1}
  .sl{font-size:9px;color:#2a2a2a;letter-spacing:.12em;text-transform:uppercase;margin-top:2px}

  /* Info pages */
  .ip h1{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(24px,6vw,38px);
    line-height:1;color:#dedad3;margin-bottom:7px}
  .ip .upd{font-size:10px;color:#3a3a3a;margin-bottom:26px;letter-spacing:.06em}
  .ip h2{font-family:'Syne',sans-serif;font-size:14px;font-weight:700;color:#dedad3;
    margin:26px 0 9px;border-left:2px solid #6366f1;padding-left:11px}
  .ip p{font-size:12px;color:#555;line-height:1.8;margin-bottom:11px}
  .ip ul{margin:0 0 11px 18px}
  .ip ul li{font-size:12px;color:#555;line-height:1.8;margin-bottom:3px}
  .ip a{color:#6366f1;text-decoration:none}
  .ip a:hover{color:#818cf8}
  .hl{background:#0d0d0d;border:1px solid #1c1c1c;border-radius:4px;padding:13px 15px;margin-bottom:13px}
  .hl p{margin:0;font-size:12px;color:#4a4a4a}
  .feats{display:grid;grid-template-columns:1fr 1fr;gap:11px;margin:14px 0}
  .feat{background:#0d0d0d;border:1px solid #1c1c1c;border-radius:5px;padding:14px}
  .fi2{font-size:20px;margin-bottom:7px}
  .ft{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:#dedad3;margin-bottom:3px}
  .fd2{font-size:10px;color:#4a4a4a;line-height:1.6}
  .cf{display:flex;flex-direction:column;gap:12px;margin-top:7px}
  .cfr{display:grid;grid-template-columns:1fr 1fr;gap:10px}
  .cfl{font-size:9px;color:#4a4a4a;letter-spacing:.12em;text-transform:uppercase;margin-bottom:4px}
  .cfi,.cft{width:100%;background:#0d0d0d;border:1px solid #1c1c1c;border-radius:4px;
    padding:9px 11px;font-family:'Space Mono',monospace;font-size:11px;color:#dedad3;
    outline:none;transition:border-color .15s}
  .cfi:focus,.cft:focus{border-color:#6366f1}
  .cft{resize:vertical;min-height:90px}
  .csent{background:#0a120a;border:1px solid #1a2e1a;border-radius:4px;padding:14px;
    font-size:11px;color:#4caf70;text-align:center;margin-top:7px}

  footer{background:#040404;border-top:1px solid #0e0e0e;padding:22px 20px;text-align:center}
  .fl{display:flex;gap:0;justify-content:center;flex-wrap:wrap;margin-bottom:9px}
  .flk{background:none;border:none;color:#2a2a2a;font-family:'Space Mono',monospace;
    font-size:10px;letter-spacing:.08em;cursor:pointer;padding:4px 10px;transition:color .15s;text-decoration:none}
  .flk:hover{color:#6366f1}
  .fc{font-size:10px;color:#1e1e1e;letter-spacing:.06em}
  .fc a{color:#2a2a2a;text-decoration:none}

  @media(max-width:480px){.kg,.feats,.cfr{grid-template-columns:1fr}.nav-r .nl:nth-child(n+3){display:none}}
`;

// ═══════════════════════════════════════════════════════════════════════════════
// HOME — Uploader
// ═══════════════════════════════════════════════════════════════════════════════
function Home() {
  const [ak, setAk]   = useState(() => localStorage.getItem("ia_ak") || "");
  const [sk, setSk]   = useState(() => localStorage.getItem("ia_sk") || "");
  const [saved, setSaved] = useState(!!localStorage.getItem("ia_ak"));
  const [file, setFile]   = useState(null);
  const [over, setOver]   = useState(false);
  const [upling, setUpl]  = useState(false);
  const [prog, setProg]   = useState(0);
  const [status, setStat] = useState("");
  const [result, setRes]  = useState(null);
  const [error, setErr]   = useState(null);
  const [copied, setCop]  = useState("");
  const inputRef = useRef();

  const saveKeys = () => {
    localStorage.setItem("ia_ak", ak.trim());
    localStorage.setItem("ia_sk", sk.trim());
    setSaved(true);
  };

  const pick = useCallback((f) => {
    if (!f) return;
    setFile(f); setRes(null); setErr(null);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault(); setOver(false);
    pick(e.dataTransfer.files[0]);
  }, [pick]);

  const upload = () => {
    if (!file) return;
    const access = ak.trim(), secret = sk.trim();
    if (!access || !secret) { setErr("Enter your Archive.org API keys first."); return; }

    setUpl(true); setProg(0); setErr(null); setStat("Connecting...");

    const identifier = `ds-${slug(file.name.replace(/\.[^.]+$/,""))}-${rid()}`;
    const mt = getMediatype(file.name);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload", true);         // ← goes through Vercel proxy

    // Send metadata as headers (not in body, to keep body = raw file)
    xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");
    xhr.setRequestHeader("x-file-name",  file.name);
    xhr.setRequestHeader("x-identifier", identifier);
    xhr.setRequestHeader("x-mediatype",  mt);
    xhr.setRequestHeader("x-ak",         access);
    xhr.setRequestHeader("x-sk",         secret);

    // Track upload progress (browser → Vercel edge function)
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const pct = Math.round((e.loaded / e.total) * 90);
        setProg(pct);
        setStat(`Uploading ${(e.loaded/1048576).toFixed(1)} MB / ${(e.total/1048576).toFixed(1)} MB...`);
      }
    };

    xhr.onload = () => {
      setProg(100); setStat("Done!");
      try {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status === 200 && data.success) {
          setTimeout(() => {
            setRes({ downloadUrl: data.downloadUrl, itemUrl: data.itemUrl, name: file.name, size: file.size, mt });
            setUpl(false); setStat("");
          }, 500);
        } else {
          setErr(data.error || `Upload failed (HTTP ${xhr.status}). Please try again.`);
          setUpl(false); setProg(0); setStat("");
        }
      } catch (_) {
        setErr(`Unexpected response (HTTP ${xhr.status}). Please try again.`);
        setUpl(false); setProg(0); setStat("");
      }
    };

    xhr.onerror = () => {
      setErr("Network error. Check your internet connection.");
      setUpl(false); setProg(0); setStat("");
    };

    xhr.send(file);    // send raw file as body
  };

  const copy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCop(key);
    setTimeout(() => setCop(""), 2000);
  };

  const reset = () => { setFile(null); setRes(null); setErr(null); setProg(0); };
  const rdy = ak.trim().length > 4 && sk.trim().length > 4;

  return (
    <div className="page">
      <div className="z">
        <div className="ey">// Permanent File Hosting — 100% Free</div>
        <div className="h1">DROP<s2>.</s2><br/>FOREVER<s2>.</s2></div>
        <div className="lead">Upload any file — APK, video, image, ZIP — get a download link that never expires.</div>
        <div className="badge">Powered by Internet Archive · Non-profit · Since 1996</div>

        {/* Keys */}
        <div className="card">
          <div className="ct">
            <span>// Archive.org S3 API Keys</span>
            <a href="https://archive.org/account/s3.php" target="_blank" rel="noreferrer">Get free keys →</a>
          </div>
          <div className="kg">
            <div>
              <div className="kl">ACCESS KEY</div>
              <input className="ki" type="text" placeholder="Paste access key..."
                value={ak} onChange={e=>{setAk(e.target.value);setSaved(false);}} />
            </div>
            <div>
              <div className="kl">SECRET KEY</div>
              <input className="ki" type="password" placeholder="Paste secret key..."
                value={sk} onChange={e=>{setSk(e.target.value);setSaved(false);}} />
            </div>
          </div>
          {rdy && !saved && <button className="btn" onClick={saveKeys}>Save Keys</button>}
          {saved && <div className="kok">✓ Keys saved — ready to upload</div>}
        </div>

        {/* Guide */}
        {!saved && (
          <div className="guide">
            <div className="gt">// How to get free API keys (2 min)</div>
            <div className="steps">
              {[
                <>Create a free account at <a href="https://archive.org/account/login.createaccount.php" target="_blank" rel="noreferrer">archive.org</a></>,
                <>Go to <a href="https://archive.org/account/s3.php" target="_blank" rel="noreferrer">archive.org/account/s3.php</a> — copy your S3 keys</>,
                <>Paste Access Key + Secret Key above → click Save Keys</>,
                <>Upload any file — APK, video, zip — link works forever</>,
              ].map((t,i)=>(
                <div className="step" key={i}><div className="sn">{i+1}</div><div className="st">{t}</div></div>
              ))}
            </div>
          </div>
        )}

        {/* Upload area */}
        {!result ? (
          <>
            {!file ? (
              <div className={"drop"+(over?" ov":"")}
                onDrop={onDrop}
                onDragOver={e=>{e.preventDefault();setOver(true);}}
                onDragLeave={()=>setOver(false)}
                onClick={()=>inputRef.current.click()}>
                <div className="di">⬆</div>
                <div className="dl">Drop your file here</div>
                <div className="ds">or <b>click to browse</b> — APK, ZIP, MP4, PDF, any type, any size</div>
                <input ref={inputRef} type="file" onChange={e=>pick(e.target.files[0])} />
              </div>
            ) : (
              <div className="fr">
                <div className="fi">{getEmoji(file.name)}</div>
                <div className="fd">
                  <div className="fn">{file.name}</div>
                  <div className="fm">{fmtBytes(file.size)} · {(file.name.split(".").pop()||"FILE").toUpperCase()} · {getMediatype(file.name)}</div>
                </div>
                <button className="rm" onClick={reset}>✕</button>
              </div>
            )}

            {file && (
              <>
                <button className="btn" onClick={upload} disabled={upling||!rdy}>
                  {upling?"Uploading...":!rdy?"Enter API Keys First":"▲  Upload Permanently"}
                </button>
                {upling && (
                  <>
                    <div className="pw"><div className="pb" style={{width:prog+"%"}} /></div>
                    <div className="ps">{status} — {prog}%</div>
                  </>
                )}
              </>
            )}
            {error && <div className="err">⚠ {error}</div>}
          </>
        ) : (
          <div className="suc">
            <div className="sh">
              <div className="ok">Permanently Archived</div>
              <div className="osz">{fmtBytes(result.size)} · {result.mt}</div>
            </div>
            <div className="lb">
              <div className="ltg">Direct Link</div>
              <div className="lu">{result.downloadUrl}</div>
              <button className={"cb"+(copied==="dl"?" ok2":"")} onClick={()=>copy(result.downloadUrl,"dl")}>
                {copied==="dl"?"✓ Done":"Copy"}
              </button>
            </div>
            <div className="lb">
              <div className="ltg">Item Page</div>
              <div className="lu">{result.itemUrl}</div>
              <button className={"cb"+(copied==="item"?" ok2":"")} onClick={()=>copy(result.itemUrl,"item")}>
                {copied==="item"?"✓ Done":"Copy"}
              </button>
            </div>
            <div className="acts">
              <a href={result.downloadUrl} target="_blank" rel="noreferrer" className="act ap">↗ Download File</a>
              <a href={result.itemUrl} target="_blank" rel="noreferrer" className="act ap">☰ View on Archive.org</a>
            </div>

            <div style={{margin: "40px 0"}}>
               <div style={{height: "1px", background: "#1a1a1a"}} />
            </div>

            <div className="as-wrap" style={{textAlign: "center"}}>
               <button className="act as" onClick={reset} style={{display: "inline-block", width: "auto", padding: "10px 30px"}}>+ Upload Another File</button>
            </div>
            <div className="pn">
              ⏳ <b>Wait 1–5 minutes</b> before clicking the link — Archive.org needs a moment to register new items. If it shows "not available", wait briefly and refresh.
            </div>
            <div className="en">
              ♾ <b>This link never expires.</b> No download requirements, no inactivity rules, no time limits. Ever.
            </div>
          </div>
        )}

        <div className="dv"><div className="dl2"/><div className="dt">Internet Archive · archive.org · Est. 1996</div><div className="dl2"/></div>
        <div className="stats">
          {[["♾","Never Expires"],["∞","No Size Limit"],["Free","Always Free"],["30PB+","Data Stored"]].map(([v,l])=>(
            <div className="stat" key={l}><div className="sv">{v}</div><div className="sl">{l}</div></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PRIVACY POLICY
// ═══════════════════════════════════════════════════════════════════════════════
function Privacy() {
  return (
    <div className="page ip">
      <div className="z">
        <div className="ey">// Legal</div>
        <h1>Privacy Policy</h1>
        <p className="upd">Last updated: {today()}</p>
        <div className="hl"><p>This Privacy Policy explains how {SITE_NAME} ("{SITE_URL}") collects, uses, and protects your information.</p></div>

        <h2>1. Information We Collect</h2>
        <ul>
          <li><strong>Files you upload</strong> are sent directly to Internet Archive. We do not store files on our servers.</li>
          <li><strong>API Keys</strong> are stored only in your browser's localStorage. Never sent to our servers.</li>
          <li><strong>Usage data</strong> via Google Analytics and Google AdSense (anonymous page views, usage patterns).</li>
          <li><strong>Cookies</strong> used by Google AdSense for advertising and preference storage.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To provide and improve our file hosting service</li>
          <li>To display relevant advertisements via Google AdSense</li>
          <li>To analyze website traffic anonymously</li>
        </ul>

        <h2>3. Google AdSense & Advertising</h2>
        <p>We use Google AdSense to display ads. Google uses the DoubleClick cookie to serve ads based on your interests.</p>
        <ul>
          <li>Opt out: <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer">Google Ads Settings</a></li>
          <li>More info: <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer">Google's Privacy & Terms</a></li>
        </ul>

        <h2>4. Third-Party Services</h2>
        <ul>
          <li><strong>Internet Archive:</strong> Files are stored on their servers. See <a href="https://archive.org/about/terms.php" target="_blank" rel="noreferrer">their Terms</a> and <a href="https://archive.org/about/privacy.php" target="_blank" rel="noreferrer">Privacy Policy</a>.</li>
          <li><strong>Google AdSense:</strong> See <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google Privacy Policy</a>.</li>
        </ul>

        <h2>5. Cookies</h2>
        <ul>
          <li><strong>Essential:</strong> Store your API keys locally for convenience</li>
          <li><strong>Advertising:</strong> Google AdSense cookies for relevant ads</li>
          <li><strong>Analytics:</strong> Anonymous usage tracking</li>
        </ul>

        <h2>6. Data Security</h2>
        <p>Your API keys are stored only in your browser and never transmitted to our servers. All file uploads use HTTPS.</p>

        <h2>7. Children's Privacy</h2>
        <p>Our service is not directed at children under 13. We do not knowingly collect information from children under 13.</p>

        <h2>8. Your Rights</h2>
        <ul>
          <li>Clear locally stored keys anytime via browser settings</li>
          <li>Request file deletion by contacting Internet Archive directly</li>
          <li>Opt out of personalized advertising via Google Ads Settings</li>
        </ul>

        <h2>9. Contact</h2>
        <p>Questions? Email us: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TERMS OF SERVICE
// ═══════════════════════════════════════════════════════════════════════════════
function Terms() {
  return (
    <div className="page ip">
      <div className="z">
        <div className="ey">// Legal</div>
        <h1>Terms of Service</h1>
        <p className="upd">Last updated: {today()}</p>
        <div className="hl"><p>By using {SITE_NAME}, you agree to these Terms. Please read them carefully.</p></div>

        <h2>1. Acceptance</h2>
        <p>By accessing {SITE_NAME} at {SITE_URL}, you agree to these Terms and our Privacy Policy.</p>

        <h2>2. Description of Service</h2>
        <p>{SITE_NAME} provides a free file hosting interface that uploads files to Internet Archive (archive.org) and generates shareable download links.</p>

        <h2>3. Prohibited Content</h2>
        <p>You must NOT upload:</p>
        <ul>
          <li>Content violating copyright or intellectual property rights</li>
          <li>Malware, viruses, or malicious software</li>
          <li>Illegal content of any kind</li>
          <li>Content violating Internet Archive's Terms of Service</li>
          <li>Personal data of others without consent</li>
          <li>Adult, explicit, or harmful content</li>
        </ul>

        <h2>4. Internet Archive Terms</h2>
        <p>Files are stored on Internet Archive's servers. You must comply with <a href="https://archive.org/about/terms.php" target="_blank" rel="noreferrer">their Terms of Service</a>.</p>

        <h2>5. API Keys & Security</h2>
        <p>You are responsible for keeping your API keys secure. You are responsible for all uploads made with your keys.</p>

        <h2>6. No Warranty</h2>
        <p>{SITE_NAME} is provided "as is". We do not guarantee uninterrupted service or permanent file availability (subject to Internet Archive's policies).</p>

        <h2>7. Limitation of Liability</h2>
        <p>{SITE_NAME} is not liable for any indirect, incidental, or consequential damages arising from your use of our service.</p>

        <h2>8. Advertising</h2>
        <p>Our service is supported by Google AdSense advertising. By using our service, you consent to the display of ads.</p>

        <h2>9. Contact</h2>
        <p>Questions: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ABOUT
// ═══════════════════════════════════════════════════════════════════════════════
function About() {
  return (
    <div className="page ip">
      <div className="z">
        <div className="ey">// About Us</div>
        <h1>About {SITE_NAME}</h1>
        <p className="upd">Free · Permanent · No Account Needed</p>

        <p>{SITE_NAME} is a free file hosting service. Upload any file — APK, video, image, document — and get a permanent download link instantly. No subscription, no limits.</p>
        <p>We use Internet Archive's permanent infrastructure, a non-profit digital library founded in 1996 that has archived over 30 petabytes of data.</p>

        <h2>What We Support</h2>
        <div className="feats">
          {[
            {icon:"📱",t:"APK Files",d:"Android APKs, IPAs, AABs — any app file."},
            {icon:"🎬",t:"Videos",d:"MP4, MKV, AVI, MOV — any size."},
            {icon:"📦",t:"Archives",d:"ZIP, RAR, 7Z, TAR and more."},
            {icon:"🎵",t:"Audio",d:"MP3, WAV, FLAC, OGG permanently."},
            {icon:"🖼️",t:"Images",d:"JPG, PNG, GIF, WebP and more."},
            {icon:"📄",t:"Documents",d:"PDF, DOCX, TXT — any format."},
          ].map(({icon,t,d})=>(
            <div className="feat" key={t}>
              <div className="fi2">{icon}</div>
              <div className="ft">{t}</div>
              <div className="fd2">{d}</div>
            </div>
          ))}
        </div>

        <h2>How It Works</h2>
        <div className="steps" style={{margin:"10px 0"}}>
          {["Get free API keys from archive.org (2 minutes)",
            "Enter keys once — saved locally in your browser",
            "Upload any file — type is auto-detected for best compatibility",
            "Get a permanent download link instantly"].map((t,i)=>(
            <div className="step" key={i}><div className="sn">{i+1}</div><div className="st">{t}</div></div>
          ))}
        </div>

        <Ad slot={AD_SLOT_TOP} format="horizontal" />

        <h2>Privacy & Security</h2>
        <p>Your API keys are stored only in your browser and never sent to our servers. Files upload securely via HTTPS directly to Internet Archive.</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONTACT
// ═══════════════════════════════════════════════════════════════════════════════
function Contact() {
  const [form, setForm] = useState({name:"",email:"",subject:"",message:""});
  const [sent, setSent] = useState(false);
  const h = (k,v) => setForm(f=>({...f,[k]:v}));
  const send = () => {
    if (!form.name||!form.email||!form.message) return;
    const sub = encodeURIComponent(form.subject||`Contact from ${SITE_NAME}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`mailto:${CONTACT_EMAIL}?subject=${sub}&body=${body}`);
    setSent(true);
  };
  const ok = form.name&&form.email&&form.message;
  return (
    <div className="page ip">
      <div className="z">
        <div className="ey">// Get In Touch</div>
        <h1>Contact Us</h1>
        <p className="upd">We respond within 24–48 hours</p>
        <p>Questions, bug reports, or feedback? Email us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or use the form below.</p>

        {!sent ? (
          <div className="card" style={{marginTop:18}}>
            <div className="ct"><span>// Send a Message</span></div>
            <div className="cf">
              <div className="cfr">
                <div><div className="cfl">Name *</div><input className="cfi" placeholder="Your name" value={form.name} onChange={e=>h("name",e.target.value)} /></div>
                <div><div className="cfl">Email *</div><input className="cfi" type="email" placeholder="bg00998835@gmail.com" value={form.email} onChange={e=>h("email",e.target.value)} /></div>
              </div>
              <div><div className="cfl">Subject</div><input className="cfi" placeholder="What is this about?" value={form.subject} onChange={e=>h("subject",e.target.value)} /></div>
              <div><div className="cfl">Message *</div><textarea className="cft" placeholder="Your message..." value={form.message} onChange={e=>h("message",e.target.value)} /></div>
              <button className="btn" onClick={send} disabled={!ok} style={{marginTop:0}}>Send Message</button>
            </div>
          </div>
        ) : (
          <div className="csent">✓ Message ready — your email client should open. If not, email {CONTACT_EMAIL} directly.</div>
        )}

        <h2>FAQ</h2>
        {[
          ["Why does my link say 'not available'?","Archive.org takes 1–5 minutes to register new uploads. Wait and try again."],
          ["Is there a file size limit?","No. Any size file is supported."],
          ["Can I upload APK files?","Yes. APKs are uploaded as 'software' type which Archive.org fully supports."],
          ["How long will my file stay online?","Forever — Internet Archive permanently preserves all content."],
          ["Are my API keys safe?","Yes. Keys are stored only in your browser, never on our servers."],
        ].map(([q,a])=>(
          <div key={q} style={{marginBottom:14}}>
            <p style={{color:"#818cf8",marginBottom:3}}>Q: {q}</p>
            <p style={{marginBottom:0}}>A: {a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState(() => window.location.hash.replace("#/","") || "home");

  useEffect(() => {
    const handleHash = () => {
      const h = window.location.hash.replace("#/","") || "home";
      setPage(h);
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  useEffect(() => {
    if (ADSENSE_CLIENT.includes("X")) return;
    if (document.querySelector("script[data-ads]")) return;
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    s.crossOrigin = "anonymous";
    s.setAttribute("data-ads","1");
    document.head.appendChild(s);
  }, []);

  useEffect(() => { window.scrollTo(0,0); }, [page]);

  return (
    <>
      <style>{css}</style>
      <div className="bg"/>
      <div className="bl bl1"/><div className="bl bl2"/>

      <nav>
        <a href="#/" className="logo">Drop<span>.</span>Forever</a>
        <div className="nav-r">
          {[["home","Home"],["about","About"],["contact","Contact"]].map(([k,l])=>(
            <a key={k} href={`#/${k}`} className={"nl"+(page===k?" on":"")}>{l}</a>
          ))}
          <a href="#/home" className="nc">Upload Free</a>
        </div>
      </nav>

      {page==="home"    && <Home />}
      {page==="about"   && <About />}
      {page==="contact" && <Contact />}
      {page==="privacy" && <Privacy />}
      {page==="terms"   && <Terms />}

      <footer>
        <div className="fl">
          {[["home","Home"],["about","About"],["contact","Contact"],["privacy","Privacy Policy"],["terms","Terms of Service"]].map(([k,l])=>(
            <a key={k} href={`#/${k}`} className="flk">{l}</a>
          ))}
        </div>
        <div className="fc">© {new Date().getFullYear()} {SITE_NAME} · <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></div>
      </footer>
    </>
  );
}
