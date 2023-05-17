document.addEventListener('DOMContentLoaded', function() {
    const btnOpenWin = document.querySelector('.cart__content-btn');
    const modal = document.querySelector('.modal');
    const modalWin = document.querySelector('.modal__window-cart')

    btnOpenWin.addEventListener('click', () => {
        modal.classList.add('open');
        modalWin.classList.add('active');
        document.body.classList.add('open');
    });

    modal.addEventListener('click', (e) => {
        if(e.target.classList.contains('modal__window-close') || !modalWin.childNodes) {
            modal.classList.remove('open');
            modalWin.classList.remove('active');
            document.body.classList.remove('open');
        }
    });
});
