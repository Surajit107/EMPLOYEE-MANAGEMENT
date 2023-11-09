import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/common/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './pages/common/Signup';
import ErrorPage from './util/ErrorPage';
import { Store } from './services/store/Store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
    <Router>
      <Routes>
        <Route path='*' element={<App />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/access-error' element={<ErrorPage />} />
      </Routes>
      <ToastContainer style={{ "fontSize": "15px" }} transition={Bounce} position="top-right" />
    </Router>
  </Provider>
);
reportWebVitals();
