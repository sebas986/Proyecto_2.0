        // Variables globales para el carrusel
        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const totalSlides = slides.length;
        let autoSlideInterval;

        // Inicializar el carrusel
        function initCarousel() {
            createIndicators();
            updateCarousel();
            startAutoSlide();
        }

        // Crear indicadores
        function createIndicators() {
            const indicatorsContainer = document.getElementById('indicators');
            indicatorsContainer.innerHTML = '';
            
            for (let i = 0; i < totalSlides; i++) {
                const indicator = document.createElement('div');
                indicator.classList.add('carousel-indicator');
                if (i === currentSlide) {
                    indicator.classList.add('active');
                }
                indicator.addEventListener('click', () => goToSlide(i));
                indicatorsContainer.appendChild(indicator);
            }
        }

        // Actualizar el carrusel
        function updateCarousel() {
            const carousel = document.getElementById('carousel');
            carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Actualizar indicadores
            const indicators = document.querySelectorAll('.carousel-indicator');
            indicators.forEach((indicator, index) => {
                if (index === currentSlide) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }

        // Ir a una slide específica
        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            updateCarousel();
            resetAutoSlide();
        }

        // Siguiente slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
            resetAutoSlide();
        }

        // Slide anterior
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
            resetAutoSlide();
        }

        // Iniciar desplazamiento automático
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 4000);
        }

        // Reiniciar el desplazamiento automático
        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        // Inicializar el carrusel cuando el DOM esté listo
        document.addEventListener('DOMContentLoaded', initCarousel);

        // Smooth scroll para navegación
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    // Ajustar la posición para tener en cuenta el header fijo
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Animaciones al hacer scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }
            });
        }, observerOptions);

        // Observar elementos para animaciones
        document.querySelectorAll('.propuesta-card, .section-title, .registro-form').forEach(el => {
            observer.observe(el);
        });

        // Manejo del formulario
        document.getElementById('registroForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animación del botón
            const button = this.querySelector('.submit-button');
            const originalText = button.textContent;
            button.textContent = 'Enviando...';
            button.disabled = true;

            // Simular envío
            setTimeout(() => {
                alert('¡Gracias por unirte a Democracia hacia la Paz! Te contactaremos pronto.');
                this.reset();
                button.textContent = originalText;
                button.disabled = false;
            }, 2000);
        });

        // Efecto parallax suave SOLO en el fondo (no en el contenido)
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroBackground = document.querySelector('.hero-background');
            
            if (heroBackground) {
                // Solo el fondo se mueve, el contenido permanece fijo
                heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Agregar clase active al navbar según scroll
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-links a');
            
            let current = '';
            const headerHeight = document.querySelector('.header').offsetHeight;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - headerHeight - 50;
                if (scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });