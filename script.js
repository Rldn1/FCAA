// ========== TEXTO QUE SE ESCRIBE SOLO Y LUEGO PARPADEA ==========
const textoCompleto = "Feliz cumple, [AMIGO]";
let indice = 0;
const tituloElement = document.getElementById('tituloDinamico');
let escrituraCompleta = false;

function escribirTitulo() {
    if (indice < textoCompleto.length) {
        tituloElement.innerHTML = textoCompleto.substring(0, indice + 1) + '<span class="cursor-parpadeante"></span>';
        indice++;
        setTimeout(escribirTitulo, 70);
    } else {
        escrituraCompleta = true;
        setTimeout(() => {
            tituloElement.innerHTML = textoCompleto;
            iniciarParpadeoContinuo();
        }, 500);
    }
}

function iniciarParpadeoContinuo() {
    setInterval(() => {
        if (tituloElement) {
            tituloElement.classList.toggle('texto-parpadeante');
        }
    }, 1500);
}

// ========== CONFETI LOCALIZADO ==========
let confetiYaLanzado = false;

function lanzarConfeti() {
    if (confetiYaLanzado) return;
    confetiYaLanzado = true;
    
    canvasConfetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        startVelocity: 25,
        colors: ['#9b59b6', '#f39c12', '#3498db', '#e74c3c', '#2ecc71']
    });
    
    setTimeout(() => {
        canvasConfetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.7 },
            startVelocity: 15
        });
    }, 200);
    
    setTimeout(() => {
        canvasConfetti({
            particleCount: 50,
            spread: 50,
            origin: { y: 0.5 },
            startVelocity: 10
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
    '"Ningún servidor es tan confiable como vos"'
];

document.getElementById('btnFrase')?.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * frases.length);
    document.getElementById('fraseRandom').innerHTML = frases[randomIndex];
});

// ========== CONTADOR DE VISITAS ==========
let visitas = localStorage.getItem('visitasFooter');
visitas = visitas ? parseInt