const { get } = require('axios');
const express = require('express');
const bodyParser = require('body-parser')
const User = require('./bd')

const PORT = 4321;
const app = express();

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended:true}))
  .use('/users', require('./routes/users')(express))
  .get('/aprilusers', async r => {
    const  items = await User.find();
    r.res.render('list', { title: 'Список логинов из БД', items });
  })
  .get('/aprilusers/:login', async r => {
   const  item = await User.findOne({"login": r.params.login});
    r.res.send('<h3>Your pass is </h3>' + item.password);
  })
  .get('/', r => r.res.send('HOME'))
  .set('view engine', 'pug')
  .listen(PORT, () => console.log('My pid is: ' + process.pid))
