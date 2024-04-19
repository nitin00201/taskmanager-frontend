import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux'
import store from './redux/Store';
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
<Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
)
