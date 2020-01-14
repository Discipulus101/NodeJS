const fs = require('fs');

fs.readFile('log.txt', 'utf8', function (err, data) {
    if (err) {
        console.log('Вы еще не играли, статискика отсутствует.');
        return;
    }
    let arrData = data.split(',');
    console.log(arrData);
    let parties = arrData.length - 1;

    let win = 0, loss = 0, winsInRow = 0, lossInRow = 0, x = 0, y = 0;

    for (let i in arrData) {
        if (arrData[i] === 'Win') {
            win++;
            x++;
        } else {
            if (x >= winsInRow) {
                winsInRow = x;
                x = 0;
            }
        }
    }
    for (let i in arrData) {
        if (arrData[i] === 'Loss') {
            loss++;
            y++;
        } else {
            if (y >= lossInRow) {
                lossInRow = y;
                y = 0;
            }
        }
    }

    console.log('Сыграно партий: ' + parties);
    console.log('Выигранных партий: ' + win);
    console.log('Проигранных партий: ' + loss);
    console.log('Соотношение партий (победы/поражения): ' + win + ':' + loss);
    console.log("Максимальне число побед подряд: " + winsInRow);
    console.log("Максимальне число проигрышей подряд: " + lossInRow);
});
