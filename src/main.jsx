import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/main.css'
import { ApiProvider } from './contexts/ApiContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApiProvider>
    <App />
  </ApiProvider>
);