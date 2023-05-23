import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {LocalStorage} from "./services/localStorage.ts";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App storage={LocalStorage()} />
  </React.StrictMode>,
)
