const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const cardsPlayed = [];
let players = [];
let newPlayer; 
let currentComputerCard;
let level = "1";

const $playerForm = document.querySelector('#playerForm');
const $container = document.querySelector('.container');
const $hero = document.querySelector('.hero');
const $computerCard = document.querySelector('.computerCard');
const $passButton = document.querySelector('.pass');
const $myCards = document.querySelector('.my-cards');
const $winpage = document.querySelector('.winpage');
const $replayButton = document.querySelector('.replay');
const $changeButton = document.querySelector('.change');


$playerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const $usernameInput = document.querySelector('#usernameInput').value;

    if ($usernameInput !== '') {
        newPlayer = {
            username: $usernameInput,
            score: 0,
            date: ""
        };

        players.push(newPlayer);
        $playerForm.classList.add('hidden');
        $playerForm.classList.remove('visible')
        $container.classList.add('visible');
        init()
  
    } else {
        alert('Please enter a valid username.');
    }
});

const init= ()=>{
    playerAdd(); 
    pickRandomComputerCard();
    displayRandomCards();
    resetScore(); 
    cardsPlayed.length = 0;
    const unusedCards = []

    
}

const playerAdd = () => {
    let template = `
    <div class="hero-body">
        <div class="columns">
            <div class="column username">${newPlayer.username}</div>
            <div class="column level">niveau ${level}</div>
            <div class="column score">${newPlayer.score} pt</div>
        </div>
    </div>
    `;
    $hero.innerHTML = template;
};

$passButton.addEventListener('click', () => {
    const allPlayerCards = Array.from($myCards.querySelectorAll('.card'));

    allPlayerCards.forEach(card => {
        const playerCardValue = parseInt(card.innerHTML);

        if (playerCardValue === currentComputerCard) {
            card.classList.add('hidden'); 
        }
    });

    if (allPlayerCards.some(card => parseInt(card.textContent) === currentComputerCard)) {
        updateScore(-1); 
    } else {
        updateScore(1); 
    }

    pickRandomComputerCard();
});


const pickRandomComputerCard = () => {
    const unusedCards = cards.filter(card => !cardsPlayed.includes(card));

    if (unusedCards.length > 0) {
        const randomIndex = Math.floor(Math.random() * unusedCards.length);
        currentComputerCard = unusedCards[randomIndex];
        cardsPlayed.push(currentComputerCard);
        $computerCard.innerHTML = currentComputerCard;
    } else {
        console.log('All cards have been used!');
    }
};

const displayRandomCards = () => {
    const $myCards = document.querySelector('.my-cards');

    let template = "";
    const selectedCards = [];

    for (let i = 0; i < 5; i++) {
        let randomCard;

        do {
            const randomIndex = Math.floor(Math.random() * cards.length);
            randomCard = cards[randomIndex];
        } while (selectedCards.includes(randomCard));

        selectedCards.push(randomCard);
    }

    // Trie les cartes en ordre croissant
    selectedCards.sort((a, b) => a - b);

    // Crée le modèle HTML avec les cartes triées
    selectedCards.forEach(randomCard => {
        template += `
            <div class="column">
                <div class="card">${randomCard}</div>
            </div>
        `;
    });

    $myCards.innerHTML = template;
};

$myCards.addEventListener('click', (event) => {
    const clickedCard = event.target.closest('.card');

    if (clickedCard) {
        const playerCardValue = parseInt(clickedCard.innerHTML);

        if (playerCardValue === currentComputerCard) {
            clickedCard.classList.add('hidden');
            pickRandomComputerCard(); 
            updateScore(1); 
        } 
        else {
            updateScore(-1); 
        }
        checkWinCondition(); 
    }
});

const updateScore = (points) => {
    newPlayer.score += points;
    const $scoreElement = document.querySelector('.score');
    let template = ""
    template += ` <p> ${newPlayer.score} pt `
    $scoreElement.innerHTML = template
};

const resetScore = () => {
    newPlayer.score = 0;
    const $scoreElement = document.querySelector('.score');
    $scoreElement.innerHTML = '<p>0 pt</p>'; // Mettez à jour le score avec 0
};

const checkWinCondition = () => {
    const allPlayerCards = Array.from($myCards.querySelectorAll('.card'));
    const allHidden = allPlayerCards.every(card => card.classList.contains('hidden'));

    if (allHidden) {
        const currentDate = new Date();
        newPlayer.date = currentDate;

        // Store player data in localStorage
        const playerData = {
            username: newPlayer.username,
            score: newPlayer.score,
            date: newPlayer.date.toString() // Convert date to string for storage
        };

        // Get existing player data from localStorage
        const existingPlayersData = JSON.parse(localStorage.getItem('players')) || [];

        // Add current player data to the array
        existingPlayersData.push(playerData);

        // Save the updated player data array back to localStorage
        localStorage.setItem('players', JSON.stringify(existingPlayersData));

        $container.classList.add('hidden');
        $container.classList.remove('visible');
        $winpage.classList.add('visible');
        $winpage.classList.remove('hidden');
        winpage(playerData);
    }
};

const winpage = (playerData) => {
    let template = `
    <div class="column score">${playerData.username}</div>
    <div class="column score">${playerData.score} pt</div>
    <div class="column score">${playerData.date}</div>
    `;

    $winpage.insertAdjacentHTML('afterbegin', template);
}

$replayButton.addEventListener('click', () => {
    init();
    $container.classList.add('visible');
    $container.classList.remove('hidden');
    $winpage.classList.add('hidden');
    $winpage.classList.remove('visible');
});

$changeButton.addEventListener('click', () => {
    $playerForm.classList.remove('hidden');
    $playerForm.classList.add('visible');
    $winpage.classList.add('hidden');
    $winpage.classList.remove('visible');
});
