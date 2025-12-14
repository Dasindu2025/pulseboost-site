(function(){
  const menuBtn = document.querySelector("[data-menu-btn]");
  const mobile = document.querySelector("[data-mobile]");
  if(menuBtn && mobile){
    menuBtn.addEventListener("click", () => {
      const isHidden = mobile.hasAttribute("hidden");
      if(isHidden) mobile.removeAttribute("hidden");
      else mobile.setAttribute("hidden","");
      menuBtn.setAttribute("aria-expanded", String(isHidden));
    });
  }

  // Active link (static pages)
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("[data-nav] a").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if(href === path) a.classList.add("active");
  });
})();
