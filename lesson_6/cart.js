const cartItem = {
    render(good) {
        return `<div class="good">
                    <div><b>Наименование</b>: ${good.product_name}</div>
                    <div><b>Цена за шт.</b>: ${good.price}</div>
                    <div><b>Количество</b>: ${good.quantity}</div>
                    <div><b>Стоимость</b>: ${good.quantity * good.price}</div>
                </div>`;
    }
}

const catalogItem = {


    render(good) {
        let my_src = '<img src="" data-full_image_url="" alt="нет фото товара" style="width: 20%;">';
        if (good.images_min) {
            my_src = ''
            for (let k = 0; k < good.images_min.length; k++) {
                my_src += '<img src="' + good.images_min[k] + ' " data-full_image_url="' + good.images_max[k] +
                    ' " alt="нет фото товара" style="width: 20%;">'
                // style в теге плохой стиль знаю
            }
        }
        return `<div class="good">
                    <div><b>Наименование</b>: ${good.product_name}</div>
                    <div><b>Цена за шт.</b>: ${good.price}</div>
                    <button class="${good.product_name}">В корзину</button> 
                    <div class="galleryPreviewsContainer">
                        ${my_src}
                    </div>          
                </div>`;
    }
}
// картинки думал сделать через массив ссылок в каталоге, но не успел
// переход между картинками сделать не успел

const catalog = {
    my_catalog_ListBlock: null,
    catalogItem,
    my_catalog_Button: null,
    to_busket_Button: null,


    goods: [
        {
            id_product: 111,
            product_name: 'яблоки',
            price: 2,
            images_min: ['images/min/1.jpg', 'images/min/2.jpg', 'images/min/3.jpg', 'images/min/4.jpg'],
            images_max: ['images/max/1.jpg', 'images/max/2.jpg', 'images/max/3.jpg', 'images/max/4.jpg']
        },
        {
            id_product: 112,
            product_name: 'груши',
            price: 4,
            images_min: ['images/min/1.jpg', 'images/min/2.jpg', 'images/min/3.jpg', 'images/min/4.jpg'],
            images_max: ['images/max/1.jpg', 'images/max/2.jpg', 'images/max/3.jpg', 'images/max/4.jpg']
        },
        {
            id_product: 113,
            product_name: 'сливы',
            price: 5,
            images_min: ['images/min/1', 'images/min/2', 'images/min/3', 'images/min/4'],
            images_max: ['images/max/1', 'images/max/2', 'images/max/3', 'images/max/4']
        },
        {
            id_product: 114,
            product_name: 'персики',
            price: 11,

        }
    ],
    init() {

        this.my_catalog_ListBlock = document.querySelector('.my_catalog');
        this.my_catalog_Button = document.querySelector('.my_catalog-btn');

        this.render();
    },
    render() {
        this.goods.forEach(good => {
            this.my_catalog_ListBlock.insertAdjacentHTML('afterbegin', this.catalogItem.render(good));
            this.to_busket_Button = document.querySelector('.' + good.product_name);

            this.to_busket_Button.addEventListener('click', (event) => this.add_to_basket(event));
            gallery.init({ previewSelector: '.galleryPreviewsContainer' })


        });
        this.my_catalog_ListBlock.insertAdjacentHTML('afterbegin', '<h2> Каталог </h2>');

    },

    add_to_basket(event) {
        // console.log(this.goods); почему-то не работает
        // console.log(catalog.goods); // так работает. Почему?

        let goods_name;
        let not_this_good = true;
        for (let j = 0; j < cart.goods.length; j++) {
            goods_name = cart.goods[j].product_name;
            if (goods_name === event.target.className) {
                cart.goods[j].quantity++;
                not_this_good = false;
                break
            }

        }
        if (not_this_good) {
            cart.goods.push({
                id_product: 111, // переписывать на случайный не стал
                product_name: event.target.className,
                price: 2,
                quantity: 1
            })
        }

        const cart_list = document.querySelector('.cart-list');
        cart_list.remove();

        cart.init();

    },
}


const cart = {
    cartListBlock: null,
    cartButton: null,
    cartItem,
    goods: [
        {
            id_product: 111,
            product_name: 'яблоки',
            price: 2,
            quantity: 5
        },
        {
            id_product: 112,
            product_name: 'груши',
            price: 4,
            quantity: 7
        },
        {
            id_product: 113,
            product_name: 'сливы',
            price: 5,
            quantity: 12
        },
        {
            id_product: 114,
            product_name: 'персики',
            price: 11,
            quantity: 0
        }
    ],


    init() {

        document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="cart-list"></div>');

        this.cartListBlock = document.querySelector('.cart-list');
        this.cartButton = document.querySelector('.cart-btn');
        this.cartButton.addEventListener('click', this.clearCart.bind(this));

        this.render();

    },
    render() {
        this.cartListBlock.insertAdjacentHTML('afterbegin', '<h2> Корзина </h2>');

        if (this.goods.length) {
            this.goods.forEach(good => {
                this.cartListBlock.insertAdjacentHTML('beforeend', this.cartItem.render(good));
            });
            this.cartListBlock.insertAdjacentHTML('beforeend', `В корзине ${this.goods.length} позиций(а) стоимостью ${this.getCartPrice()}`);
        } else {
            this.cartListBlock.textContent = 'Корзина пуста';
        }

    },
    getCartPrice() {
        return this.goods.reduce(function (price, good) {
            return price + good.price * good.quantity;
        }, 0);
    },
    clearCart() {
        this.goods = [];
        this.render();
    },
};

const gallery = {
    settings: {
        previewSelector: '.mySuperGallery',
        openedImageWrapperClass: 'galleryWrapper',
        openedImageClass: 'galleryWrapper__image',
        openedImageScreenClass: 'galleryWrapper__screen',
        openedImageCloseBtnClass: 'galleryWrapper__close',
        openedImageCloseBtnSrc: 'images/gallery/close.png',
    },

    init(userSettings = {}) {
        Object.assign(this.settings, userSettings);

        document.querySelector(this.settings.previewSelector)
            .addEventListener('click', (event) => {
                this.containerClickHandler(event);
            });

    },

    containerClickHandler(event) {
        if (event.target.tagName !== 'IMG') return;

        this.openImage(event.target.dataset.full_image_url);
    },

    openImage(src) {
        this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`).src = src;
    },

    getScreenContainer() {
        const galleryWrapperElement = document
            .querySelector(`.${this.settings.openedImageWrapperClass}`);

        if (galleryWrapperElement) return galleryWrapperElement;

        return this.createScreenContainer();
    },

    createScreenContainer() {
        const galleryWrapperElement = document.createElement('div');
        galleryWrapperElement.classList.add(this.settings.openedImageWrapperClass);

        const galleryScreenElement = document.createElement('div');
        galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
        galleryWrapperElement.appendChild(galleryScreenElement);

        const closeImageElement = new Image();
        closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
        closeImageElement.src = this.settings.openedImageCloseBtnSrc;
        closeImageElement.addEventListener('click', () => this.close());
        galleryWrapperElement.appendChild(closeImageElement);


        const image = new Image();
        image.classList.add(this.settings.openedImageClass);
        galleryWrapperElement.appendChild(image);



        document.body.appendChild(galleryWrapperElement);

        return galleryWrapperElement;
    },



    close() {
        document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
    },
};



catalog.init();
cart.init();
