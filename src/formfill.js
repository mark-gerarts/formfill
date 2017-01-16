(function (faker) {
    FormFill = {};

    // Main function. Fetches each form element and fills it.
    FormFill.fill = function() {
        document.querySelectorAll('form').forEach(this.fillForm);
    };

    FormFill.fillForm = function (form) {
        if (typeof form.elements === 'undefined') return;

        [... form.elements]
        .filter(FormFill.shouldFillElement)
            .forEach(FormFill.fillElement);
    };

    FormFill.shouldFillElement = function(element) {
        // Skip hidden form elements.
        return element.type !== 'hidden';
    };

    FormFill.fillElement = function(element) {
        console.log(element.type);
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
    };

    FormFill.fill();
})(faker);
