document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector("#hero");
  hero.style.opacity = 0;
  hero.style.transform = "translateY(-20px)";
  
  setTimeout(() => {
    hero.style.transition = "all 1s ease";
    hero.style.opacity = 1;
    hero.style.transform = "translateY(0)";
  }, 300);
});

document.addEventListener('DOMContentLoaded', function() {
  const reveals = document.querySelectorAll('.reveal');
  const options = {
    threshold: 0.12
  };
  let revealIndex = 0;
  const observer = new window.IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // staggered delay
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 120 * revealIndex++);
        obs.unobserve(entry.target);
      }
    });
  }, options);
  reveals.forEach(section => {
    observer.observe(section);
  });
});

// Mobile menu toggle
window.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.md\\:hidden');
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            const nav = document.querySelector('nav');
            nav.classList.toggle('hidden');
            nav.classList.toggle('flex');
            nav.classList.toggle('flex-col');
            nav.classList.toggle('absolute');
            nav.classList.toggle('top-16');
            nav.classList.toggle('left-0');
            nav.classList.toggle('right-0');
            nav.classList.toggle('bg-white');
            nav.classList.toggle('p-4');
            nav.classList.toggle('shadow-md');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Web3Forms AJAX submit + show thank you message
    const form = document.querySelector('form[action="https://api.web3forms.com/submit"]');
    if (form) {
        // Создаём контейнер для сообщения
        const thankYou = document.createElement('div');
        thankYou.style.display = 'none';
        thankYou.className = 'thankyou-message bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4 text-center';
        thankYou.innerHTML = '<strong>Спасибо!</strong> Мы свяжемся с вами в ближайшее время.';
        form.parentNode.appendChild(thankYou);
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    body: formData
                });
                if (response.ok) {
                    form.reset();
                    form.style.display = 'none';
                    thankYou.style.display = 'block';
                } else {
                    alert('Ошибка отправки. Попробуйте позже.');
                }
            } catch (err) {
                alert('Ошибка сети. Попробуйте позже.');
            }
        });
    }
});