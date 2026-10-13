document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Efekti
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobil Menü Aç/Kapat
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    if(mobileBtn && mainNav) {
        const menuIcon = mobileBtn.querySelector('i');
        mobileBtn.addEventListener('click', () => {
            mainNav.classList.toggle('mobile-active');
            if (mainNav.classList.contains('mobile-active')) {
                menuIcon.setAttribute('data-lucide', 'x');
            } else {
                menuIcon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons(); 
        });
    }

    // 3. Mobil Dropdown
    const dropdowns = document.querySelectorAll('.dropdown > a');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            if (window.innerWidth < 1024) {
                e.preventDefault();
                dropdown.parentElement.classList.toggle('active');
            }
        });
    });

    // 4. SSS Akordeon
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const currentItem = question.parentElement;
            const isActive = currentItem.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            if (!isActive) {
                currentItem.classList.add('active');
            }
        });
    });

    // 5. Form Doğrulama (Validation) ve Gönderim Simülasyonu
    const quoteForm = document.getElementById('quote-form');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = quoteForm.querySelectorAll('[required]');
            const alertBox = document.getElementById('form-alert');
            const submitBtn = document.getElementById('submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const spinner = submitBtn.querySelector('.spinner');
            
            // Mevcut hataları temizle
            quoteForm.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));
            alertBox.className = 'alert hidden';
            
            // Boş alan kontrolü
            requiredFields.forEach(field => {
                if (field.type === 'checkbox') {
                    if (!field.checked) {
                        isValid = false;
                        field.closest('.checkbox-group').classList.add('has-error');
                    }
                } else if (!field.value.trim()) {
                    isValid = false;
                    field.closest('.form-group').classList.add('has-error');
                }
            });

            if (!isValid) {
                alertBox.textContent = 'Lütfen formdaki zorunlu alanları eksiksiz doldurun.';
                alertBox.className = 'alert alert-error';
                return;
            }

            // Eğer form geçerliyse, yükleniyor durumunu göster
            btnText.classList.add('hidden');
            spinner.classList.remove('hidden');
            submitBtn.disabled = true;

            // GERÇEK SENARYODA BURADA BACKEND API'YE (örn: PHP, Node.js) FETCH ISTEĞİ ATILMALIDIR.
            // Şimdilik sistemin düzgün çalıştığını göstermek için 2 saniyelik bir simülasyon yapıyoruz.
            setTimeout(() => {
                // Yüklenme durumunu kapat
                btnText.classList.remove('hidden');
                spinner.classList.add('hidden');
                submitBtn.disabled = false;
                
                // Başarı mesajı göster ve formu temizle
                alertBox.textContent = 'Teklif talebiniz başarıyla alınmıştır. Müşteri temsilcimiz iletişim bilgileriniz üzerinden en kısa sürede size dönüş yapacaktır.';
                alertBox.className = 'alert alert-success';
                quoteForm.reset();
                
            }, 2000);
        });
    }
});