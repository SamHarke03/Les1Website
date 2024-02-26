const form = document.querySelector(".form-contactpagina");
const fields = {
    email: { input: document.getElementById("email"), error: document.querySelector("#email + span.error") },
    phone: { input: document.getElementById("phone"), error: document.querySelector("#phone + span.error") },
    firstName: { input: document.getElementById("firstName"), error: document.querySelector("#firstName + span.error") },
    lastName: { input: document.getElementById("lastName"), error: document.querySelector("#lastName + span.error") },
    subject: { input: document.getElementById("subject"), error: document.querySelector("#subject + span.error") },
    message: { input: document.getElementById("message"), error: document.querySelector("#message + span.error") }
};

// Event listeners for input fields
Object.values(fields).forEach(field => {
    field.input.addEventListener("input", () => {
        if (field.input.validity.valid) {
            clearError(field.error);
        } else {
            showError(field.input, field.error);
        }
    });
});

// Submit event listener
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let hasError = false;

    // Check validity of each field
    Object.values(fields).forEach(field => {
        if (!field.input.validity.valid) {
            showError(field.input, field.error);
            hasError = true;
        }
    });

    // Check captcha
    if (!checkCaptcha()) {
        hasError = true;
    }

    if (hasError) {
        return;
    }

    // Send form data
    const formData = Object.fromEntries(Object.entries(fields).map(([key, field]) => [key, field.input.value]));
    let response = await fetch('http://localhost:3000/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });

    if (response.status === 422) {
        alert("Een vereist veld is niet ingevuld!");
        return;
    }

    if (response.status === 501) {
        alert("Je hebt meer karakters dan toegestaan ingevoerd.");
        return;
    }

    let data = await response.json();
    alert("Het formulier is met succes verstuurd! Ingevoerde gegevens:" + JSON.stringify(data));

    document.getElementById('contactForm').reset();
    generateCaptcha();
});

function showError(input, errorElement) {
    if (input.validity.valueMissing) {
        errorElement.textContent = "Dit veld is vereist!";
    } else if (input.validity.typeMismatch) {
        errorElement.textContent = "Ingevoerde waarde is ongeldig!";
    }
    errorElement.classList.add("active");
}

function clearError(errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove("active");
}
