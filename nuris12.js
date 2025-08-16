document.addEventListener("DOMContentLoaded", () => {
  // Анимация появления галереи и карточек
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach((item, i) => {
    item.classList.remove('pop-in');
    setTimeout(() => {
      item.classList.add('pop-in');
    }, 120 + i * 90);
    // Анимация подписи
    const caption = item.querySelector('.caption');
    if (caption) {
      setTimeout(() => {
        caption.classList.add('fade-in');
      }, 350 + i * 90);
    }
    // JS-анимация увеличения и glow при наведении (без вращения)
    let animFrame = null;
    let current = 0;
    let target = 0;
    function animate() {
      current += (target - current) * 0.16;
      // Эффект: только scale и мягкая тень
      const scale = 1 + 0.06 * current;
      const shadow = `0 ${8 + 24 * current}px ${24 + 32 * current}px 0 rgba(253,126,20,${0.10 + 0.18 * current}), 0 8px 32px rgba(34,34,59,${0.16 + 0.10 * current})`;
      item.style.transform = `scale(${scale})`;
      item.style.boxShadow = shadow;
      if (Math.abs(target - current) > 0.01) {
        animFrame = requestAnimationFrame(animate);
      } else {
        current = target;
        item.style.transform = `scale(${scale})`;
        item.style.boxShadow = shadow;
        animFrame = null;
      }
    }
    item.addEventListener('mouseenter', () => {
      target = 1;
      if (!animFrame) animate();
    });
    item.addEventListener('mouseleave', () => {
      target = 0;
      if (!animFrame) animate();
    });
  });

  // Lightbox функционал для галереи
  const galleryImgs = document.querySelectorAll('.gallery-item img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  galleryImgs.forEach(item => {
    item.addEventListener('click', function() {
      lightbox.style.display = 'flex';
      lightbox.classList.remove('fade-in');
      setTimeout(() => lightbox.classList.add('fade-in'), 10);
      lightboxImg.src = this.src;
      const caption = this.parentElement.querySelector('.caption');
      lightboxCaption.textContent = caption ? caption.textContent : '';
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
    lightboxCaption.textContent = '';
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function(e) {
    if (lightbox.style.display === 'flex' && (e.key === 'Escape' || e.key === 'Esc')) {
      closeLightbox();
    }
  });
}); 