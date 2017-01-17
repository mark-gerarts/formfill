/**
 * Main function. Fetches each form element and fills it.
 */
function fill() {
    document.querySelectorAll('form').forEach(fillForm);
}

/**
 * Fills a single form.
 *
 * @param form
 */
function fillForm(form) {
    if (typeof form.elements === 'undefined') return;

    [... form.elements]
        .filter(shouldFillElement)
        .forEach(fillElement);
}

/**
 * Checks if the given element should be filled or ignored.
 * E.g. an input with type="hidden" wil lbe ignored.
 *
 * @param element
 * @returns {boolean}
 */
function shouldFillElement(element) {
    // Skip hidden form elements.
    if (element.type == 'hidden') {
        return false;
    }
    // Skip disabled elements.
    if (element.disabled) {
        return false;
    }

    // Nothing is stopping us to fill this element.
    return true;
}

/**
 * Fills a single element.
 *
 * @param element
 */
function fillElement(element) {
    switch(element.type) {
        case 'select-one':
        case 'select-multiple':
            // @todo:
            // should use one or more of possible
            // the possible options in stead of a
            // faker method.
            return;
        default:
            element.value = guessFakerMethod(element)();
    }
}

/**
 * Guesses the faker method for the given form field.
 * Returns a callable.
 *
 * @param element
 * @returns {*}
 */
function guessFakerMethod(element) {
    if (element.type == 'email') {
        return faker.internet.email;
    }

    // As a last resort, return a random word.
    return faker.random.word;
}

fill();
