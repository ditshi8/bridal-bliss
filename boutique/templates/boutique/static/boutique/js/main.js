// Navigation mobile
document.addEventListener('DOMContentLoaded', function() {
    // Toggle navigation mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Fermer le menu en cliquant sur un lien
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Header scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scroll up
            navbar.style.transform = 'translateY(0)';
        }

        // Add background when scrolled
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'var(--white)';
            navbar.style.backdropFilter = 'none';
        }

        lastScrollTop = scrollTop;
    });

    // Smooth scrolling pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Counter animation
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + '+';
            }
        }, 16);
    }

    // Observer pour les animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Animation des compteurs
                if (entry.target.classList.contains('counter')) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target, 2000);
                }
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    document.querySelectorAll('.service-card, .product-card, .gallery-item').forEach(el => {
        observer.observe(el);
    });

    // Modal pour les détails des articles
    const viewDetailsButtons = document.querySelectorAll('.view-details, .btn-info');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const articleId = this.getAttribute('data-id');
            // Ici vous pouvez afficher une modal avec les détails
            // Pour l'instant, rediriger vers WhatsApp
            const articleName = this.closest('.gallery-card').querySelector('h3').textContent;
            const whatsappNumber = document.querySelector('.footer-section p:nth-child(3)').textContent.replace(/\D/g, '');
            const message = `Bonjour, je suis intéressé par: ${articleName}`;
            window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
        });
    });

    // Filtrage de la galerie
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');

            // Rediriger vers l'URL du filtre
            window.location.href = this.getAttribute('href');
        });
    });

    // Animation au chargement de la page
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Gestion des formulaires (pour future extension)
function handleContactForm(formData) {
    // Cette fonction peut être utilisée plus tard pour gérer les formulaires de contact
    console.log('Données du formulaire:', formData);

    // Simulation d'envoi réussi
    showNotification('Message envoyé avec succès!', 'success');
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        border-radius: 5px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}