import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import App from './components/app';
import MainPage from './components/main_page';
import Contacts from './components/contacts';



export default(
  <Route path="/" component={App}>
    <IndexRoute component={MainPage} />
    <Route path="/contacts" component={Contacts} />
  </Route>
);
