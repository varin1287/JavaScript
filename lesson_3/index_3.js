
/* Товары в корзине хранятся в массиве. Задачи:
a. Организовать такой массив для хранения товаров в корзине;
b. Организовать функцию countBasketPrice, которая будет считать стоимость корзины.
 */

'use strict';

function countBasketPrice(products) {
    let sum = 0;
    for (let i = 0; i < products.length; i++) {
        sum += (products[i][1] * products[i][2])
    }
    return sum;
}

// ['товар', 'цена', 'кол-во']
let products = [
    ['яблоки', 2, 10],
    ['груши', 3, 4],
    ['сливы', 4, 8],
    ['персики', 5, 0]
]

alert('стоимость корзины ' + countBasketPrice(products));







