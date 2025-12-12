(function(){
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  document.querySelectorAll("[data-nav] a").forEach(a=>{
    const href = (a.getAttribute("href")||"").toLowerCase();
    if(href === path) a.classList.add("active");
  });

  const btn = document.getElementById("menuBtn");
  const panel = document.getElementById("mobilePanel");
  if(panel) panel.classList.remove("open");

  if(btn && panel){
    btn.addEventListener("click", ()=>{
      const open = panel.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true":"false");
    });
    panel.querySelectorAll("a").forEach(a=>a.addEventListener("click", ()=>{
      panel.classList.remove("open");
      btn.setAttribute("aria-expanded","false");
    }));
  }

  const y=document.getElementById("year");
  if(y) y.textContent = new Date().getFullYear();
})();
