import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import App from './App.js'
import rootReducer from './reducers/index.js'
import * as serviceWorker from './serviceWorker'
import 'bootstrap/dist/css/bootstrap.min.css'

// Create redux store, the two window options connect to the redux chrome extension and the last is for asynchronous dispatch
const composeEnhancers = composeWithDevTools({})
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

// Render App, Provider connects the store to the App
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
