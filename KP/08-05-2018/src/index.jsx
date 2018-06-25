import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Counter from './Counter';
import Map from './Map';
import Gallery from './Gallery';
import Reviews from './Reviews';
import Datapickerz from './Datapickerz';
import React, { Component as C } from 'react';
import { render as r } from 'react-dom';
import moment from 'moment';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';

const Content = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Map} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/reviews" component={Reviews} />
      <Route path="/datapickerz" component={Datapickerz} />
    </Switch>
  </main>
);

const Menu = () => (
  <header>
    <ul>
      <li><Link to="/">Карта</Link></li>
      <li><Link to="/gallery">Галерея</Link></li>
      <li><Link to="/reviews">Отзывы</Link></li>
      <li><Link to="/datapickerz">DataPicker</Link></li>
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