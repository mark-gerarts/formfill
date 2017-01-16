FormFill = {};

// Main function. Fetches each form element and fills it.
FormFill.fill = function() {
    var self = this;

    document.querySelectorAll('form').forEach(function (form) {
        if (typeof form.elements === 'undefined') return;

        [... form.elements].forEach(self.fillElement);
    });
};

FormFill.fillElement = function(element) {
    console.log('filling ' + element.name);
};

FormFill.fill();

console.log(faker)
