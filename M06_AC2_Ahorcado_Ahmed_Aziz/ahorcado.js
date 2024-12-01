let secretWord = '';
let attempts = 10;
let score = 0;
let totalGames = 0;
let wonGames = 0;
let highScore = 0;
let currentErrors = 0; // Nueva variable para contar errores

document.getElementById('wordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const input = document.getElementById('wordInput').value;
    
    if (validateWord(input)) {
        secretWord = input.toLowerCase();
        startGame();
    }
});

function validateWord(word) {
    if (!word || word.length < 4 || /\d/.test(word)) {
        alert("La paraula ha de ser més de 3 caràcters i no pot contenir números.");
        return false;
    }
    return true;
}

function startGame() {
    document.getElementById('wordInput').disabled = true;
    document.querySelector('button[type="submit"]').disabled = true;
    document.getElementById('wordDisplay').innerText = '_ '.repeat(secretWord.length);
    createLetterButtons();
    currentErrors = 0; // Reiniciar errores al comenzar el juego
    updateHangmanImage(); // Actualizar la imagen al iniciar
}

function createLetterButtons() {
    const lettersButtons = document.getElementById('lettersButtons');
    lettersButtons.innerHTML = '';
    
    for (let i = 65; i <= 90; i++) { // ASCII para letras A-Z
        const letter = String.fromCharCode(i);
        const button = document.createElement('button');
        button.innerText = letter;
        button.onclick = () => guessLetter(letter.toLowerCase());
        lettersButtons.appendChild (button);
    }
}

function guessLetter(letter) {
    const display = document.getElementById('wordDisplay');
    let displayText = display.innerText.split(' ');
    let found = false;

    for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === letter) {
            displayText[i] = letter;
            found = true;
        }
    }

    display.innerText = displayText.join(' ');

    if (!found) {
        currentErrors++;
        updateHangmanImage();
        score = Math.max(0, score - 1); // Restar un punto, sin permitir números negativos
    } else {
        score++;
    }

    updateScore();
    checkGameStatus();
}

function updateHangmanImage() {
    const hangmanImage = document.getElementById('hangmanImage');
    hangmanImage.src = `images/${currentErrors}.png`; // Cambiar la imagen según el número de errores
}

function updateScore() {
    document.getElementById('score').innerText = score;
}

function checkGameStatus() {
    if (currentErrors >= attempts) {
        alert("Has perdut! La paraula era: " + secretWord);
        resetGame();
    } else if (!document.getElementById('wordDisplay').innerText.includes('_')) {
        alert("Has guanyat! La paraula era: " + secretWord);
        wonGames++;
        totalGames++;
        updateHighScore();
        resetGame();
    }
}

function resetGame() {
    totalGames++;
    document.getElementById('totalGames').innerText = totalGames;
    document.getElementById('wonGames').innerText = wonGames;
    document.getElementById('wordInput').disabled = false;
    document.querySelector('button[type="submit"]').disabled = false;
    document.getElementById('lettersButtons').innerHTML = '';
}

function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        document.getElementById('highScore').innerText = highScore;
    }
}

function togglePassword() {
    const input = document.getElementById('wordInput');
    input.type = input.type === 'password' ? 'text' : 'password';
}