import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import routes from './router/routes'
import {HashRouter, Route, Switch, Redirect} from "react-router-dom";
import App from "./App";
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './store'
import thunk from "redux-thunk";
import logger from 'redux-logger'

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    applyMiddleware(logger)
  )
)

store.subscribe(() => {});

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
    <App>
      <Switch>
        {
          routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              render={(props) => {
                if (route.children) {
                  return (
                    <div>
                      <route.component props={props}></route.component>
                      <Switch>
                        {
                          route.children.map((child, i) => (
                            <Route
                              key={i}
                              path={child.path}
                              exact={child.exact}
                              component={child.component}
                            />
                          ))
                        }
                        <Redirect to={route.children[0].path}></Redirect>
                      </Switch>
                    </div>
                  )
                } else {
                  return (
                    <route.component props={props}></route.component>
                  )
                }
              }}
            />
          ))}
        <Redirect from='/' to='/Index'></Redirect>
      </Switch>
    </App>
  </HashRouter>
  </Provider>,
  document.getElementById('root')
);

// 代码从这里开始
if (module.hot) {
  module.hot.accept(() => {
    // 一行代码都没有...
  });
}
// 代码从这里结束
