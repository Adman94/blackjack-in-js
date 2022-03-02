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
  }
}

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']
const hitSound = new Audio('assets/sounds/swish.m4a')

document
  .querySelector("#blackjack-hit-btn")
  .addEventListener("click", blackjackHit)
document
  .querySelector("#blackjack-stand-btn")
  .addEventListener("click", blackjackStand)
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
  let card = randomCard()
  showCard(card, YOU)
  updateScore(card, YOU)
  showScore(YOU)
  console.log(YOU['score']);
}

function blackjackStand() {
  let card = randomCard()
  showCard(card, DEALER)
  updateScore(card, DEALER)
  showScore(DEALER)
  console.log(DEALER['score']);
}

function blackjackDeal() {
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