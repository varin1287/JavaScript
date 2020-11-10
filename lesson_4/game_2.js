'use strict';

/* Для игры, реализованной на уроке, добавить ограничение движения за пределы карты
*/


const settings = {
    rowCount: 10,
    colCount: 10,
    startPositionX: 0,
    startPositionY: 0,
};

const player = {
    x: null,
    y: null,

    init(startX, startY) {
        this.x = startX;
        this.y = startY;
    },

    move(direction) {
        switch (direction) {
            case 2:
                if ((this.y + 1) >= settings.colCount) {
                    alert('нельзя выйти за нижний край карты');
                    break;
                }
                this.y++;
                break;
            case 4:
                if ((this.x - 1) < 0) {
                    alert('нельзя выйти за левый край карты');
                    break;
                }
                this.x--;
                break;
            case 6:
                if ((this.x + 1) >= settings.rowCount) {
                    alert('нельзя выйти за правый край карты');
                    break;
                }

                this.x++;
                break;
            case 8:
                if ((this.y - 1) < 0) {
                    alert('нельзя выйти за верхний край карты');
                    break;
                }
                this.y--;
        }
    }
};

const game = {
    settings,
    player,

    run() {
        this.player.init(this.settings.startPositionX, this.settings.startPositionY);

        while (true) {
            this.render();

            const direction = this.getDirection();

            if (direction === -1) return alert('До свидания!');

            this.player.move(direction);
        }
    },

    render() {
        let map = '';

        for (let row = 0; row < this.settings.rowCount; row++) {
            for (let col = 0; col < this.settings.colCount; col++) {
                if (this.player.y === row && this.player.x === col) {
                    map += '0 ';
                } else {
                    map += 'X ';
                }
            }
            map += '\n';
        }
        console.clear();
        console.log(map);
    },

    getDirection() {
        const availableDirections = [-1, 2, 4, 6, 8];

        while (true) {
            const direction = parseInt(prompt('Введите число куда хотите переместиться или -1 для выхода.'));

            if (!availableDirections.includes(direction)) {
                alert(`Для перемещения необходимо ввести одно из чисел: ${availableDirections.join(', ')}.`);
                continue;
            }

            return direction;
        }
    }
}

game.run();
