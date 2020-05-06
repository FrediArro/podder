function handleKeyDown(evt) {
    switch (evt.key) {
        case 'Backspace':
            evt.preventDefault();
            window.history.back();
            break;
    }
}


document.addEventListener('keydown', handleKeyDown);