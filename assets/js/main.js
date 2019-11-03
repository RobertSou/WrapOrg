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


//==============================================
//\--- Banner Configurações da ONG
//==============================================
let bannerPerfil = document.getElementById("bannerPerfil");
let bannerLink = document.getElementById("editarBanner").children.item(1);
let bannerImg = document.getElementById("editarBanner").children.item(2);
let bannerForm = document.getElementById("formBanner");

bannerPerfil.addEventListener('mouseover', function (_) {
    bannerLink.setAttribute('style', 'opacity: 1;');
    bannerImg.setAttribute('style', 'opacity: 1;font-size: 1.3em;');
});

bannerPerfil.addEventListener('mouseout', function (_) {
    bannerLink.setAttribute('style', 'opacity: 0;');
    bannerImg.setAttribute('style', 'opacity: 0.3;font-size: 1.5em;');
});

function getBannerImage() {
    document.getElementById('bannerImage').click();
}

function saveBanner() {
    bannerForm.submit();
}

//==============================================
//\--- Imagem de perfil Configurações da ONG
//==============================================
let logoPerfil = document.getElementById("logoPerfil");
let editarPerfil = logoPerfil.children.item(0);
let profileLink = document.getElementById("editarPerfil").children.item(2);
let profileImg = document.getElementById("editarPerfil").children.item(1);
let profileForm = document.getElementById("formProfile");

logoPerfil.addEventListener('mouseover', function (_) {
    profileLink.setAttribute('style', 'opacity: 1;');
    profileImg.setAttribute('style', 'opacity: 1; font-size: 1.3em;');
    editarPerfil.setAttribute('style', 'background-color: rgba(0, 0, 0, 0.5)');
});

logoPerfil.addEventListener('mouseout', function (_) {
    profileLink.setAttribute('style', 'opacity: 0;');
    profileImg.setAttribute('style', 'opacity: 0;font-size: 1.5em;');
    editarPerfil.setAttribute('style', 'background-color: none');
});

function getProfileImage() {
    document.getElementById('profileImage').click();
}

function savePicture() {
    profileForm.submit();
}