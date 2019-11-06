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
let editarPerfil = logoPerfil.children.item(1);
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

//==============================================
//\--- banners Config ONGS
//==============================================
let Banner1 = document.getElementById("banner1");
let Banner2 = document.getElementById("banner2");
let Banner3 = document.getElementById("banner3");
let formBanner1 = document.getElementById("banner1Form");
let formBanner2 = document.getElementById("banner2Form");
let formBanner3 = document.getElementById("banner3Form");

Banner1.addEventListener('mouseover', function (_) {
    Banner1.children.item(1).children.item(1).setAttribute('style', 'opacity: 1; font-size: 1.3em;');
    Banner1.children.item(1).children.item(2).setAttribute('style', 'opacity: 1;');
    Banner1.children.item(0).setAttribute('style', 'background-color: rgba(0, 0, 0, 0.5)');
});

Banner1.addEventListener('mouseout', function (_) {
    Banner1.children.item(1).children.item(1).setAttribute('style', 'opacity: 0.3; font-size: 1.5em;');
    Banner1.children.item(1).children.item(2).setAttribute('style', 'opacity: 0;');
    Banner1.children.item(0).setAttribute('style', 'background-color: rgba(0, 0, 0, 0)');
});

function getBanner1(){
    document.getElementById("bannerInput1").click();
}

function saveBanner1(){
    formBanner1.submit();
}


Banner2.addEventListener('mouseover', function (_) {
    Banner2.children.item(1).children.item(1).setAttribute('style', 'opacity: 1; font-size: 1.3em;');
    Banner2.children.item(1).children.item(2).setAttribute('style', 'opacity: 1;');
    Banner2.children.item(0).setAttribute('style', 'background-color: rgba(0, 0, 0, 0.5)');
});

Banner2.addEventListener('mouseout', function (_) {
    Banner2.children.item(1).children.item(1).setAttribute('style', 'opacity: 0.3; font-size: 1.5em;');
    Banner2.children.item(1).children.item(2).setAttribute('style', 'opacity: 0;');
    Banner2.children.item(0).setAttribute('style', 'background-color: rgba(0, 0, 0, 0)');
});

function getBanner2(){
    document.getElementById("bannerInput2").click();
}

function saveBanner2(){
    formBanner2.submit();
}


Banner3.addEventListener('mouseover', function (_) {
    Banner3.children.item(1).children.item(1).setAttribute('style', 'opacity: 1; font-size: 1.3em;');
    Banner3.children.item(1).children.item(2).setAttribute('style', 'opacity: 1;');
    Banner3.children.item(0).setAttribute('style', 'background-color: rgba(0, 0, 0, 0.5)');
});

Banner3.addEventListener('mouseout', function (_) {
    Banner3.children.item(1).children.item(1).setAttribute('style', 'opacity: 0.3; font-size: 1.5em;');
    Banner3.children.item(1).children.item(2).setAttribute('style', 'opacity: 0;');
    Banner3.children.item(0).setAttribute('style', 'background-color: rgba(0, 0, 0, 0)');
});
function getBanner3(){
    document.getElementById("bannerInput3").click();
}

function saveBanner3(){
    formBanner3.submit();
}