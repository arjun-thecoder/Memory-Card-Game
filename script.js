// JavaScript for Game Logic
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const levelSelector = document.getElementById('level');
    const gameBoard = document.getElementById('game-board');

    const levels = {
        easy: 10,
        medium: 20,
        hard: 40
    };

    let firstCard, secondCard;
    let hasFlippedCard = false;
    let lockBoard = false;
    let matches = 0;
    let totalPairs;

    startButton.addEventListener('click', startGame);

    function startGame() {
        gameBoard.innerHTML = '';
        matches = 0;
        totalPairs = levels[levelSelector.value] / 2;
        const cards = createCards(levels[levelSelector.value]);
        shuffle(cards);
        cards.forEach(card => gameBoard.appendChild(card));
    }

    function createCards(num) {
        const cards = [];
        for (let i = 0; i < num / 2; i++) {
            cards.push(createCard(i), createCard(i));
        }
        return cards;
    }

    function createCard(id) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.id = id;

        const frontFace = document.createElement('div');
        frontFace.classList.add('front');

        const backFace = document.createElement('div');
        backFace.classList.add('back');
        backFace.textContent = id;

        card.appendChild(frontFace);
        card.appendChild(backFace);

        card.addEventListener('click', flipCard);

        return card;
    }

    function flipCard() {
        if (lockBoard || this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.id === secondCard.dataset.id;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
        matches++;
        if (matches === totalPairs) {
            setTimeout(() => alert('You won!'), 500);
        }
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }
});
