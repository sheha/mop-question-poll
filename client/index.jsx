/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import "bootstrap/dist/css/bootstrap.css";

import App from './components/App';
import store from './store';

//import AppLayout from './components/AppLayout';

export default function () {
    ReactDOM.render(
        <Provider store={store}>
            <App />,
        </Provider>,

        document.getElementById('root'),
    );

}


module.hot.accept();
