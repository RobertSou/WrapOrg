//==============================================
//\--- Cards de mensagens
//==============================================
function closeCard() {
    let closeCard = document.getElementsByClassName("closeCard")[0];
    if (closeCard.parentElement.classList.contains('cardSucess')) {
        let card = document.getElementsByClassName("cardSucess")[0];
        card.parentNode.removeChild(card);
    } else if (closeCard.parentElement.classList.contains('cardError')) {
        let card = document.getElementsByClassName("cardError")[0];
        card.parentNode.removeChild(card);
    }
}
