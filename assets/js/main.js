let toggleForm = true;
let loginForm = document.getElementById("boxLogin");
let registerForm = document.getElementById("boxRegister");

function ClickdoadorSignInUp(){
    if(toggleForm){
        loginForm.classList.remove('showForm');
        registerForm.classList.add('showForm');
        toggleForm = false;
    }else{
        loginForm.classList.add('showForm');
        registerForm.classList.remove('showForm');
        toggleForm = true;
    }
}