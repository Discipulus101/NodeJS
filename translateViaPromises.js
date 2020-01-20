// Программа переводчик с английского на русский, реализованная с помощью Promise
const readLine = require('readline');
const request = require('request');
let yourEnteredWords // вводимые данные для перевода

let API = 'https://translate.yandex.net/api/v1.5/tr.json/translate?'
         + 'key=trnsl.1.1.20200118T144816Z.fd678498515ccebd.9141dc9aab9374e2f414d45a489d81d72fd77e00&'
         + 'lang=en-ru&text='

const promise = new Promise((resolve, reject) => {
    console.log('Здравствуйте! Это программа переводчик с английского на русский. Введите данные и нажмите "Enter". Для выхода введите "q" (выход).');
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.on('line', (line) => {
        if (line === 'q') { // Условие для завершения программы
            rl.close();
        } 
        else {
            yourEnteredWords = line //Присваиваем переменной введённые данные для перевода
            resolve(yourEnteredWords)
        }
    })
});
promise.then(() => {
    request(API + yourEnteredWords, function (error, response, body) { // запрос к серверу на перевод данных
        if (!error && response.statusCode == 200) {
            let translatedData = JSON.parse(body)
            console.log('Вы ввели: '+ yourEnteredWords)
            console.log('Перевод: ' + translatedData.text[0])
        }
    });   
},(error) => {
    console.log(error)
});
  