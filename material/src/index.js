import React from 'react';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import createHistory from 'history/createHashHistory';
import createSagaMiddleware from 'redux-saga';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import reducers from './reducers/';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import Page404 from 'routes/404/components/404'
import SagaRoot from './sagas';

const history = createHistory();
const sagaMW = createSagaMiddleware();
const routerMW = routerMiddleware(history);

// localStorage.setItem('league_id', "ESL");

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(applyMiddleware(routerMW, sagaMW))
);

sagaMW.run(SagaRoot);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={App} />
        <Route component={Page404} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
