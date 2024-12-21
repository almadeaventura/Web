// Funcionalidad del indicador de estado
function updateStatus() {
    const now = new Date();
    const hour = now.getHours();
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.nav-status span:last-child');

    if (hour >= 12 && hour < 18) {
        statusDot.classList.add('active');
        statusDot.classList.remove('inactive');
        statusText.textContent = 'Desde mediodía';
    } else {
        statusDot.classList.remove('active');
        statusDot.classList.add('inactive');
        statusText.textContent = 'Hasta mañana';
    }
}

// Actualizar estado cada minuto
updateStatus();
setInterval(updateStatus, 60000);

// FAQs Interactivas
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isActive = item.classList.contains('active');

        // Cerrar todos los FAQs
        document.querySelectorAll('.faq-item').forEach(faqItem => {
            faqItem.classList.remove('active');
            const icon = faqItem.querySelector('.faq-icon');
            if (icon) icon.textContent = '+';
        });

        // Abrir el seleccionado
        if (!isActive) {
            item.classList.add('active');
            const icon = item.querySelector('.faq-icon');
            if (icon) icon.textContent = '−';
        }
    });
});

// Notificación de WhatsApp
setTimeout(() => {
    const badge = document.querySelector('.notification-badge');
    const popup = document.querySelector('.message-popup');
    
    if (badge && popup) {
        badge.classList.add('active');
        popup.classList.add('active');

        // Ocultar popup después de 5 segundos
        setTimeout(() => {
            popup.classList.remove('active');
        }, 5000);
    }
}, 15000);

// Ocultar notificación al hacer clic en WhatsApp
const whatsappButton = document.querySelector('.whatsapp-button');
if (whatsappButton) {
    whatsappButton.addEventListener('click', () => {
        const badge = document.querySelector('.notification-badge');
        const popup = document.querySelector('.message-popup');
        
        if (badge && popup) {
            badge.classList.remove('active');
            popup.classList.remove('active');
        }
    });
}

// Validación del formulario
const form = document.getElementById('reservaForm');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validación de WhatsApp (formato chileno)
        const whatsapp = document.getElementById('whatsapp').value;
        const whatsappRegex = /^(\+?56)?9\d{8}$/;
        
        if (!whatsappRegex.test(whatsapp)) {
            alert('Por favor, ingresa un número de WhatsApp válido (+569XXXXXXXX)');
            return;
        }

        // Validación de nombre
        const nombre = document.getElementById('nombre').value;
        if (nombre.length < 3) {
            alert('Por favor, ingresa tu nombre completo');
            return;
        }

        // Validación de email
        const email = document.getElementById('email').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, ingresa un email válido');
            return;
        }

        // Validación de pasajeros
        const pasajeros = document.getElementById('pasajeros').value;
        if (!pasajeros) {
            alert('Por favor, selecciona la cantidad de pasajeros');
            return;
        }

        // Aquí podrías agregar el código para enviar el formulario
        // Por ahora solo mostramos un mensaje de éxito
        alert('¡Gracias por tu reserva! Te contactaremos pronto por WhatsApp');
        this.reset();
    });
}

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer para animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos que queremos animar
document.querySelectorAll('.card, .section-title, .price-summary').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Corregir el icono descentrado en el botón flotante
document.querySelector('.whatsapp-button .icon').style.margin = '0';
