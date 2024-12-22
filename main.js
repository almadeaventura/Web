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
            faqItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        // Abrir el seleccionado
        if (!isActive) {
            item.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
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
        const whatsappError = document.getElementById('whatsapp-error');
        
        if (!whatsappRegex.test(whatsapp)) {
            whatsappError.textContent = 'Por favor, ingresa un número de WhatsApp válido (+569XXXXXXXX)';
            return;
        } else {
            whatsappError.textContent = '';
        }

        // Validación de nombre
        const nombre = document.getElementById('nombre').value;
        const nombreError = document.getElementById('nombre-error');
        if (nombre.length < 3) {
            nombreError.textContent = 'Por favor, ingresa tu nombre completo';
            return;
        } else {
            nombreError.textContent = '';
        }

        // Validación de email
        const email = document.getElementById('email').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailError = document.getElementById('email-error');
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Por favor, ingresa un email válido';
            return;
        } else {
            emailError.textContent = '';
        }

        // Validación de pasajeros
        const pasajeros = document.getElementById('pasajeros').value;
        const pasajerosError = document.getElementById('pasajeros-error');
        if (!pasajeros) {
            pasajerosError.textContent = 'Por favor, selecciona la cantidad de pasajeros';
            return;
        } else {
            pasajerosError.textContent = '';
        }

        // Si todo está correcto, enviar formulario
        const formData = {
            whatsapp,
            nombre,
            email,
            pasajeros
        };

        // Aquí puedes agregar la lógica para enviar los datos
        console.log('Datos del formulario:', formData);
        alert('¡Gracias por tu reserva! Te contactaremos pronto por WhatsApp');
        form.reset();
    });
}

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
document.querySelectorAll('.section-title, .card, .fade-in').forEach(el => {
    observer.observe(el);
});

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
