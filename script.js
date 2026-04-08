// ========== TEXTO CON EFECTO DE ESCRITURA EN BUCLE INFINITO ==========
const textoCompleto = "FELIZ CUMPLEAÑOS, [AMIGO]";
const tituloElement = document.getElementById('tituloDinamico');
let intervaloBucle = null;
let estaEscribiendo = false;

function escribirTexto(indice, callback) {
    if (indice <= textoCompleto.length) {
        tituloElement.innerHTML = textoCompleto.substring(0, indice) + '<span class="cursor-parpadeante"></span>';
        setTimeout(() => escribirTexto(indice + 1, callback), 80);
    } else {
        tituloElement.innerHTML = textoCompleto + '<span class="cursor-parpadeante"></span>';
        if (callback) setTimeout(callback, 2000);
    }
}

function borrarTexto(indice, callback) {
    if (indice >= 0) {
        tituloElement.innerHTML = textoCompleto.substring(0, indice) + '<span class="cursor-parpadeante"></span>';
        setTimeout(() => borrarTexto(indice - 1, callback), 60);
    } else {
        tituloElement.innerHTML = '<span class="cursor-parpadeante"></span>';
        if (callback) setTimeout(callback, 500);
    }
}

function iniciarBucleInfinito() {
    function ciclo() {
        escribirTexto(0, () => {
            borrarTexto(textoCompleto.length, () => {
                ciclo();
            });
        });
    }
    ciclo();
}

// ========== CONFETI DENTRO DEL MODAL ==========
let confetiActivo = false;

function lanzarConfetiEnModal() {
    if (confetiActivo) return;
    confetiActivo = true;
    
    // Confeti cada 2 segundos mientras el modal esté abierto
    const intervaloConfeti = setInterval(() => {
        const modal = document.getElementById('modalEntrada');
        const modalVisible = modal.classList.contains('show');
        
        if (modalVisible) {
            canvasConfetti({
                particleCount: 60,
                spread: 70,
                origin: { y: 0.7 },
                startVelocity: 15,
                colors: ['#9b59b6', '#f39c12', '#3498db', '#e74c3c', '#2ecc71']
            });
        } else {
            clearInterval(intervaloConfeti);
            confetiActivo = false;
        }
    }, 1800);
}

// ========== MODO OSCURO ==========
const modoBtn = document.getElementById('modoBtn');
let modoOscuro = false;

modoBtn.addEventListener('click', () => {
    modoOscuro = !modoOscuro;
    if (modoOscuro) {
        document.body.style.background = '#1a1a2e';
        document.body.style.color = '#eee';
        modoBtn.innerHTML = '☀️';
        modoBtn.style.background = '#f39c12';
        document.querySelectorAll('.timeline-card, .glass-card').forEach(c => {
            c.style.background = 'rgba(30, 30, 50, 0.8)';
            c.style.color = '#eee';
        });
        document.querySelectorAll('.modal-content').forEach(modal => {
            modal.style.background = '#1a1a2e';
            modal.style.color = '#eee';
        });
    } else {
        document.body.style.background = '';
        document.body.style.color = '';
        modoBtn.innerHTML = '🌙';
        modoBtn.style.background = '';
        document.querySelectorAll('.timeline-card, .glass-card').forEach(c => {
            c.style.background = '';
            c.style.color = '';
        });
        document.querySelectorAll('.modal-content').forEach(modal => {
            modal.style.background = '';
            modal.style.color = '';
        });
    }
});

// ========== FRASES RANDOM ==========
const frases = [
    '"La amistad es el único bug que no quiero arreglar"',
    '"Eres la excepción que no lanza error"',
    '"Gracias por hacer commit a nuestra amistad todos los días"',
    '"Contigo hasta el stack overflow es divertido"',
    '"Eres mi variable favorita en esta función llamada vida"',
    '"Ningún servidor es tan confiable como vos"'
];

document.getElementById('btnFrase')?.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * frases.length);
    document.getElementById('fraseRandom').innerHTML = frases[randomIndex];
});

// ========== CONTADOR DE VISITAS ==========
let visitas = localStorage.getItem('visitasFooter');
visitas = visitas ? parseInt(visitas) + 1 : 1;
localStorage.setItem('visitasFooter', visitas);
document.getElementById('contadorVisitas').innerText = visitas;

// ========== EASTER EGG ==========
document.getElementById('easterEgg')?.addEventListener('click', () => {
    alert('🎉 ¡Eres un crack! Gracias por visitar esta página.');
    canvasConfetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 }
    });
});

// ========== WHATSAPP ==========
const form = document.getElementById('formWhatsApp');
const successDiv = document.getElementById('mensajeExito');
const numeroTelefono = "TU_NUMERO_AQUI";
form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const mensaje = document.getElementById('mensaje').value;
    const url = `https://wa.me/${numeroTelefono}?text=*Mensaje para [AMIGO]*%0A%0A*De:* ${nombre}%0A*Mensaje:* ${mensaje}`;
    successDiv.classList.remove('d-none');
    setTimeout(() => { 
        window.open(url, '_blank'); 
        form.reset(); 
        setTimeout(() => successDiv.classList.add('d-none'), 5000); 
    }, 1000);
});

// ========== ENLACE "HAZ CLICK AQUÍ" ==========
const enlace = document.getElementById('enlaceImagen');
const imagenDiv = document.getElementById('imagenOculta');

enlace?.addEventListener('click', (e) => {
    e.preventDefault();
    if (imagenDiv.style.display === 'none' || imagenDiv.style.display === '') {
        imagenDiv.style.display = 'block';
        enlace.textContent = 'Ocultar imagen';
        canvasConfetti({
            particleCount: 50,
            spread: 40,
            origin: { y: 0.8 }
        });
    } else {
        imagenDiv.style.display = 'none';
        enlace.textContent = 'Haz click aquí';
    }
});

// ========== INICIALIZAR ==========
window.addEventListener('load', () => {
    // Mostrar modal y lanzar confeti dentro de él
    const modal = new bootstrap.Modal(document.getElementById('modalEntrada'));
    modal.show();
    
    // Iniciar confeti dentro del modal
    setTimeout(() => {
        lanzarConfetiEnModal();
    }, 500);
    
    // Iniciar el bucle infinito del título
    setTimeout(iniciarBucleInfinito, 300);
});