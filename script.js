// ========== TEXTO QUE SE ESCRIBE SOLO Y LUEGO PARPADEA INFINITO ==========
const textoCompleto = "Feliz cumple, [AMIGO]";
let indice = 0;
const tituloElement = document.getElementById('tituloDinamico');
let intervaloParpadeo = null;
let escribiendo = true;

function escribirTitulo() {
    if (indice < textoCompleto.length) {
        tituloElement.innerHTML = textoCompleto.substring(0, indice + 1) + '<span class="cursor-parpadeante"></span>';
        indice++;
        setTimeout(escribirTitulo, 70);
    } else {
        escribiendo = false;
        setTimeout(() => {
            tituloElement.innerHTML = textoCompleto;
            iniciarParpadeoInfinito();
        }, 500);
    }
}

function iniciarParpadeoInfinito() {
    if (intervaloParpadeo) clearInterval(intervaloParpadeo);
    
    // Bucle infinito: aparece y desaparece cada 1.5 segundos
    intervaloParpadeo = setInterval(() => {
        if (tituloElement && !escribiendo) {
            tituloElement.classList.toggle('texto-parpadeante');
        }
    }, 1500);
}

// ========== CONFETI AL CERRAR MODAL ==========
function lanzarConfetiMasivo() {
    // Explosión principal
    canvasConfetti({
        particleCount: 250,
        spread: 120,
        origin: { y: 0.5 },
        startVelocity: 25,
        colors: ['#9b59b6', '#f39c12', '#3498db', '#e74c3c', '#2ecc71', '#e67e22']
    });
    
    // Segunda ráfaga desde la izquierda
    setTimeout(() => {
        canvasConfetti({
            particleCount: 100,
            spread: 80,
            origin: { x: 0.2, y: 0.6 },
            startVelocity: 20,
            colors: ['#9b59b6', '#f39c12', '#e74c3c']
        });
    }, 150);
    
    // Tercera ráfaga desde la derecha
    setTimeout(() => {
        canvasConfetti({
            particleCount: 100,
            spread: 80,
            origin: { x: 0.8, y: 0.6 },
            startVelocity: 20,
            colors: ['#3498db', '#2ecc71', '#f39c12']
        });
    }, 300);
    
    // Confeti cayendo tipo lluvia
    setTimeout(() => {
        canvasConfetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.1 },
            startVelocity: 10,
            gravity: 1.5
        });
    }, 500);
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
    '"Ningún servidor es tan confiable como vos"',
    '"Los verdaderos amigos no necesitan documentación"',
    '"Eres mi main() favorito"'
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
    // Confeti sorpresa al hacer click
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
        // Confeti pequeño al mostrar la imagen
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
    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('modalEntrada'));
    modal.show();
    
    // Al hacer clic en "Entrar", lanzar confeti MASIVO
    const btnEntrar = document.getElementById('btnEntrar');
    btnEntrar?.addEventListener('click', () => {
        lanzarConfetiMasivo();
    });
    
    // Iniciar escritura del título
    setTimeout(escribirTitulo, 300);
});