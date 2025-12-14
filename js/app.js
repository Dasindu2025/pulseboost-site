/* PulseBoost — App (clean, modular, no DOM chaos) */
(() => {
  const $ = (q, r=document) => r.querySelector(q);
  const $$ = (q, r=document) => Array.from(r.querySelectorAll(q));

  const state = {
    demoOn: false,
    theme: document.documentElement.getAttribute("data-theme") || "dark",
    tlRunning: false,
    tlProgress: 0
  };

  // ---------- Theme ----------
  function setTheme(t){
    state.theme = (t === "light") ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", state.theme);
    try{ localStorage.setItem("pb_theme", state.theme); }catch(_){}
  }
  try{ const saved = localStorage.getItem("pb_theme"); if (saved) setTheme(saved); }catch(_){}

  // ---------- Toast ----------
  const toast = $("#toast");
  let toastTimer = null;
  function showToast(msg){
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=> toast.classList.remove("on"), 1100);
  }

  // ---------- Topbar elevation ----------
  const topbar = $(".topbar");
  const setElev = () => { if(topbar) topbar.dataset.elevated = (window.scrollY > 8) ? "true" : "false"; };
  window.addEventListener("scroll", setElev, { passive:true });
  setElev();

  // ---------- Drawer ----------
  const drawer = $("#drawer");
  const openDrawer = () => { if(!drawer) return; drawer.dataset.open="true"; document.body.style.overflow="hidden"; };
  const closeDrawer = () => { if(!drawer) return; drawer.dataset.open="false"; document.body.style.overflow=""; };

  // ---------- Command palette ----------
  const palette = $("#palette");
  const openPalette = () => { if(!palette) return; palette.dataset.open="true"; $("#palInput")?.focus(); };
  const closePalette = () => { if(!palette) return; palette.dataset.open="false"; };

  // ---------- Telemetry demo ----------
  const spark = $("#spark");
  let ctx = null;
  if (spark) ctx = spark.getContext("2d", { alpha:true });

  const mCPU = $("#m_cpu"), mGPU = $("#m_gpu"), mFPS = $("#m_fps");
  let t = 0;
  let series = new Array(120).fill(0).map((_,i)=> 0.52 + Math.sin(i*0.2)*0.05);

  function drawSpark(){
    if (!ctx || !spark) return;
    const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
    const w = spark.clientWidth || 1, h = spark.clientHeight || 1;
    if (spark.width !== w*dpr || spark.height !== h*dpr){
      spark.width = w*dpr; spark.height = h*dpr;
      ctx.setTransform(dpr,0,0,dpr,0,0);
    }
    ctx.clearRect(0,0,w,h);

    ctx.globalAlpha = 0.25;
    ctx.strokeStyle = "rgba(255,255,255,.10)";
    ctx.lineWidth = 1;
    for (let y=18; y<h; y+=18){
      ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke();
    }
    ctx.globalAlpha = 1;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(0,212,255,.85)";
    ctx.beginPath();
    for (let i=0;i<series.length;i++){
      const x = (i/(series.length-1))*w;
      const y = h - (series[i] * (h*0.85)) - (h*0.08);
      if (i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    }
    ctx.stroke();

    ctx.globalAlpha = 0.25;
    ctx.lineWidth = 6;
    ctx.strokeStyle = "rgba(0,212,255,.35)";
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function tick(){
    if (!state.demoOn) return;
    t += 0.06;
    const cpu = 42 + Math.sin(t*1.2)*6 + (Math.random()-0.5)*2;
    const gpu = 56 + Math.sin(t*0.9+1.1)*5 + (Math.random()-0.5)*2;
    const fps = 115 + Math.sin(t*1.1+0.4)*8 + (Math.random()-0.5)*3;

    if (mCPU) mCPU.textContent = `${Math.round(cpu)}%`;
    if (mGPU) mGPU.textContent = `${Math.round(gpu)}%`;
    if (mFPS) mFPS.textContent = `${Math.round(fps)} fps`;

    const v = 0.52 + Math.sin(t*1.1)*0.06 + (Math.random()-0.5)*0.03;
    series.shift(); series.push(Math.max(0.25, Math.min(0.85, v)));
    drawSpark();

    requestAnimationFrame(tick);
  }

  function startDemo(){
    state.demoOn = true;
    requestAnimationFrame(tick);
    showToast("Live demo running");
  }

  // ---------- Timeline (animated, calm) ----------
  const tl = $("#timeline");
  const tlFill = $("#tlFill");
  const tlMarker = $("#tlMarker");
  const tlEvents = $$("[data-tl-step]");
  const tlStart = () => {
    if (!tl || state.tlRunning) return;
    state.tlRunning = true;
    const start = performance.now();
    const dur = 5200; // calm, not flashy

    const frame = (now) => {
      const p = Math.min(1, (now - start) / dur);
      state.tlProgress = p;
      const pct = Math.round(p * 100);

      if (tlFill) tlFill.style.width = `${pct}%`;
      if (tlMarker) tlMarker.style.left = `${pct}%`;

      const step = Math.min(3, Math.floor(p * 4)); // 0..3
      tlEvents.forEach(el => {
        const s = parseInt(el.getAttribute("data-tl-step") || "0", 10);
        el.classList.toggle("active", s <= step);
      });

      if (p < 1) requestAnimationFrame(frame);
      else { state.tlRunning = false; }
    };
    requestAnimationFrame(frame);
  };

  if (tl){
    const io = new IntersectionObserver((entries)=>{
      for (const e of entries){
        if (e.isIntersecting){ tlStart(); io.disconnect(); break; }
      }
    }, { threshold: 0.22 });
    io.observe(tl);
  }

  // ---------- Games Lab Filters ----------
  function setFilter(val){
    const pills = $$("[data-filter]");
    pills.forEach(p => p.setAttribute("aria-pressed", (p.getAttribute("data-filter") === val) ? "true" : "false"));

    const cards = $$("[data-game]");
    cards.forEach(card => {
      const tags = (card.getAttribute("data-tags") || "").toLowerCase();
      const show = (val === "all") || tags.includes(val);
      card.style.display = show ? "" : "none";
    });
  }

  // ---------- Copy-to-clipboard ----------
  async function copyFromTarget(sel){
    const el = $(sel);
    if (!el) return;
    const text = el.innerText || el.textContent || "";
    try{
      await navigator.clipboard.writeText(text.trim());
      showToast("Copied diagnostics");
    }catch(_){
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text.trim();
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      showToast("Copied diagnostics");
    }
  }

  // ---------- Event delegation ----------
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-action],[data-filter]");
    if (!a) return;

    if (a.hasAttribute("data-filter")){
      setFilter(a.getAttribute("data-filter") || "all");
      return;
    }

    const act = a.getAttribute("data-action");
    if (act === "toggleTheme") setTheme(state.theme === "dark" ? "light" : "dark");
    if (act === "openDrawer") openDrawer();
    if (act === "closeDrawer") closeDrawer();
    if (act === "openPalette") openPalette();
    if (act === "closePalette") closePalette();
    if (act === "runDemo") startDemo();

    if (act === "download"){
      window.location.href = a.getAttribute("data-href") || "./pages/download.html";
    }

    if (act === "copyDiag"){
      const target = a.getAttribute("data-target");
      if (target) copyFromTarget(target);
    }
  });

  // drawer
  if (drawer){
    drawer.addEventListener("click", (e) => {
      if (e.target.matches(".drawerBg")) closeDrawer();
      if (e.target.closest("a")) closeDrawer();
    });
  }

  // palette
  if (palette){
    palette.addEventListener("click", (e) => {
      if (e.target.matches(".drawerBg")) closePalette();
    });
  }

  // ---------- Keyboard shortcuts ----------
  document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();

    if (e.ctrlKey && key === "k"){ e.preventDefault(); openPalette(); }
    if (!e.ctrlKey && key === "t"){ setTheme(state.theme === "dark" ? "light" : "dark"); }

    if (e.key === "Escape"){
      if (drawer?.dataset.open === "true") closeDrawer();
      if (palette?.dataset.open === "true") closePalette();
    }

    if (e.ctrlKey && key === "d"){
      e.preventDefault();
      const dl = document.querySelector("[data-action='download']");
      if (dl) dl.click();
    }
  });

  // palette filter
  const palInput = $("#palInput");
  if (palInput){
    palInput.addEventListener("input", () => {
      const q = palInput.value.trim().toLowerCase();
      $$("[data-cmd]").forEach(el => {
        const v = (el.getAttribute("data-cmd") || "").toLowerCase();
        el.style.display = v.includes(q) ? "" : "none";
      });
    });
  }

  // initial
  document.documentElement.classList.add("pageFade");
  drawSpark();

  // default filter on games
  if ($("[data-filter='all']")) setFilter("all");
})();
