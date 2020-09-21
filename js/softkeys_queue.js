function CSK() {
    window.history.back();
}

function LSK() {
    window.location.href = "player.html"
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
    }
}

document.addEventListener('keydown', handleKeyDown);