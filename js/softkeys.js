function CSK() {
    window.history.back();
}

function LSK() {
    window.location.href = "player.html"
}

function RSK() {
    if ($("div.kui-option-menu").css("display")==="none") {
        $("div.kui-option-menu").css("display", "block");
        $("div.kui-option-menu-background").css("display", "block");
        $("ul.kui-options li:first").focus();

    }
    else {
        $("div.kui-option-menu").css("display", "none");
        $("div.kui-option-menu-background").css("display", "none");
    }
}

function handleKeyDown(evt) {


    switch (evt.key) {


        case 'Enter':
            CSK();
            break;

        case 'SoftLeft':
            LSK();
            break;

        //computer use
        case ',':
            LSK();
            break;


        case 'SoftRight':
            RSK();
            break;

        //computer use
        case "-":
            RSK();
            break;
    }
}

document.addEventListener('keydown', handleKeyDown);