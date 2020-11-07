
/* С помощью цикла while вывести все простые числа в промежутке от 0 до 100 */

'use strict';

let number = 2;
let prime_numbers = [];

while (number <= 100) {
    let i = 2;
    while (number % i != 0) {
        i++;
    }
    if (number == i) {
        prime_numbers.push(number);
    }
    number++;
}

console.log(prime_numbers);




