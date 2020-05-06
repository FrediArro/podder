document.addEventListener('keydown', handleKeyDown);
var middleRow = $("ul.kui-time-value [tabindex]");
var optionsVisible = false;
var timeSelector = 1;
console.log(middleRow[1]);

function RIGHT() {
    if (optionsVisible){
        if (timeSelector<2){
            timeSelector += 1;
            middleRow[timeSelector].focus()
        }
    }
    else {
        //SKIP TO NEXT TRACK
    }
}

function LEFT() {
    if (optionsVisible){
        if (timeSelector>0){
            timeSelector -= 1;
            middleRow[timeSelector].focus()
        }
    }
    else {
        //GO TO PREVIOUS TRACK
    }
}

function UP() {
    if (optionsVisible){

    }
    else {
        //VOLUME CONTROL
    }
}

function DOWN() {
    if (optionsVisible){

    }
    else {
        //VOLUME CONTROL
    }
}

function LSK() {
    window.location.href = "queue.html"
}

function RSK() {
    if ($("div.kui-option-menu").css("display")==="none") {
        $("div.kui-option-menu").css("display", "block");
        $("div.kui-option-menu-background").css("display", "block");
        optionsVisible = true;
        middleRow[1].focus();

    }
    else {
        $("div.kui-option-menu").css("display", "none");
        $("div.kui-option-menu-background").css("display", "none");
        optionsVisible = false;
        timeSelector = 1
    }
}

function handleKeyDown(evt) {
    switch (evt.key) {
        case "ArrowRight":
            RIGHT();
            break;

        case "ArrowLeft":
            LEFT();
            break;

        case "ArrowUp":
            UP();
            break;

        case "ArrowDown":
            DOWN();
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
