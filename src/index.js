/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";
import {applyMiddleware, createStore} from "redux";
import logger from "redux-logger";
import bookState from "./reducers";
import AdminLayout from "./layouts/Admin.jsx";
import saga from 'redux-saga';
import sagaRoot from './sagas';
import {Provider} from "react-redux";
import PrivateRoute from "./PrivateRoute";
import CognitoCallback from "./components/CognitoCallback/CognitoCallback";
import {ENVIRONMENT} from "./constants/constants";


// The middlewares which will be used in this App
const middlewares = [];
// Initialize the reducers

// Initialize the saga middleware
const sagaMiddleware = saga();

middlewares.push(sagaMiddleware);
if (ENVIRONMENT === 'development') {
    middlewares.push(logger);
}

export const store = createStore(
    bookState,
    applyMiddleware(...middlewares)
);
sagaMiddleware.run(sagaRoot);

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
        <Switch>
            {/*<Route path="/auth" render={props => <AuthLayout {...props} />} />*/}
            <Route path="/callback" render={props => <CognitoCallback {...props} />} />

            <PrivateRoute path="/" name="Home" component={AdminLayout} />
             {/*<Redirect from="/" to="/admin/index" />*/}
            {/*<Route path="/" render={props => <AdminLayout {...props} />}/>*/}
        </Switch>
      </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
