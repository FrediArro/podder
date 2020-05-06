function LSK() {
    window.location.href = "player.html"
}

function RSK() {
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