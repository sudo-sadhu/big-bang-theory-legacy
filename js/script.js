// ============================================
// THE BIG BANG THEORY - Shared JavaScript
// Navigation, Animations, Utilities
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveal();
  initStarsBackground();
  initBackToTop();
  initBazingaEasterEgg();
});

// ── Navigation ──
function initNavigation() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  toggle?.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links?.classList.toggle('open');
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle?.classList.remove('active');
      links?.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (links?.classList.contains('open') && !e.target.closest('.nav-inner')) {
      toggle?.classList.remove('active');
      links?.classList.remove('open');
    }
  });
}

// ── Scroll Reveal Animation ──
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── Stars Background ──
function initStarsBackground() {
  const container = document.querySelector('.stars-bg');
  if (!container) return;

  const starCount = 100;
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.setProperty('--duration', (2 + Math.random() * 4) + 's');
    star.style.setProperty('--max-opacity', (0.3 + Math.random() * 0.7).toString());
    star.style.animationDelay = Math.random() * 4 + 's';
    star.style.width = (1 + Math.random() * 2) + 'px';
    star.style.height = star.style.width;
    container.appendChild(star);
  }
}

// ── Back to Top ──
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Bazinga Easter Egg ──
function initBazingaEasterEgg() {
  const bazingaBtn = document.querySelector('.nav-bazinga');
  if (!bazingaBtn) return;

  bazingaBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showBazinga();
  });
}

function showBazinga() {
  const existing = document.querySelector('.bazinga-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'bazinga-toast';
  toast.textContent = 'BAZINGA!';
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 1500);
}

// ── Count Up Animation ──
function animateCountUp(element, target, duration = 2000) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.floor(start + (target - start) * eased);

    element.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target.toLocaleString();
    }
  }

  requestAnimationFrame(update);
}

// Initialize count-up when elements are visible
function initCountUp() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        const target = parseInt(entry.target.dataset.count, 10);
        animateCountUp(entry.target, target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

// ── Star Rating Renderer ──
function renderStars(rating, maxRating = 10) {
  const normalized = (rating / maxRating) * 5;
  const fullStars = Math.floor(normalized);
  const halfStar = normalized % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
}

// ── Search/Filter Utility ──
function filterCards(searchTerm, cards, getSearchText) {
  const term = searchTerm.toLowerCase().trim();
  cards.forEach(card => {
    const text = getSearchText(card).toLowerCase();
    if (!term || text.includes(term)) {
      card.style.display = '';
      card.style.animation = 'fadeIn 0.3s ease forwards';
    } else {
      card.style.display = 'none';
    }
  });
}

// ── Smooth Section Scroll ──
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const offset = 80; // nav height
    const top = section.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

// ── Debounce ──
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// ── Navigation HTML Generator ──
function getNavHTML(activePage = '') {
  return `
  <nav class="nav" id="main-nav">
    <div class="nav-inner">
      <a href="index.html" class="nav-logo">
        <div class="atom-icon">
          <div class="atom-nucleus"></div>
        </div>
        The Big Bang Theory
      </a>
      <div class="nav-links" id="nav-links">
        <a href="index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}">Home</a>
        <a href="episodes.html" class="nav-link ${activePage === 'episodes' ? 'active' : ''}">Episodes</a>
        <a href="cast.html" class="nav-link ${activePage === 'cast' ? 'active' : ''}">Cast & Crew</a>
        <a href="behind-the-scenes.html" class="nav-link ${activePage === 'bts' ? 'active' : ''}">Behind the Scenes</a>
        <a href="moments.html" class="nav-link ${activePage === 'moments' ? 'active' : ''}">Moments</a>
      </div>
      <a href="#" class="nav-bazinga">BAZINGA!</a>
      <div class="nav-toggle" id="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </nav>`;
}

// ── Footer HTML Generator ──
function getFooterHTML() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-brand">⚛️ The Big Bang Theory</div>
          <p class="footer-desc">
            The official fan destination for everything Big Bang Theory. 
            Celebrating 12 seasons of laughter, science, and friendship 
            that changed television forever.
          </p>
        </div>
        <div>
          <div class="footer-title">Explore</div>
          <div class="footer-links">
            <a href="index.html" class="footer-link">Home</a>
            <a href="episodes.html" class="footer-link">Episodes</a>
            <a href="cast.html" class="footer-link">Cast & Crew</a>
            <a href="behind-the-scenes.html" class="footer-link">Behind the Scenes</a>
          </div>
        </div>
        <div>
          <div class="footer-title">Connect</div>
          <div class="footer-links">
            <a href="moments.html" class="footer-link">Iconic Moments</a>
            <a href="#" class="footer-link">Fan Community</a>
            <a href="#" class="footer-link">Newsletter</a>
            <a href="#" class="footer-link">Contact</a>
          </div>
        </div>
        <div>
          <div class="footer-title">The Show</div>
          <div class="footer-links">
            <a href="#" class="footer-link">CBS Official</a>
            <a href="#" class="footer-link">Watch on Max</a>
            <a href="#" class="footer-link">Merchandise</a>
            <a href="#" class="footer-link">Young Sheldon</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2024 The Big Bang Theory Fan Site. All rights reserved. Created with <span class="footer-hearts">♥</span> for fans.</span>
        <span>A production by Chuck Lorre & Bill Prady</span>
      </div>
    </div>
  </footer>`;
}
