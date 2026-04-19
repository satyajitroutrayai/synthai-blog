// SynthAI Blog — Main JS

// Mobile menu toggle
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('active');
  document.body.style.overflow = document.getElementById('mobileMenu').classList.contains('active') ? 'hidden' : '';
}

// Search overlay toggle
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

// Close search on ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.getElementById('searchOverlay').classList.remove('active');
    document.getElementById('mobileMenu').classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Newsletter form handler (replace with your email service)
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('newsletterForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value;
      // TODO: Replace with ConvertKit/Mailchimp/Beehiiv API call
      // Example for ConvertKit:
      // fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ api_key: 'YOUR_KEY', email: email })
      // });
      form.innerHTML = '<p style="color: var(--accent); font-size: 16px;">✓ You\'re in! Check your inbox.</p>';
    });
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Reading progress bar (for article pages)
if (document.querySelector('.article-content')) {
  const bar = document.createElement('div');
  bar.style.cssText = 'position:fixed;top:64px;left:0;height:3px;background:var(--accent);z-index:99;transition:width 0.1s;width:0';
  document.body.appendChild(bar);
  window.addEventListener('scroll', function() {
    const content = document.querySelector('.article-content');
    const rect = content.getBoundingClientRect();
    const total = content.offsetHeight - window.innerHeight;
    const progress = Math.min(Math.max(-rect.top / total, 0), 1) * 100;
    bar.style.width = progress + '%';
  });
}
