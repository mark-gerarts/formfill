var fakerMap;

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
    // Skip hidden form elements and submit buttons.
    if (['hidden', 'submit'].includes(element.type)) {
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
 * @todo:
 * make sure HTML validation is met. E.g. don't exceed an
 * element's maxlength.
 *
 * @param element
 */
function fillElement(element) {
    switch(element.type) {
        case 'select-one':
        case 'select-multiple':
        case 'radio':
        case 'ceckbox':
        case 'range':
            // @todo:
            // should use one or more of the possible options
            // in stead of a faker method.
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
    // First, check if the type is something obvious.
    if (guess = guessFromType(element.type)) {
        return guess;
    }

    // Next, try to guess using the label.
    if (guess = guessFromLabel('@todo')) {
        return guess;
    }

    // As a last resort, return a random word.
    return faker.random.word;
}

/**
 * Checks if we can get am appropriate method using the
 * element's type. E.g. type="email" means we'll use
 * internet.email.
 *
 * @todo: add more types.
 *
 * @param type
 * @returns {*}
 */
function guessFromType(type) {
    switch (type) {
        case 'email':
            return faker.internet.email;
        case 'textarea':
            return faker.lorem.sentence;
    }

    return false;
}

/**
 * Tries to guess the faker method based on the label of
 * an element.
 *
 * @todo: further improve this very basic implementation.
 *
 * @param label
 * @returns {*}
 */
function guessFromLabel(label) {
    for (var [method, group] of getFakerMap()) {
        // If the label is exactly the same, then this probably is
        // the correct method.
        if (method == label) {
            return faker[group][method];
        }
    }

    return false;
}

/**
 * Constructs a map of faker methods. The map keys are methods that
 * generate data, the value is the group which the method belongs to.
 *
 * @returns {Map}
 */
function getFakerMap() {
    // Poor man's memoization.
    if (fakerMap) return fakerMap;
    fakerMap = new Map();

    Object.getOwnPropertyNames(faker)
        .filter(function (groupName) {
            // We want to exclude methods that don't generate
            // any data.
            return !groupName.startsWith('locale');
        })
        .forEach(function (groupName) {
            // Get the methods collected under the given group and add them to the map.
            Object.getOwnPropertyNames(faker[groupName]).forEach(function(method) {
                fakerMap.set(method, groupName);
            });
    });

    return fakerMap;
}

fill();
