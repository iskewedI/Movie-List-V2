import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import './i18nextConf';
import App from './App';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <HashRouter>
    <Suspense fallback='loading'>
      <App />
    </Suspense>
  </HashRouter>,
  document.getElementById('root')
);
