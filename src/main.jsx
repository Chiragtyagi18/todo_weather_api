import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {store} from './redux/store'

ReactOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)