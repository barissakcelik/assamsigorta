document.addEventListener('DOMContentLoaded', () => {
    // 1. İkonları Yükle
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Header Scroll ve Cam Efekti (Glassmorphism)
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Mobil Menü Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    if(mobileBtn && mainNav) {
        const menuIcon = mobileBtn.querySelector('i');
        mobileBtn.addEventListener('click', () => {
            mainNav.classList.toggle('mobile-active');
            header.classList.toggle('menu-open');
            
            if (mainNav.classList.contains('mobile-active')) {
                menuIcon.setAttribute('data-lucide', 'x');
            } else {
                menuIcon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons(); 
        });
    }

    // 4. Scroll Reveal Animasyonları (Sayfa kaydıkça beliren elementler)
    // CSS'te .reveal, .reveal-left, .reveal-right, .reveal-up sınıflarını kullanacağız
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');
    
    const revealOptions = {
        threshold: 0.15, // Elementin %15'i göründüğünde tetikle
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Sadece bir kere çalışsın
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 5. İstatistik Sayaç Animasyonu (Sayıların sıfırdan artarak sayması)
    const counters = document.querySelectorAll('.counter-value');
    const speed = 200; // Sayma hızı
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const increment = target / speed;
                
                const updateCount = () => {
                    const count = +counter.innerText;
                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // 6. Ürün Slider Kaydırma Fonksiyonu
    const sliderTrack = document.getElementById('product-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (sliderTrack && prevBtn && nextBtn) {
        const scrollAmount = 400; // Kart + boşluk genişliği
        nextBtn.addEventListener('click', () => {
            sliderTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
        prevBtn.addEventListener('click', () => {
            sliderTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }

    // Mobil Dropdown
    const dropdowns = document.querySelectorAll('.dropdown > a');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            if (window.innerWidth < 1024) {
                e.preventDefault();
                dropdown.parentElement.classList.toggle('active');
            }
        });
    });
});