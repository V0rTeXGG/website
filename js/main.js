window.scrollTo({ top: 0, behavior: 'smooth' })

// menu

document.addEventListener('DOMContentLoaded', function() {
    let menuBtn = document.querySelector('.header__menu');
    let nav = document.querySelector('.header__nav');
    let body = document.body;

    menuBtn.onclick = function() {
        menuBtn.classList.toggle('open')
        nav.classList.toggle('open')
        body.classList.toggle('open')
    }
});




// dropDown menu 
let btnSub = document.querySelector('.nav-item-subtitle');
let subMenu = document.querySelector('.nav__subtitle');
    
btnSub.onclick = function() {   
    subMenu.classList.toggle('open');
    btnSub.classList.toggle('open');
}

function outsideEvtListener(event) {
    if (event.target === btnSub) {
        return;
    }

    subMenu.classList.remove('open')
    btnSub.classList.remove('open')
}

document.addEventListener('click', outsideEvtListener)

// catolog loadMore 

document.addEventListener('DOMContentLoaded', function() {
    let moreBtn = document.querySelector('.products__btn');
    let itemLength = document.querySelectorAll('.products__catalog-card').length;
    item = 8;
    moreBtn.addEventListener('click', function(event) {
        item += 4;
        let array = Array.from(document.querySelector('.products__catalog').children);
        let visItem = array.slice(0, item);
        visItem.forEach(el => el.classList.add('visible'));

        if(visItem.length === itemLength) {
            moreBtn.style.display = 'none';
        }
    })
});

// scroll top

let btnScroll = document.querySelector('.scrollTop');
let heigthWindow = document.documentElement.clientHeight;

btnScroll.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
    });
});

window.addEventListener('scroll', function() {
    heigthWindow < pageYOffset ?  btnScroll.style.display = 'block' :  btnScroll.style.display = 'none';
});

