import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import { BrowserRouter } from 'react-router-dom'
import { AuthStore } from './contexts/AuthStore';


ReactDOM.render(
<BrowserRouter basename={process.env.REACT_APP_API_URL}>
    <AuthStore>
        <App />
    </AuthStore>
</BrowserRouter>, 
document.getElementById('root'));

