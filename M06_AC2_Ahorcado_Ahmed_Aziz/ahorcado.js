let palabraSecreta = '';
let intentos = 10;
let puntos = 0;
let totalPartidas = 0;
let partidasGanadas = 0;
let maxPuntos = 0;
let erroresActuales = 0; // Nueva variable para contar errores

document.getElementById('formularioPalabra').addEventListener('submit', function(evento) {
    evento.preventDefault();
    const input = document.getElementById('inputPalabra').value;

    if (validarPalabra(input)) {
        palabraSecreta = input.toLowerCase();
        iniciarJuego();
    }
});

function validarPalabra(palabra) {
    if (!palabra || palabra.length < 4 || /\d/.test(palabra)) {
        alert("La palabra debe tener más de 3 caracteres y no puede contener números.");
        return false;
    }
    return true;
}

function iniciarJuego() {
    document.getElementById('inputPalabra').disabled = true;
    document.querySelector('button[type="submit"]').disabled = true;
    document.getElementById('mostrarPalabra').innerText = '_ '.repeat(palabraSecreta.length);
    crearBotonesLetras();
    erroresActuales = 0; // Reiniciar errores al comenzar el juego
    actualizarImagenAhorcado(); // Actualizar la imagen al iniciar
}

function crearBotonesLetras() {
    const botonesLetras = document.getElementById('botonesLetras');
    botonesLetras.innerHTML = '';

    for (let i = 65; i <= 90; i++) { // ASCII para letras A-Z
        const letra = String.fromCharCode(i);
        const boton = document.createElement('button');
        boton.innerText = letra;
        boton.onclick = () => adivinarLetra(letra.toLowerCase());
        botonesLetras.appendChild(boton);
    }
}

function adivinarLetra(letra) {
    const mostrar = document.getElementById('mostrarPalabra');
    let textoMostrar = mostrar.innerText.split(' ');
    let encontrada = false;

    for (let i = 0; i < palabraSecreta.length; i++) {
        if (palabraSecreta[i] === letra) {
            textoMostrar[i] = letra;
            encontrada = true;
        }
    }

    mostrar.innerText = textoMostrar.join(' ');

    if (!encontrada) {
        erroresActuales++;
        actualizarImagenAhorcado();
        puntos = Math.max(0, puntos - 1); // Restar un punto, sin permitir números negativos
    } else {
        puntos++;
    }

    actualizarPuntos();
    verificarEstadoJuego();
}

function actualizarImagenAhorcado() {
    const imagenAhorcado = document.getElementById('imagenAhorcado');
    imagenAhorcado.src = `images/${erroresActuales}.png`; // Cambiar la imagen según el número de errores
}

function actualizarPuntos() {
    document.getElementById('puntos').innerText = puntos;
}

function verificarEstadoJuego() {
    if (erroresActuales >= intentos) {
        alert("¡Has perdido! La palabra era: " + palabraSecreta);
        reiniciarJuego();
    } else if (!document.getElementById('mostrarPalabra').innerText.includes('_')) {
        alert("¡Has ganado! La palabra era: " + palabraSecreta);
        partidasGanadas++;
        totalPartidas++;
        actualizarMaxPuntos();
        reiniciarJuego();
    }
}

function reiniciarJuego() {
    totalPartidas++;
    document.getElementById('totalPartidas').innerText = totalPartidas;
    document.getElementById('partidasGanadas').innerText = partidasGanadas;
    document.getElementById('inputPalabra').disabled = false;
    document.querySelector('button[type="submit"]').disabled = false;
    document.getElementById('botonesLetras').innerHTML = '';
}

function actualizarMaxPuntos() {
    if (puntos > maxPuntos) {
        maxPuntos = puntos;
        document.getElementById('maxPuntos').innerText = maxPuntos;
    }
}

function mostrarOcultarContraseña() {
    const input = document.getElementById('inputPalabra');
    input.type = input.type === 'password' ? 'text' : 'password';
}
