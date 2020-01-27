const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const consolidate = require('consolidate');
app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/styles', express.static(path.resolve(__dirname, 'assets/css'))); // путь к файлу со стилями
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

cookieParser = require('cookie-parser')
app.use(cookieParser('secret key'))

let dataNews = [] // массив для полученных новостей
let url //ссылка на сайт, с которого нужно получить новости
let quantityNews // количество новостей указываемое пользователем

function requestNews(){ //функция получения новостей с сайта
    return new Promise(resolve => {
        request(url, (err, response, body) => {
            if(!err && response.statusCode === 200) {
                dataNews = [] // обнуление массива с новостями
                const $ = cheerio.load(body);
                for(let i = 0;i<quantityNews;i++){ // Цикл добавляет в массив указанное пользователем количество новостей
                    const rate = $('.srfrRow p').eq(i).text();
                    if(rate === ""){ // если блоков с новостями больше нет, цикл прерывается
                        break;
                    }
                    dataNews.push(rate) // наполнение массива новостями
                }
                resolve(dataNews)
            }
        });
    })
}

app.post('/tasks',(req, res) => {
    url = req.body.choice // присваивание переменной 'url' адреса сайта, с которого будут загружаться новости
    quantityNews = req.body.quantity // присваивание переменной 'quantityNews' цифры указанной пользователем, обозначающей количество новостей

    res.cookie('choice', url) // запись в Cookie последнего адреса для запроса новостей
    res.cookie('quantity', quantityNews) // запись в Cookie последнего указанного количества новостей

    async function startReceivingNews() {
        await requestNews() //запуск функции получения новостей
        res.render('newspaper', { //формирование страницы с новостями
            news: dataNews,
        });
    }
    startReceivingNews()
});

app.listen(8000, () => {
    console.log('Server has been started!')
});
