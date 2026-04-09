const textoCompleto = "FELIZ CUMPLEAÑOS, HAMSTER";
const tituloElement = document.getElementById('tituloDinamico');

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

let confetiActivo = false;
let intervaloConfeti = null;

function lanzarConfetiEnModal() {
    if (confetiActivo) return;
    confetiActivo = true;
    
    intervaloConfeti = setInterval(() => {
        const modal = document.getElementById('modalEntrada');
        const modalVisible = modal.classList.contains('show');
        
        if (modalVisible) {
            canvasConfetti({
                particleCount: 60,
                spread: 70,
                origin: { y: 0.7 },
                startVelocity: 15,
                colors: ['#1E4A7A', '#2C6E9E', '#E69A2E', '#C77D2E', '#3A7CA5']
            });
        } else {
            clearInterval(intervaloConfeti);
            confetiActivo = false;
        }
    }, 1800);
}

// Modo oscuro
const modoBtn = document.getElementById('modoBtn');
if (modoBtn) {
    modoBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            modoBtn.innerHTML = '☀️';
            modoBtn.style.background = '#E69A2E';
        } else {
            modoBtn.innerHTML = '🌙';
            modoBtn.style.background = '';
        }
    });
}

// Frases para el footer
const frasesFooter = [
    '"La amistad es como el café: calienta el alma."',
    '"Eres de esas personas que hacen que el mundo sea mejor."',
    '"Gracias por estar siempre, incluso sin hablar por días."',
    '"Un 🐹, un amigo, un hermano."',
    '"De la media a la vida, siempre cómplices."',
    '"El extrovertido que me adoptó."',
    '"Contigo el té sabe mejor."',
    '"Juela, mi niño, bien que sí."'
];

const btnFraseFooter = document.getElementById('btnFraseFooter');
if (btnFraseFooter) {
    btnFraseFooter.addEventListener('click', function() {
        const randomIndex = Math.floor(Math.random() * frasesFooter.length);
        const fraseElement = document.getElementById('fraseRandomFooter');
        if (fraseElement) fraseElement.innerHTML = frasesFooter[randomIndex];
    });
}

// Contador de visitas
let visitas = localStorage.getItem('visitasFooter');
visitas = visitas ? parseInt(visitas) + 1 : 1;
localStorage.setItem('visitasFooter', visitas);
const contadorVisitas = document.getElementById('contadorVisitas');
if (contadorVisitas) contadorVisitas.innerText = visitas;

// Easter egg del footer
const easterEggFooter = document.getElementById('easterEggFooter');
if (easterEggFooter) {
    easterEggFooter.addEventListener('click', function() {
        alert('🐹 Hamster es un amigo increíble. Por favor, permanece más tiempo como mi amigo. 💙');
        canvasConfetti({ particleCount: 120, spread: 80, origin: { y: 0.8 } });
    });
}

// WhatsApp
const form = document.getElementById('formWhatsApp');
const successDiv = document.getElementById('mensajeExito');
const numeroTelefono = "+50360015036";
if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const mensaje = document.getElementById('mensaje').value;
        const url = `https://wa.me/${numeroTelefono}?text=*Mensaje para Esmeralda *%0A%0A*De:* ${nombre}%0A*Mensaje:* ${mensaje}`;
        successDiv.classList.remove('d-none');
        setTimeout(() => { 
            window.open(url, '_blank'); 
            form.reset(); 
            setTimeout(() => successDiv.classList.add('d-none'), 5000); 
        }, 1000);
    });
}

// Imagen sorpresa
const enlace = document.getElementById('enlaceImagen');
const imagenDiv = document.getElementById('imagenOculta');
if (enlace) {
    enlace.addEventListener('click', (e) => {
        e.preventDefault();
        if (imagenDiv.style.display === 'none' || imagenDiv.style.display === '') {
            imagenDiv.style.display = 'block';
            enlace.textContent = 'Ocultar imagen';
            canvasConfetti({ particleCount: 50, spread: 40, origin: { y: 0.8 } });
        } else {
            imagenDiv.style.display = 'none';
            enlace.textContent = 'Haz click aquí';
        }
    });
}

// Modal de video
const btnVideo = document.getElementById('btnVideoModal');
if (btnVideo) {
    btnVideo.addEventListener('click', () => {
        const modal = new bootstrap.Modal(document.getElementById('modalVideo'));
        modal.show();
    });
}

// ========== CONTADOR DE DÍAS DESDE 2021 ==========
function calcularDiasAmistad() {
    const fechaInicio = new Date(2021, 0, 1);
    const hoy = new Date();
    const diffTime = Math.abs(hoy - fechaInicio);
    const diffDias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const contadorDias = document.getElementById('contadorDias');
    if (contadorDias) contadorDias.innerText = diffDias;
}

