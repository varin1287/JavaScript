

'use strict';

const Basket = {
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


    countBasketPrice() {
        let sum = 0;
        let shopping_list = [];
        let number_of_goods = 0;
        for (let i = 0; i < this.goods.length; i++) {
            sum += (this.goods[i].price * this.goods[i].quantity)
            if (sum !== 0) {
                shopping_list.push([this.goods[i].product_name, this.goods[i].quantity]);
                number_of_goods++;
            }
        }
        if (sum === 0) {
            return ['корзина пуста', shopping_list];
        }
        return ['В корзине: ' + number_of_goods + ' товара(-ов) на сумму ' + sum + ' рублей', shopping_list];
    }

}


let rez = Basket.countBasketPrice();

const divTag = document.querySelector('div');
divTag.innerHTML = rez[0];


const divTag_2 = document.querySelector('.div_2')


for (const val of rez[1]) {
    if (val[1] !== 0) {
        divTag_2.innerHTML += val[0] + ' вы купили ' + val[1] + ' штук, '
    }
}




