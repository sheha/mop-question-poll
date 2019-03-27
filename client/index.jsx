/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import jwtDecode from 'jwt-decode'

// locals
import {setCurrentUser} from './actions/user';
import rootReducer from './reducers/root';
import App from './components/App';
//inject bootstrap
import "bootstrap/dist/css/bootstrap.css";

//create redux store
const store = createStore(rootReducer, applyMiddleware(thunk))

//user auth , try to identify
const token = localStorage.getItem('token')
if (token && token !== 'undefined' && token !== '') {
  store.dispatch(setCurrentUser(jwtDecode(token)))
}

export default function () {
    ReactDOM.render(
        <Provider store={store}>
        <Router>
            <App />,
            </Router>
        </Provider>,

        document.getElementById('root'),
    );

}


module.hot.accept();