// ========== DATO RANDOM DE LAS 100 COSAS (AHORA SÍ CAMBIA) ==========
const datosRandom = [
    "🐹 Le gustan los guineos con cáscara",
    "☕ Hace café casi a diario",
    "🏍️ Su pasión es andar en moto",
    "🎧 Escucha música todo el tiempo",
    "🍝 Su comida favorita son las pastas",
    "🎲 Le encantan los juegos de mesa",
    "📱 Envía audios larguísimos",
    "😴 No duerme mucho, pero siempre rinde",
    "🎬 Le gusta Peaky Blinders y Dragon Ball",
    "🍪 Come galletas a escondidas",
    "🧥 Su color favorito es el azul profundo",
    "🐹 Le dicen 'baka' pero con cariño",
    "📚 Fue mi compañero en educación media",
    "🎂 Es extrovertido y me anima siempre",
    "🛒 Recuerdo: el día en Dollar City",
    "🚌 Salida pendiente en bus",
    "🍵 Té en el INGO con él",
    "💬 Su frase: 'Juela, mi niño'",
    "🎲 Es el rey de los juegos de mesa",
    "📱 Prefiere audios antes que textos"
];

let intervaloDatoRandom = null;

function mostrarDatoRandom() {
    const randomIndex = Math.floor(Math.random() * datosRandom.length);
    const datoElement = document.getElementById('datoRandomHamster');
    if (datoElement) {
        datoElement.innerHTML = datosRandom[randomIndex];
    }
}

// Iniciar el cambio automático cada 30 segundos
function iniciarCambioAutomaticoDato() {
    if (intervaloDatoRandom) clearInterval(intervaloDatoRandom);
    intervaloDatoRandom = setInterval(() => {
        mostrarDatoRandom();
    }, 3000); // Cambia cada 30 segundos
}

// ========== 100 COSAS ==========
const todasLasCosas = [
    "No creía que le hablaría (excepto para trabajos)",
    "Me veía 'sabiondo' en informática",
    "Es una buena persona",
    "Gracioso",
    "Mentiroso (pero sin malicia)",
    "Generoso",
    "Buen amigo",
    "Algo baka (tonto pero lindo)",
    "Alguien con quien hablar con profundidad",
    "Alguien que apoya",
    "Trata de entender a los demás",
    "Sabe que la vida es difícil y por eso es empático",
    "El extrovertido que me hizo saltarme clases",
    "Quien me ayudó cuando pasaba malos momentos",
    "Alguien que puede escuchar lo mismo una y otra vez",
    "El 🐹 que me agrada bastante",
    "El enamorado del salón",
    "Si no fuera tan enamorado, sería un buen partido",
    "Anduvo con alguien que no me caía ni bien ni mal",
    "El que le dicen 'no hagas esto' y es lo primero que hace",
    "Quien está haciendo que en vez de estudiar, yo escriba esto",
    "El que se la pasa en el trabajo todo el día",
    "Quien se preocupa por los demás",
    "Alguien que le gusta la equidad e igualdad",
    "Quien estuvo a punto de grandes errores pero no los cometió",
    "Esa persona que fue al centro social esa vez",
    "El que llegaba tarde",
    "Quien se quejaba del profe",
    "El vago del salón (pero inteligente)",
    "Al que le gusta el café",
    "El come galletas",
    "El come guineos con cáscara",
    "El que tiene dientitos",
    "Quien a veces duda",
    "El indeciso",
    "El que no se calla",
    "Quien le daba mil vueltas al instituto",
    "Alguien que andaba como cien cosas en la mochila",
    "El que me dijo 'usted' casi un año",
    "El primero que hizo que comiera del mismo desayuno con alguien especial",
    "El necio",
    "El del teléfono Lenovo",
    "El inventor",
    "La primera persona en hacer que escriba 100 cosas",
    "El de los juegos de mesa",
    "El baka que jugó bien feo solo por la novia",
    "El que tenía como 100mil fotos de la ex",
    "El que dicen que es bien baka",
    "El que no ve anime",
    "No ve K-dramas",
    "El pelisplus",
    "El que se enreda con lo que escribe",
    "El de los audios",
    "El de los fondos con colores bonitos",
    "El que dice 'eso no es así'",
    "El que dice 'querés'",
    "El que iba de primero en la lista",
    "Quien lava los pantalones una vez a la semana",
    "El adventista",
    "El que le dice 'tito' a los demás",
    "El que andaba poniendo fondos animados en las laptops",
    "El exagerado",
    "Quien escribe la 'a' como si fuera 'q'",
    "El que pasó el examen de la UES aún siendo flojo",
    "El que responde al año pero es porque trabaja",
    "El que casi no iba a clases",
    "El de las palomitas medias cocidas o quemadas",
    "El de los chocolates",
    "El que escribe abreviado por mensaje",
    "El que envía reels por Instagram",
    "El que no duerme",
    "El que sabe de programación",
    "El novio de Emerson (chiste interno)",
    "El amigo de Ángel",
    "El que le decía mentiras al profe",
    "El que me hizo pensar bastante para escribir 100 cosas",
    "Quien no sé si leerá todo esto",
    "El que me pidió una opinión general y no la di",
    "Alguien a quien puedo llamar 'mejor amigo'",
    "Quien no juzga",
    "Quien molesta tanto",
    "El que todo quiere saber",
    "El metido pues",
    "El que tiene como 100 novias (exageración)",
    "El que me copió en una respuesta del examen y le salió mala",
    "Quien me ayudó con varias cosas en el instituto",
    "Al que no le gusta el fútbol",
    "Quien no creía que escribiría 100 cosas",
    "El que puede decirme 'su majestad'",
    "Al que los papás no lo quieren (broma)",
    "Al que nada lo ofende",
    "Alguien que vale la pena llamar 'amigo'",
    "Quien siempre ve mis estados",
    "El que sale con cosas random",
    "Alguien que sabe que puede mejorar para ser mejor persona",
    "Un pervertido (con cariño)",
    "El chef",
    "El de 'vamos al punto'",
    "El dramático",
    "El amigo que me dejó la educación media y, aunque no hablemos mucho, es bueno seguir en contacto y saber que está ahí para mí y viceversa."
];

