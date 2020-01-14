const readLine = require('readline');
const fs = require('fs');
const coin = [["1", "Орел"], ["2", "Решка"]];


function start() {
    console.log('Введите: 1 (Орел), 2 (Решка) или q (выход)');
}
start();

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('line', (line) => {
    let computerChoice = Math.floor(Math.random() * 2);

    if (line === 'q') {
        rl.close();
    } 
    else if (line === '1' || line === '2') {
        let statistics;
        if (line === coin[computerChoice][0]) {
            console.log('Вы угадали!');
            statistics = 'Win,'
        } 
        else {
            console.log('Вы не угадали');
            statistics = 'Loss,'
        }
        fs.appendFile('log.txt', statistics, function (err) {
            if (err) {
                throw err;
            }
        });
    }
    else {
        console.log('Вы ввели неподходящие данные,', 'введите: 1 (Орел), 2 (Решка) или q (выход)')
    }
  });