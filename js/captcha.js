// Functie om een willekeurig getal te genereren voor de CAPTCHA
function generateCaptcha() {
    var captcha = Math.floor(Math.random() * 10000);
    document.getElementById('captcha').innerText = captcha;
    document.getElementById('captchaInput').value = '';
    document.getElementById('captchaError').innerText = '';
}

// Functie om de ingediende CAPTCHA te controleren
function checkCaptcha() {
    var captcha = document.getElementById('captcha').innerText;
    var userInput = document.getElementById('captchaInput').value;
    var errorMessageElement = document.getElementById('captchaError');
    if (captcha === userInput) {
        errorMessageElement.innerText = '';
        return true;
    } else {
        errorMessageElement.innerText = 'CAPTCHA onjuist. Probeer opnieuw.';
        return false;
    }
}


// Functie uitvoeren als je de pagina binnenkomt
window.onload = generateCaptcha();

function showSpinner() {
    document.getElementById('spinner').style.display = 'block';
    setTimeout(hideSpinner, 1000);
}

function hideSpinner() {
    document.getElementById('spinner').style.display = 'none';
}