
document.addEventListener('DOMContentLoaded', function() {
    const productList = document.querySelector('.products__catalog');
    const cartProductsList = document.querySelector('.cart__content-list');
    const productBtn = document.querySelectorAll('.products__card-btn');
    const cartBtn = document.querySelector('.navBar__cart');
    const cartList = document.querySelector('.simplebar-content');
    const cartQuantity = document.querySelector('.navBar__cart-quantity');
    const fullPrice = document.querySelector('.fullprice');
    const deleteCartBtn = document.querySelector('.cart__content-deleteFull');
    const messageAdd = document.querySelector('.cart-message');
    const modalPrice = document.querySelector('.modal__fullprice');
    const modalTax = document.querySelector('.modal__tax');
    const productPrice = document.querySelector('.modal__price-product');
    let tax = 0;
    let price = 0;
    let products = [];

    const randomId = () => { 
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    };

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

    const plusFullprice = (currentPrice) => {
        return price += currentPrice
    }

    const minusFullprice = (currentPrice) => {
        return price -= currentPrice
    }

    const printFullPrice = () => {
        productPrice.textContent = `Price product: ${formatter.format(price)}`
        fullPrice.textContent = `${formatter.format(price)}`;
        tax = price / 100 * 6;
        modalPrice.textContent = `Full price: ${formatter.format(price + tax)}`;
        modalTax.textContent = `Sales Tax (6.%): ${formatter.format(tax)}`;
    }

    
    const printQuantity = () => {
        let productsListLength = cartProductsList.querySelector('.simplebar-content').children.length;
        cartQuantity.textContent =`Cart (${productsListLength})`;
        productsListLength > 0 ? cartBtn.classList.add('active') : cartBtn.classList.remove('active');
    };

    const generateCartProduct = (img, title, priceInt, price, id) => {
        products.push({
            id: id,
            price: priceInt,
            priceStr: price,
            name: title,
        })
        return ` 
        <li id="${id}" class="cart__content-item">
            <article class="cart__product" data-id="${id}">
                <img src="${img}" alt="" class="cart__product-img">
                    <div class="cart__product-text">
                    <p class="cart__product-title">${title}</p>
                    <span class="cart__product-price">${price}</span>
                    <div class="cart__counter">
                        <button type="button" class="counter__minusBtn counter-btn"></button>
                        <span class="counter-quentity">1</span>
                        <button type="button" class="counter__plusBtn counter-btn"></button>
                    </div>
                </div>
                <button type="button" class="cart__product-delete"></button>
            </article>
        </li>
        `
    }

    // delete products
    const deleteProducts = (productParent) => {
        let elem = products.findIndex(item => item.id === productParent.querySelector('.cart__product').dataset.id);
        let currentPrice = parseInt(productParent.querySelector('.cart__product-price').textContent.replace(/[^\w\s!?]/g,'  '));
        minusFullprice(currentPrice);
        printFullPrice();
        productParent.remove();
        printQuantity()
        products.splice(elem, 1);
    };

    // counter plus product
    const counterPlus = (productParent) => {
        let startPrice = products.find(item => item.id === productParent.querySelector('.cart__product').dataset.id).price;
        let currentPrice = parseInt(productParent.querySelector('.cart__product-price').textContent.replace(/[^\w\s!?]/g,'  '));
        productParent.querySelector('.counter-quentity').textContent++;
        currentPrice += startPrice;
        productParent.querySelector('.cart__product-price').textContent = `${formatter.format(currentPrice)}`;
        plusFullprice(startPrice);
        printFullPrice();
    }

    // add same product
    const addSameProduct = (productParent) => {
        let startPrice = products.find(item => item.id === productParent.querySelector('.cart__product').dataset.id).price;
        let currentPrice = parseInt(productParent.querySelector('.cart__product-price').textContent.replace(/[^\w\s!?]/g,'  '));
        productParent.querySelector('.counter-quentity').textContent++;
        currentPrice += startPrice;
        productParent.querySelector('.cart__product-price').textContent = `${formatter.format(currentPrice)}`;
        plusFullprice(startPrice);
        // printFullPrice();
        console.log(startPrice);
    }

    // counter minus product
    const counterMinus = (productParent) => {
        if (productParent.querySelector('.counter-quentity').textContent == 1) {
            return;
        }
        let startPrice = products.find(item => item.id === productParent.querySelector('.cart__product').dataset.id).price;
        let currentPrice = parseInt(productParent.querySelector('.cart__product-price').textContent.replace(/[^\w\s!?]/g,'  '));
        productParent.querySelector('.counter-quentity').textContent--;
        currentPrice -= startPrice;
        productParent.querySelector('.cart__product-price').textContent = `${formatter.format(currentPrice)}`;
        minusFullprice (startPrice);
        printFullPrice();
    }

    cartProductsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('cart__product-delete')) {
            deleteProducts(e.target.closest('.cart__content-item'));
        };

        if(e.target.classList.contains('counter__minusBtn')) {
            counterMinus(e.target.closest('.cart__content-item'));
        }

        if(e.target.classList.contains('counter__plusBtn')) {
            counterPlus(e.target.closest('.cart__content-item'));

        }
    });

    // add product
    productBtn.forEach(el => {
        el.closest('.products__catalog-card').setAttribute('data-id', randomId());
        el.addEventListener('click', (e) => {
            let self = e.currentTarget;
            let parent = self.closest('.products__catalog-card');
            let id = parent.dataset.id;
            let img = parent.querySelector('.catalog__card-img').getAttribute('src');
            let title = parent.querySelector('.catalog__card-name').textContent;
            let priceString = parent.querySelector('.card__price-now').textContent;
            let priceNumber = parseInt(parent.querySelector('.card__price-now').textContent.replace(/[^\w\s!?]/g,'  '));

            if(messageAdd.classList.contains('inactive')) {
                messageAdd.classList.replace('inactive', 'active');
            } else {
                messageAdd.classList.add('active');
            }
            setTimeout(() => messageAdd.classList.replace('active', 'inactive'), 5000);

            plusFullprice(priceNumber);
            printFullPrice()

            let isAlreadyHasProduct = false;
            products.forEach(itm => {
                if (itm.id === id) {
                    isAlreadyHasProduct = true;
                    return;
                }
            })

            if (isAlreadyHasProduct) {
                if (cartList?.children) {
                    cartList.children.forEach((itm) => {
                        if (itm.id === id) {
                            addSameProduct(itm);
                        }
                    })
                }
            } else {
                cartProductsList.querySelector('.simplebar-content').insertAdjacentHTML('beforeend', generateCartProduct(img, title, priceNumber, priceString, id));
            }
            printQuantity();
            console.log(products);
        });
    });

    // detele all products
    deleteCartBtn.addEventListener('click', function() {
        while(cartList.firstChild) {
            cartList.removeChild(cartList.firstChild);
        };
        price = 0;
        fullPrice.textContent = `${formatter.format(price)}`;
        cartQuantity.textContent = `Cart (0)`;
        products.splice(0, products.length);
        printQuantity();
    });
});








