import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {
  compose,
  applyMiddleware,
  legacy_createStore as createStore
} from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers';
import thunk from 'redux-thunk';
import './index.css';
import { wsMiddleware } from './services/middleware/wsMiddleware';
import { wsActions, wsAuthActions } from './services/actions/wsActions';
import { WS_URL } from './utils/constants';
import reportWebVitals from './reportWebVitals';
import App from './components/App/App';

const composeEnhancers =
  // @ts-ignore
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    // @ts-ignore
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    wsMiddleware(`${WS_URL}/all`, wsActions),
    wsMiddleware(WS_URL, wsAuthActions, true)
  )
);
export const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(document.querySelector('#root')!);
root.render(
  <BrowserRouter basename="/react-burger">
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);

// @ts-ignore
if (window.Cypress) { window.store = store; };

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