function mostrarCosas(limit) {
    const container = document.getElementById('contenedor100Cosas');
    if (!container) return;
    
    const cosasMostrar = todasLasCosas.slice(0, limit);
    
    let col1 = [];
    let col2 = [];
    let col3 = [];
    
    if (limit === 30) {
        col1 = cosasMostrar.slice(0, 10);
        col2 = cosasMostrar.slice(10, 20);
        col3 = cosasMostrar.slice(20, 30);
    } else {
        col1 = cosasMostrar.slice(0, 33);
        col2 = cosasMostrar.slice(33, 66);
        col3 = cosasMostrar.slice(66, 100);
    }
    
    let html = `<div class="row">`;
    
    html += `<div class="col-md-4"><ul class="list-unstyled">`;
    col1.forEach((item, idx) => {
        let numero = idx + 1;
        html += `<li><i class="bi bi-check-circle-fill"></i> ${numero}. ${item}</li>`;
    });
    html += `</ul></div>`;
    
    html += `<div class="col-md-4"><ul class="list-unstyled">`;
    col2.forEach((item, idx) => {
        let numero = col1.length + idx + 1;
        html += `<li><i class="bi bi-check-circle-fill"></i> ${numero}. ${item}</li>`;
    });
    html += `</ul></div>`;
    
    html += `<div class="col-md-4"><ul class="list-unstyled">`;
    col3.forEach((item, idx) => {
        let numero = col1.length + col2.length + idx + 1;
        html += `<li><i class="bi bi-check-circle-fill"></i> ${numero}. ${item}</li>`;
    });
    html += `</ul></div>`;
    
    html += `</div>`;
    
    if (limit === 30) {
        html += `<div class="text-center mt-4">
                    <button id="btnVerMas" class="btn-ver-mas"><i class="bi bi-arrow-down-circle"></i> Ver más (70 restantes)</button>
                 </div>`;
    } else {
        html += `<div class="text-center mt-4">
                    <button id="btnVerMenos" class="btn-ver-mas"><i class="bi bi-arrow-up-circle"></i> Ver menos (volver a 30)</button>
                 </div>`;
        html += `<div class="text-center mt-2 fst-italic text-muted">🐹 Extra: el hámster 🐹</div>`;
    }
    
    container.innerHTML = html;
    
    const btnVerMas = document.getElementById('btnVerMas');
    if (btnVerMas) {
        btnVerMas.addEventListener('click', () => {
            mostrarCosas(100);
            window.scrollTo({ top: document.getElementById('100cosas').offsetTop - 80, behavior: 'smooth' });
        });
    }
    
    const btnVerMenos = document.getElementById('btnVerMenos');
    if (btnVerMenos) {
        btnVerMenos.addEventListener('click', () => {
            mostrarCosas(30);
            window.scrollTo({ top: document.getElementById('100cosas').offsetTop - 80, behavior: 'smooth' });
        });
    }
}

// ========== INICIALIZACIÓN ==========
window.addEventListener('load', () => {
    mostrarCosas(30);
    calcularDiasAmistad();
    mostrarDatoRandom();        // Muestra un dato al azar al cargar
    iniciarCambioAutomaticoDato(); // Cambia el dato cada 30 segundos
    
    const modal = new bootstrap.Modal(document.getElementById('modalEntrada'));
    modal.show();
    setTimeout(() => { lanzarConfetiEnModal(); }, 500);
    setTimeout(iniciarBucleInfinito, 300);
});
