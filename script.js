const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav2 a");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    const icon = menuToggle.querySelector("i");
    icon.className = isOpen ? "ri-close-line" : "ri-menu-3-line";
  });
}

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks?.classList.remove("active");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      const icon = menuToggle.querySelector("i");
      icon.className = "ri-menu-3-line";
    }
  });
});

const sections = document.querySelectorAll("main section");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navItems.forEach((link) => link.classList.remove("active"));
      const activeLink = document.querySelector(`.nav2 a[href="#${entry.target.id}"]`);
      if (activeLink) {
        activeLink.classList.add("active");
      }
    });
  },
  { rootMargin: "-35% 0px -45% 0px", threshold: 0.2 }
);

sections.forEach((section) => sectionObserver.observe(section));

window.addEventListener("resize", () => {
  if (window.innerWidth > 600 && navLinks) {
    navLinks.classList.remove("active");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.querySelector("i").className = "ri-menu-3-line";
    }
  }
});