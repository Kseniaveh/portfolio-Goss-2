const express = require('express'); 
const { get } = require('axios');
const URL = 'https://kodaktor.ru/j/users';

const PORT = 4321;
const app = express();// иниициализируем app 
app
   .get(/hello/, r => r.res.end('Hello, world!')) //создаем маршрут hello для get запроса.
   .get(/users/, async r => { //создаем маршрут и ассинхроную функцию users для get запроса.
      const { data: { users: items } } = await get(URL);//выполняем get запрос к URL и складываем результат в items
      r.res.render('list', {title: 'Login list', items});//выводим результат работы на страницу.
   })
   .use(r => r.res.status(404).end('Still not here, sorry!'))//вывод результата для главной страницы и присваивание статуса 404
   .use((e, r, res, n) => res.status(500).end('Error: ${e}'))//вывод ошибки при отсутсвии маршрута и установка статуса 500
   .set('view engine', 'pug')
.listen(process.env.PORT || PORT, () => console.log(process.pid));