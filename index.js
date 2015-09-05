import 'babel-core/polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import Search from './containers/Search';
import configureStore from './store/configureStore';

const store = configureStore();

React.render(
  <Provider store={store}>
    {() => <Search />}
  </Provider>,
  document.getElementById('root')
);
