// Blackjack Game Logic
let blackjackGame = {
  'you': {
    'scoreSpan': '#your-blackjack-result',
    'div': '#your-box',
    'score': 0
  },
  'dealer': {
    'scoreSpan': '#dealer-blackjack-result',
    'div': '#dealer-box',
    'score': 0
  },
  'cards': ['2','3','4','5','6','7','8','9','10','K','Q','J','A'],
  'cardsMap': {
    '2': 2, 
    '3': 3, 
    '4': 4, 
    '5': 5, 
    '6': 6, 
    '7': 7, 
    '8': 8, 
    '9': 9, 
    '10': 10, 
    'K': 10, 
    'Q': 10, 
    'J': 10, 
    'A': [1,11]
  },
  'wins': 0,
  'losses': 0,
  'draws': 0,
  'isStand': false,
  'turnsOver': false
}

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']
const hitSound = new Audio('assets/sounds/swish.m4a')
const winSound = new Audio('assets/sounds/cash.mp3')
const lossSound = new Audio('assets/sounds/aww.mp3')

document
  .querySelector("#blackjack-hit-btn")
  .addEventListener("click", blackjackHit)
document
  .querySelector("#blackjack-stand-btn")
  .addEventListener("click", dealerLogic)
document
  .querySelector("#blackjack-deal-btn")
  .addEventListener("click", blackjackDeal)


function showCard(card, activePlayer) {
  if(activePlayer['score'] <= 21) {
    let cardImage = document.createElement('img')
    cardImage.src = `assets/images/${card}.png`
    document.querySelector(activePlayer['div']).appendChild(cardImage)
    hitSound.play()
  } else {

  }
  
}

function randomCard() {
  let randomIndex = Math.floor(Math.random()*13)
  return blackjackGame['cards'][randomIndex]
}

function blackjackHit() {
  if(blackjackGame['isStand'] === false) {
    let card = randomCard()
    showCard(card, YOU)
    updateScore(card, YOU)
    showScore(YOU)
  }
}

function blackjackStand() {
  let card = randomCard()
  showCard(card, DEALER)
  updateScore(card, DEALER)
  showScore(DEALER)
}

function blackjackDeal() {
  if(blackjackGame['turnsOver'] === true) {

    blackjackGame['isStand'] = false

    let yourImages = document.querySelector('#your-box').querySelectorAll('img')
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img')
    
    for(let i = 0; i < yourImages.length; i++) {
      yourImages[i].remove()
    }
    for(let i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove()
    }

    YOU['score'] = 0
    DEALER['score'] = 0
    document.querySelector('#your-blackjack-result').textContent = 0
    document.querySelector('#your-blackjack-result').style.color = 'white'
    document.querySelector('#dealer-blackjack-result').textContent = 0
    document.querySelector('#dealer-blackjack-result').style.color = 'white'
    document.querySelector('#blackjack-result').textContent = "Let's Play"
    document.querySelector('#blackjack-result').style.color = 'black'

    blackjackGame['turnsOver'] = false
  }
}

function updateScore(card, activePlayer) {
  // If adding 11 keeps me below 21, add 11, else add 1
  if (card === 'A') {
    if(activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
      activePlayer['score'] += blackjackGame['cardsMap'][card][1]
    } else {
      activePlayer['score'] += blackjackGame['cardsMap'][card][0]
    }
  } else {
    activePlayer['score'] += blackjackGame['cardsMap'][card]
  }
}

function showScore(activePlayer) {
  if(activePlayer['score'] > 21) {
    document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!'
    document.querySelector(activePlayer['scoreSpan']).style.color = 'red'
  } else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']
  }
}

function dealerLogic() {
  blackjackGame['isStand'] = true
  let card = randomCard()
  showCard(card, DEALER)
  updateScore(card, DEALER)
  showScore(DEALER)

  if(DEALER['score'] > 15) {
    blackjackGame['turnsOver'] = true
    let winner = computeWinner()
    showResult(winner)
    console.log(blackjackGame['turnsOver'])
  }
}

// compute winner and return who won
// update the wins, draws & losses
function computeWinner() {
  let winner;
  if(YOU['score'] <= 21) {
    // condition: higher score than dealer or when dealer busts but you're 21 and under
    if(YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
      blackjackGame['wins']++
      winner = YOU
    } else if(YOU['score'] < DEALER['score']) {
      blackjackGame['losses']++
      winner = DEALER
    } else if(YOU['score'] === DEALER['score']) {
      blackjackGame['draws']++
    }
    // condition: when user busts but dealer doesn't
  } else if(YOU['score'] > 21 && DEALER['score'] <= 21) {
    blackjackGame['losses']++
    winner = DEALER
    // condtion: when both busts
  } else if(YOU['score'] > 21 && DEALER['score'] > 21) {
    blackjackGame['draws']++
  }
  console.log(blackjackGame);
  return winner
}

function showResult(winner) {
  let message, messageColor

  if(blackjackGame['turnsOver'] === true) {
    if(winner === YOU) {
      document.querySelector('#wins').textContent = blackjackGame['wins']
      message = 'You won!'
      messageColor = 'green'
      winSound.play()
    } else if(winner === DEALER) {
      document.querySelector('#losses').textContent = blackjackGame['losses']
      message = 'You lost!'
      messageColor = 'red'
      lossSound.play()
    } else {
      document.querySelector('#draws').textContent = blackjackGame['draws']
      message = 'You drew!'
      messageColor = 'orange'
    }

    document.querySelector('#blackjack-result').textContent = message
    document.querySelector('#blackjack-result').style.color = messageColor
  }
}
