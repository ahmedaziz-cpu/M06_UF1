// Variables globales
let numeroSecret;
let intents = 20;
let record = 0;
let numerosAdivinats = [];

// Inicializa el juego al cargar la página
document.addEventListener("DOMContentLoaded", començarJoc);

// Función para iniciar o reiniciar el juego
function començarJoc() {
    numeroSecret = Math.floor(Math.random() * 100) + 1; // Número aleatorio entre 1 y 100
    intents = 20;
    numerosAdivinats = [];
    document.body.style.backgroundColor = 'white'; // Fondo al reiniciar
    document.getElementById("numeroSecret").textContent = "?";
    document.getElementById("text").textContent = "Comencem la partida...";
    document.getElementById("intents").textContent = intents;
    document.getElementById("ProvesAnteriors").textContent = "Números introduïts: cap";
    document.getElementById("ButtonReiniciar").disabled = true; // Deshabilitar botón de reinicio al empezar
    document.getElementById("numberInput").value = ""; 
    document.getElementById("ButtonAdivinar").disabled = false; // Habilitar botón de adivinar
}

// Función para gestionar la validación y la lógica del juego
function verificarValidacio() {
    const numeroIntentado = parseInt(document.getElementById("numberInput").value);
    
    // Validación de entrada
    if (isNaN(numeroIntentado) || numeroIntentado < 1 || numeroIntentado > 100) {
        alert("El número introduït no és correcte. Introdueix un número entre 1 i 100.");
        return;
    }

    // Agregar el número introducido al array y mostrar en pantalla
    numerosAdivinats.push(numeroIntentado);
    document.getElementById("ProvesAnteriors").textContent = "Números introduïts: " + numerosAdivinats.join(", ");

    // Comparar el número introducido con el número secreto
    if (numeroIntentado < numeroSecret) {
        document.getElementById("text").textContent = "El número és més gran!";
    } else if (numeroIntentado > numeroSecret) {
        document.getElementById("text").textContent = "El número és més petit!";
    } else {
        document.getElementById("text").textContent = "Felicitats! Has encertat!";
        document.getElementById("numeroSecret").textContent = numeroSecret;
        document.body.style.backgroundColor = 'green'; // Fondo verde al ganar
        document.getElementById("ButtonAdivinar").disabled = true; // Deshabilitar botón de adivinar tras ganar
        document.getElementById("ButtonReiniciar").disabled = false; // Habilitar botón de reinicio tras ganar

        // Actualizar la puntuación si es la mejor
        if (20 - intents < record || record === 0) {
            record = 20 - intents;
            document.getElementById("record").textContent = record;
        }
        return;
    }

    // Reducir intentos y actualizar el contador
    intents--;
    document.getElementById("intents").textContent = intents;

    // Verificar si se han acabado los intentos
    if (intents === 0) {
        document.getElementById("text").textContent = "No hi ha més jugades. El número era: " + numeroSecret;
        document.getElementById("numeroSecret").textContent = numeroSecret;
        document.body.style.backgroundColor = 'red'; // Fondo rojo al perder
        document.getElementById("ButtonAdivinar").disabled = true; // Deshabilitar botón de adivinar tras perder
        document.getElementById("ButtonReiniciar").disabled = false; // Habilitar botón de reinicio tras perder
    }
}

// Asignar eventos a los botones
document.getElementById("ButtonAdivinar").onclick = verificarValidacio;
document.getElementById("ButtonReiniciar").onclick = començarJoc;
