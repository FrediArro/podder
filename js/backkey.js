function handleKeyDown(evt) {
    var optionsVisible = ($("div.kui-option-menu").css("display") === "block");
    var inputFocused = ($("input").is(":focus"));
    var errorVisible = ($(".kui-error-message").css("display") === "block");
    switch (evt.key) {
        case 'Backspace':
            if (errorVisible || (!inputFocused && !optionsVisible)) {
                evt.preventDefault();
                window.history.back();
                break;
            }
    }
}


document.addEventListener('keydown', handleKeyDown);