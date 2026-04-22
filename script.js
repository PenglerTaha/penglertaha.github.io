console.log("JS is connected!");
alert("If you see this, the game is working!");

let deck = [];
let dealerSum = 0;
let playerSum = 0;
let dealerAceCount = 0;
let playerAceCount = 0;
let hidden; // The dealer's face-down card
let canHit = true; // Allows player to hit while sum <= 21

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["♣", "♦", "♥", "♠"];
    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + types[i]);
        }
    }
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);

    // Deal to Dealer until 17
    while (dealerSum < 17) {
        let card = deck.pop();
        createCardElement(card, "dealer-cards");
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
    }

    // Deal 2 cards to Player
    for (let i = 0; i < 2; i++) {
        let card = deck.pop();
        createCardElement(card, "player-cards");
        playerSum += getValue(card);
        playerAceCount += checkAce(card);
    }

    document.getElementById("hit-btn").addEventListener("click", hit);
    document.getElementById("stand-btn").addEventListener("click", stand);
    document.getElementById("player-sum").innerText = playerSum;
}

function hit() {
    if (!canHit) return;

    let card = deck.pop();
    playerSum += getValue(card);
    playerAceCount += checkAce(card);
    createCardElement(card, "player-cards");

    if (reduceAce(playerSum, playerAceCount) > 21) {
        canHit = false;
        stand(); // Auto-stand if bust
    }
    document.getElementById("player-sum").innerText = reduceAce(playerSum, playerAceCount);
}

function stand() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    playerSum = reduceAce(playerSum, playerAceCount);
    canHit = false;

    // Reveal hidden card
    let hiddenCardElement = document.createElement("div");
    hiddenCardElement.classList.add("card-placeholder");
    hiddenCardElement.innerText = hidden;
    document.getElementById("dealer-cards").prepend(hiddenCardElement);

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("player-sum").innerText = playerSum;

    let message = "";
    if (playerSum > 21) {
        message = "You Bust!";
    } else if (dealerSum > 21) {
        message = "Dealer Busts! You Win!";
    } else if (playerSum == dealerSum) {
        message = "Tie!";
    } else if (playerSum > dealerSum) {
        message = "You Win!";
    } else {
        message = "You Lose!";
    }

    document.getElementById("results").innerText = message;
    document.getElementById("hit-btn").disabled = true;
    document.getElementById("stand-btn").disabled = true;
}

function getValue(card) {
    let data = card.substring(0, card.length - 1); // Get value without suit
    if (isNaN(data)) {
        if (data == "A") return 11;
        return 10; // J, Q, K
    }
    return parseInt(data);
}

function checkAce(card) {
    if (card[0] == "A") return 1;
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}

function createCardElement(card, containerId) {
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card-placeholder");
    cardDiv.innerText = card;
    document.getElementById(containerId).append(cardDiv);
}
