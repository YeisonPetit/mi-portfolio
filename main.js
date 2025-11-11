// Utility Functions
function createParallaxEffect(selector, speedMultiplier = 0.3) {
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll(selector);
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * speedMultiplier;
            const x = (mouseX - 0.5) * speed * 30;
            const y = (mouseY - 0.5) * speed * 30;
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

function createIntersectionObserver(callback, options = {}) {
    const defaultOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
        ...options
    };
    return new IntersectionObserver(callback, defaultOptions);
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        if (target === 100) {
            element.textContent = Math.floor(current) + '%';
        } else {
            element.textContent = target > 10 ? Math.floor(current) + '+' : Math.floor(current);
        }
    }, 40);
}

const btnaun = document.getElementById("btnaun");
// const btnBurger = document.getElementById("btnBurger")
const container_Links = document.getElementById("container_Links")
const body = document.body;
const menu = document.getElementById("btnBurger")
const closed = document.getElementById("closed")


//active menu
menu.addEventListener("click", () => {
    container_Links.classList.toggle("active")
})
//close menu
closed.addEventListener("click", () => {
    container_Links.classList.toggle("active")
})

btnaun.addEventListener("click", () => {
    // Cambiar tema
    body.classList.toggle("active");

    // Cambiar texto del botón
    if (body.classList.contains("active")) {
        btnaun.textContent = "☀️";
    } else {
        btnaun.textContent = "🌙";
    }

    // Guardar preferencia
    localStorage.setItem("modoOscuro", body.classList.contains("active"));
});

// Cargar tema guardado al abrir la página
window.addEventListener("load", () => {
    const temaGuardado = localStorage.getItem("modoOscuro");

    if (temaGuardado === "true") {
        body.classList.add("active");
        btnaun.textContent = "☀️";
    } else {
        btnaun.textContent = "🌙";
    }
});

// Función para descargar el resume
function downloadResume() {
    const pdfPath = 'Resume/YEISON-PETIT-CV.docx.pdf';

    try {
        // Crear el link de descarga
        const link = document.createElement('a');
        link.href = pdfPath;
        link.download = 'YEISON-PETIT-CV.pdf';

        // Hacer invisible y agregar al DOM
        link.style.display = 'none';
        document.body.appendChild(link);

        // Trigger download
        link.click();

        // Cleanup
        document.body.removeChild(link);

        // Mostrar mensaje de éxito (ya que funcionó)
        showSuccessMessage();

    } catch (error) {
        console.error('Error al crear la descarga:', error);

        // Fallback: abrir en nueva pestaña
        window.open(pdfPath, '_blank');

        // Mostrar mensaje de error
        alert('❌ Error en la descarga. Se abrirá el PDF en una nueva pestaña.');
    }
}

// JavaScript para la sección About Me
document.addEventListener('DOMContentLoaded', function() {
    // Sparkles en hover de la imagen de perfil
    const profileImage = document.getElementById('profileImageAbout');
    
    if (profileImage) {
        profileImage.addEventListener('mouseenter', createSparklesAbout);
    }
    
    function createSparklesAbout() {
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle-about';
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.top = Math.random() * 100 + '%';
                profileImage.appendChild(sparkle);
                
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.parentNode.removeChild(sparkle);
                    }
                }, 2000);
            }, i * 200);
        }
    }
    
    // Intersection Observer para activar animaciones
    const observerAbout = createIntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number-about');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-about');
    if (statsSection) {
        observerAbout.observe(statsSection);
    }
    
    // Efecto de parallax en las formas flotantes
    createParallaxEffect('.shape-about', 0.3);
});

// JavaScript para la sección de educación
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer para animaciones al hacer scroll
    const observerEducation = createIntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    });

    // Observar todos los elementos de educación
    const educationItems = document.querySelectorAll('.education-item');
    educationItems.forEach(item => {
        observerEducation.observe(item);
    });

    // Efecto parallax en las formas flotantes
    createParallaxEffect('.shape-education', 0.2);

    // Animación de la línea de tiempo
    function animateTimelineLine() {
        const timelineLine = document.querySelector('.timeline-line');
        if (timelineLine) {
            const observer = createIntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        timelineLine.style.animation = 'drawLine-education 2s ease forwards';
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(timelineLine);
        }
    }

    // Crear animación para la línea de tiempo
    const style = document.createElement('style');
    style.textContent = `
        @keyframes drawLine-education {
            from {
                height: 0;
            }
            to {
                height: 100%;
            }
        }
        .timeline-line {
            height: 0;
        }
    `;
    document.head.appendChild(style);

    animateTimelineLine();

    // Efecto hover en los puntos de la línea de tiempo
    const timelineDots = document.querySelectorAll('.timeline-dot');
    timelineDots.forEach(dot => {
        dot.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(-50%) scale(1.5)';
            this.style.boxShadow = '0 15px 35px rgba(85, 140, 223, 0.6)';
        });
        
        dot.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(-50%) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(52, 89, 233, 0.3)';
        });
    });

    console.log('🎓 Sección de Educación inicializada correctamente');
});

//animaciones con scrollReveal

ScrollReveal().reveal('.abouMeContent', {
    distance: '150px',
    origin: 'bottom', mobile: false
});

ScrollReveal().reveal('.box', {
    distance: '150px',
    origin: 'bottom', mobile: false
});

ScrollReveal().reveal('.contact-info', {
    distance: '150px',
    origin: 'bottom', mobile: false
});

ScrollReveal().reveal('.form', {
    distance: '150px',
    origin: 'bottom',
    mobile: false
});

ScrollReveal().reveal('.home-text', {
    distance: '150px',
    origin: 'bottom',
    mobile: false
});

ScrollReveal().reveal('.myphoto', {
    distance: '150px',
    origin: 'bottom', mobile: false
});

ScrollReveal().reveal('.education-container', {
    distance: '150px',
    origin: 'bottom', mobile: false
});

ScrollReveal().reveal('.skills-content', {
    distance: '150px',
    origin: 'bottom', mobile: false
});

