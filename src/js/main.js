import '/src/scss/main.scss'
import * as bootstrap from 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

const components = [
  { id: 'component-nav', path: '/src/components/nav.html' },
  { id: 'component-hero', path: '/src/components/hero.html' },
  { id: 'component-cubaemprende', path: '/src/components/cubaemprende.html' },
  { id: 'component-servicios', path: '/src/components/servicios.html' },
];

async function injectComponents() {
  for (const { id, path } of components) {
    const container = document.getElementById(id);
    if (!container) continue;

    try {
      const response = await fetch(path);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      container.innerHTML = await response.text();
    } catch (error) {
      console.error(`Error al cargar ${id}:`, error);
    }
  }

  initNavbarScroll();
}

function initNavbarScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;

  const hideThreshold = 80;
  const revealThreshold = 600;
  let lastScrollY = window.scrollY || document.documentElement.scrollTop;

  const handleScroll = () => {
    const currentScroll = window.scrollY || document.documentElement.scrollTop;
    const isScrollingUp = currentScroll < lastScrollY;

    // Control Móvil (pantallas < 992px)
    if (window.innerWidth < 992) {
      header.classList.remove('nav-hidden');
      if (currentScroll > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScrollY = currentScroll;
      return;
    }

    // Control Escritorio (Desktop)
    if (currentScroll > hideThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (currentScroll <= hideThreshold) {
      header.classList.remove('nav-hidden');
    } else if (isScrollingUp) {
      header.classList.remove('nav-hidden');
    } else if (currentScroll > hideThreshold && currentScroll <= revealThreshold) {
      header.classList.add('nav-hidden');
    } else {
      header.classList.remove('nav-hidden');
    }

    lastScrollY = currentScroll;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll, { passive: true });
}

injectComponents();