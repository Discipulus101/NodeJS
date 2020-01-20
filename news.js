const request = require('request');
const cheerio = require('cheerio');
request('https://yandex.ru/', (err, response, body) => {
    if(!err && response.statusCode === 200) {
        const $ = cheerio.load(body);
        for(let i = 0;;i++){ // Цикл выводит все новости с главной страницы "Яндекс"
            const rate = $('.news__item-content').eq(i).text();
            if(rate === ""){ // если блоков с новостями больше нет, цикл прерывается
                break;
            }
            console.log('Новость №'+ (i+1) + ':', rate + '.');
        }
    }
});
