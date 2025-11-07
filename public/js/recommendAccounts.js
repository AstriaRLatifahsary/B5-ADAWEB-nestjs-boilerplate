document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.recommend-carousel');
  let isDown = false;
  let startX;
  let scrollLeft;

  // === Drag to scroll ===
  if (carousel) {
    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      carousel.classList.add('active');
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.classList.remove('active');
    });

    carousel.addEventListener('mouseup', () => {
      isDown = false;
      carousel.classList.remove('active');
    });

    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2; // kecepatan scroll
      carousel.scrollLeft = scrollLeft - walk;
    });
  }

  // === Follow/Unfollow ===
  document.querySelectorAll('.recommend-card .follow-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.recommend-card');
      const countEl = card.querySelector('.followers-count span');
      let count = parseInt(countEl.textContent, 10);
      const isFollowing = btn.dataset.following === 'true';

      if (isFollowing) {
        btn.textContent = 'Ikuti';
        btn.dataset.following = 'false';
        btn.classList.remove('following');
        countEl.textContent = count - 1;
      } else {
        btn.textContent = 'Mengikuti';
        btn.dataset.following = 'true';
        btn.classList.add('following');
        countEl.textContent = count + 1;
      }
    });
  });
});
