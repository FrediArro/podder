function handleKeyDown(evt) {
    switch (evt.key) {
        case 'Backspace':
            window.history.back();
            break;
    }
}


document.addEventListener('keydown', handleKeyDown);