let scrambledWord = '';
let currentWord = '';
let score = 0;
let attemptedWords = 0;
let failedAttempts = 0;
const maxAttempts = 3;
let bestScore = 0;

const words = [
    'planet', 'Bird', 'garden', 'computer', 'javascript', 'Magic', 'scramble', 'victory',
    'Trust', 'coffee', 'ocean', 'notebook', 'keyboard', 'screen', 'weather',
    'bicycle', 'adventure', 'friends', 'programming', 'Wind', 'mystery',
    'fantasy', 'artificial', 'puzzle', 'Story', 'strategy', 'landscape',
    'knowledge', 'Home', 'destination', 'Journey' , 'spoken' , 'freedom' , 'english'
];

function startGame() {
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    resetGame();
    nextWord();
}

function resetGame() {
    score = 0;
    attemptedWords = 0;
    failedAttempts = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('attempted-words').textContent = attemptedWords;
    document.getElementById('failed-attempts').textContent = failedAttempts;
    document.getElementById('game-over-message').style.display = 'none';
    document.getElementById('status').textContent = '';
    document.getElementById('guess').value = '';
    document.getElementById('correct-answer').style.display = 'none';
    updateBestScore();
}

function nextWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    scrambledWord = shuffleWord(currentWord);
    document.getElementById('scrambled-word').textContent = scrambledWord;
    document.getElementById('guess').value = '';
    document.getElementById('status').textContent = '';
    failedAttempts = 0;
    document.getElementById('failed-attempts').textContent = failedAttempts;
}

function shuffleWord(word) {
    const shuffledArray = word.split('').sort(() => 0.5 - Math.random());
    return shuffledArray.join('');
}

function checkGuess() {
    const guess = document.getElementById('guess').value.toLowerCase();
    attemptedWords++;
    document.getElementById('attempted-words').textContent = attemptedWords;

    if (guess === currentWord) {
        score++;
        document.getElementById('score').textContent = score;
        document.getElementById('status').textContent = 'Correct!';
        updateBestScore();
        nextWord();
    } else {
        failedAttempts++;
        document.getElementById('failed-attempts').textContent = failedAttempts;
        document.getElementById('status').textContent = 'Incorrect!';

        if (failedAttempts >= maxAttempts) {
            showCorrectWordTemporarily();
        }
    }
}

function revealWord() {
    document.getElementById('correct-word').textContent = currentWord;
    document.getElementById('correct-answer').style.display = 'block';

    setTimeout(() => {
        document.getElementById('correct-answer').style.display = 'none';
    }, 5000); // Hides the correct word after 5 seconds
}

function showCorrectWordTemporarily() {
    document.getElementById('correct-word').textContent = currentWord;
    document.getElementById('correct-answer').style.display = 'block';
    
    setTimeout(() => {
        document.getElementById('correct-answer').style.display = 'none';
        nextWord();
    }, 5000);
}

function updateBestScore() {
    if (score > bestScore) {
        bestScore = score;
        document.getElementById('best-score').textContent = bestScore;
    }
}

function endGame() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('game-over-message').textContent = 'Game Over! Final score: ' + score;
    document.getElementById('game-over-message').style.display = 'block';
    document.getElementById('start-btn').style.display = 'block';
}
