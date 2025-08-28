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
    const pdfPath = './Resume/YEISON-PETIT-CV.docx.pdf';

    try {
        // Crear el link de descarga
        const link = document.createElement('a');
        link.href = pdfPath;
        link.download = 'Yeison-Petit-Resume-2025.pdf';

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


//add animation with scrollReveal

ScrollReveal().reveal('.abouMeContent', { 
    distance: '150px',
    origin: 'bottom,mobile: false' });

    ScrollReveal().reveal('.box', { 
    distance: '150px',
    origin: 'bottom',mobile: false });

    ScrollReveal().reveal('.contact-info', { 
    distance: '150px',
    origin: 'bottom',mobile: false });

    ScrollReveal().reveal('.form', { 
    distance: '150px',
    origin: 'bottom',
    mobile: false    });

    ScrollReveal().reveal('.home-text', { 
    distance: '150px',
    origin: 'bottom',
mobile: false });

     ScrollReveal().reveal('.myphoto', { 
     distance: '150px',
     origin: 'bottom',mobile: false });