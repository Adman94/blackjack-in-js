// Blackjack Logic
function blackjackHit() {
  alert("Hit clicked");
}
function blackjackStand() {
  alert("Stand clicked");
}
function blackjackDeal() {
  alert("Deal clicked");
}

document
  .querySelector("#blackjack-hit-btn")
  .addEventListener("click", blackjackHit);
document
  .querySelector("#blackjack-stand-btn")
  .addEventListener("click", blackjackStand);
document
  .querySelector("#blackjack-deal-btn")
  .addEventListener("click", blackjackDeal);
