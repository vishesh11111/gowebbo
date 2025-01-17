import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Container from './ui/container/Container';
import ErrorBoundary from './components/error/ErrorBonderies';
import { Provider } from 'react-redux';
import { store } from './components/redux/store/store';
import { BrowserRouter } from 'react-router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Provider store={store}>
        <ErrorBoundary>
          <Container>
            <App />
          </Container>
        </ErrorBoundary>
      </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
