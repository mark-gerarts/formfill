// Main function. Fetches each form element and fills it.
function fill() {
    document.querySelectorAll('form').forEach(fillForm);
}

function fillForm(form) {
    if (typeof form.elements === 'undefined') return;

    [... form.elements]
        .filter(shouldFillElement)
        .forEach(fillElement);
}

function shouldFillElement(element) {
    // Skip hidden form elements.
    return element.type !== 'hidden';
}

function fillElement(element) {
    switch(element.type) {
        case 'select-one':
        case 'select-multiple':
            return;
        case 'email':
            element.value = faker.internet.email();
            break;
        default:
            element.value = faker.random.word();
    }
}

fill();
