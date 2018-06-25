const express = require('express');
const bodyParser = require('body-parser');
const { get } = require('axios');
const fetch = require('node-fetch');
const URL = 'https://kodaktor.ru/j/db.json';//создаем переменную для урл с исходными данными
const taskURL = 'http://localhost:3000/task';//создаем переменную для урл с изменяемыми данными
const PORT = 4321;
const app = express();
app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    .use(function (req, res, next) {
        res.header('Content-Type', 'application/json');//делаем возвращаемый тип сервиса джейсон
        res.header("Access-Control-Allow-Origin", "*"),//для кросс-доменных запросов (были проблемы постами от клиента)
        next();
    })
   .get(/getlist/, async r => {//маршрут для получения списка таском
        const todo = await fetch(taskURL).then(response => response.json()).then(ret=>{return ret;});//делаем гет запрос и складываем список тасков в переменную
        r.res.end(JSON.stringify(todo));//выводим список таском, как результат работы сервиса 
    })
    .get(/reset/, async r => {//сброс данных к изначальному состоянию
        let todo = await fetch(URL).then(response => response.json()).then(ret=>{return ret;});//забираем список тасков с кодактера
        todo.author.name='Ksenia Vehova';//меняем имя автора
        const updater = await fetch('http://localhost:3000/task',{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",                
                "Cache-Control": "no-cache"
              },
            body: JSON.stringify(todo)// складываем в тело запрос json с тасками из кодактора
        })//создаем put  запрос для обновления таском на json-server, резульатом запрос будет список новых тасков
        .then(response => response.json())
        .then(data => {return data;}); 
        r.res.end(JSON.stringify(updater)); // выводим обновленный список тасков
    })
   .get(/update/, async r =>{
        const todo = await fetch('http://localhost:3000/task',{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
              },
            body: r.query.body//складываем в тело запрос json с тасками от пользователя
        })//создаем put  запрос для обновления таском на json-server, резульатом запрос будет список новых тасков
        .then(response => response.json())
        .then(data => {return data;}); 
        r.res.end(JSON.stringify(todo)); // выводим обновленный список тасков
        
    })
   .use(r => r.res.status(404).end('Still not here, sorry!'))
   .use((e, r, res, n) => res.status(500).end('Error: ${e}'))
   .set('view engine', 'pug')
   .listen(process.env.PORT || PORT, async () => {
    console.log(process.pid);
    ({data: {users: items}} = await get(URL));
  });