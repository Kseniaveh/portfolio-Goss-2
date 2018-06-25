import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Map from './Map';
import About from './About';
import Gallery from './Gallery';
import Reviews from './Reviews';
import ToDoListReport from './ToDoListReport';
import Reset from './Reset';
import Datapickerz from './Datapickerz';
import React, { Component as C } from 'react';
import { render as r } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const Content = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Map} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/reviews" component={Reviews} />
      <Route path="/todolist" component={ToDoListReport} />
      <Route path="/reset" component={Reset} />
      <Route path="/datapickerz" component={Datapickerz} />
      <Route path="/about" component={About} />
    </Switch>
  </main>
);

const Menu = () => (
  <header>
    <ul>
      <li><Link to="/">Карта</Link></li>
      <li><Link to="/gallery">Галерея</Link></li>
      <li><Link to="/reviews">Отзывы</Link></li>
      <li><Link to="/todolist">ToDoList</Link></li>
      <li><Link to="/reset">ResetToDo</Link></li>
      <li><Link to="/datapickerz">DataPicker</Link></li>
      <li><Link to="/about">Обо мне</Link></li>
    </ul>
  </header>
);

const App = () => (
  <div><Menu /><Content />
  </div>);

r(
  <BrowserRouter><MuiThemeProvider><App /></MuiThemeProvider></BrowserRouter>,
  document.querySelector('.cont'),
);