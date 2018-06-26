const express = require('express');
const { get } = require('axios');
const bodyParser = require('body-parser');
const session = require('express-session');

const PORT = 4321;
const URL = 'https://kodaktor.ru/j/users';
const app = express();

let items;

const checkAuth = (r, res, next) => {//создаем функцию для проверки аутентификации в сессии
  if(r.session.auth === 'ok') {//проверерка сессии на аутентификацию
    next();// если прошла проверка, то продолжаем работу
  } else {
    res.redirect('/login');// если не прошла провекра, то перенаправляем на страницу ввода
  }
};

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))
  .use(session({ secret: 'mysecret', resave: true, saveUninitialized: true }))//создаем сессию
  .get('/hello/', r => r.res.end('Hello world!'))
  .get('/author/', r => r.res.send('<h4 id="author" title="GossJS">KseniaVeh</h4>'))
  .get('/login', r => r.res.render('login'))// маршрут для рендеринга страницы ввода логина и пароля из шаблона
  .get('/logout', r => {//маршрут длч логаута приложения и перевода сессии в неаутентифицироанное состояние
    r.session.auth = 'neok';// изменение аутентиикатора в сессии
    r.res.redirect('/login');//редиректа на страницу ввода логина
  })
  .get('/users/', checkAuth, async r => r.res.render('list',
    { title: 'Logins', items }))// маршрута для рендеринга списка пользователей, с использованием проверки аутентиикации
  .post('/login/check/', r => {//путь для аутентиикации пользователя и перевода сессии в сотояние удачного прохождение проверки
    const {body: {login: l}} = r;
    const user = items.find(({login}) => login === l);//проверяем есть ли введеный пользователь в списке пользователей
    if(user) {// проверка найден ли пользователь
      if(user.password === r.body.pass) {// если пользователь найден, проверяем пароль
        r.session.auth = 'ok';//меняем состояние сесии на "аутентиицация успешно пройдена"        
        r.res.redirect('/users');//перенаправляем на страницу с пользователями
      } else {
        r.res.send('Wrong pass!');//если пароль не подошел, пишем ошибка пароля
      }
    } else {
      r.res.send('No such user!');// если пользователь не найден, пишем что пользователя нет
    }
  })  
  .use(r => r.res.status(404).end('Still not here, sorry!'))//вывод результата для главной страницы и присваивание статуса 404
  .use((e, r, res, n) => res.status(500).end(`Error: ${e}`))//вывод ошибки при отсутсвии маршрута и установка статуса 500
  .set('view engine', 'pug')
  .listen(process.env.PORT || PORT, async () => {
    console.log(process.pid);
    ({data: {users: items}} = await get(URL));
  });
