const loadJsl = () => {
    const main = document.querySelector('main');
    const kachel = document.querySelector('header .kachel');

    kachel.onclick = () => {
        kachel.disabled = true;
        main.classList.toggle('faded');
        main.addEventListener('transitionend', onTransitionEnd);
    };

    const onTransitionEnd = () => {
        kachel.classList.toggle('clicked')
        main.classList.toggle('faded');
        document.body.classList.toggle('tiles');
        main.removeEventListener('transitionend', onTransitionEnd);
        main.addEventListener('transitionend', freeKachel);
    }

    const freeKachel = () => {
        kachel.disabled = false;
        main.removeEventListener('transitionend', freeKachel);
    }
}

window.addEventListener('load', loadJsl)