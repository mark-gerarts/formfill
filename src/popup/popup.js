var btnFillForm = document.getElementById('btn_fill_form');

btnFillForm.addEventListener('click', function(e) {
    chrome.tabs.executeScript(null, {file: "/lib/faker.min.js"}, function () {
        chrome.tabs.executeScript(null, {file: "/formfill.js"});
    });
});
