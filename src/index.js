import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './components/App';

ReactDOM.render(
    <BrowserRouter>
        <Route path="/" component={ App }/>
    </BrowserRouter>, document.querySelector('#root')
    );
    
    // <App /> ,document.querySelector('#root')
