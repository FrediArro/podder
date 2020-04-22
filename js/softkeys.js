const options = $("ul.kui-options li");

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
        console.log(options.length);
        console.log(options[0]);
        $(options[0]).focus();

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
        case 'a':
            LSK();
            break;


        case 'SoftRight':
            RSK();
            break;

        //computer use
        case 'd':
            RSK();
            break;
    }
}

document.addEventListener('keydown', handleKeyDown);