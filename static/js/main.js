// SynthAI Blog — Enhanced JS v2

// Mobile menu
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('active');
  document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
}

// Search overlay
function toggleSearch() {
  const overlay = document.getElementById('searchOverlay');
  overlay.classList.toggle('active');
  if (overlay.classList.contains('active')) {
    document.getElementById('searchInput').focus();
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

// ESC key handler
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.getElementById('searchOverlay').classList.remove('active');
    document.getElementById('mobileMenu').classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Scroll Reveal Animation
document.addEventListener('DOMContentLoaded', function() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(function(el) { observer.observe(el); });
});

// Staggered card animation
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.post-card, .tool-card, .info-card, .testimonial-card');
  cards.forEach(function(card, i) {
    card.style.transitionDelay = (i % 3) * 0.08 + 's';
  });
});

// Reading progress bar
document.addEventListener('DOMContentLoaded', function() {
  const content = document.querySelector('.article-content');
  if (!content) return;

  const bar = document.createElement('div');
  bar.className = 'reading-progress';
  document.body.appendChild(bar);

  window.addEventListener('scroll', function() {
    var rect = content.getBoundingClientRect();
    var total = content.offsetHeight - window.innerHeight;
    var progress = Math.min(Math.max(-rect.top / total, 0), 1) * 100;
    bar.style.width = progress + '%';
  });
});

// Newsletter form
document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('newsletterForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // TODO: Replace with your email service API
      form.innerHTML = '<p style="color: var(--accent); font-size: 16px; font-family: var(--font-serif);">✓ You\'re in! Check your inbox.</p>';
    });
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Active nav link highlight
document.addEventListener('DOMContentLoaded', function() {
  var path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(function(link) {
    if (path.indexOf(link.getAttribute('href')) === 0 && link.getAttribute('href') !== '/') {
      link.classList.add('active');
    }
  });
});

// Copy code blocks
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.article-content pre').forEach(function(pre) {
    var btn = document.createElement('button');
    btn.textContent = 'Copy';
    btn.style.cssText = 'position:absolute;top:8px;right:8px;font-size:11px;padding:4px 10px;border-radius:6px;background:var(--border);color:var(--text-muted);border:none;cursor:pointer;font-family:var(--font-mono);transition:all 0.2s;';
    btn.onmouseenter = function() { btn.style.background = 'var(--accent)'; btn.style.color = 'var(--bg)'; };
    btn.onmouseleave = function() { btn.style.background = 'var(--border)'; btn.style.color = 'var(--text-muted)'; };
    btn.onclick = function() {
      navigator.clipboard.writeText(pre.textContent.replace('Copy', '').trim());
      btn.textContent = 'Copied!';
      setTimeout(function() { btn.textContent = 'Copy'; }, 2000);
    };
    pre.style.position = 'relative';
    pre.appendChild(btn);
  });
});
