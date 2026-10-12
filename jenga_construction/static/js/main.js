/**
 * Jenga Construction Limited - Main Client Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer Toggle
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileMenu = document.getElementById('mobileNavMenu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Flash message dismissal
  const alertCloses = document.querySelectorAll('.alert-close');
  alertCloses.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const alertBox = e.target.closest('.alert-box');
      if (alertBox) {
        alertBox.remove();
      }
    });
  });

  // Simple lightbox for project images
  const galleryThumbnails = document.querySelectorAll('[data-gallery-src]');
  const lightboxModal = document.getElementById('galleryLightboxModal');
  const lightboxImg = document.getElementById('lightboxActiveImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  if (galleryThumbnails.length && lightboxModal && lightboxImg) {
    galleryThumbnails.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const src = item.getAttribute('data-gallery-src');
        const caption = item.getAttribute('data-gallery-caption') || '';
        lightboxImg.src = src;
        if (lightboxCaption) lightboxCaption.textContent = caption;
        lightboxModal.classList.remove('hidden');
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
        lightboxModal.classList.add('hidden');
      });
    }

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.add('hidden');
      }
    });
  }
});
