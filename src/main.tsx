import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {TeamStorage} from "./services/teamStorage.ts";
import {TrackStorage} from "./services/trackStorage.ts";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App
        teamStorage={TeamStorage()}
        trackStorage={TrackStorage}
    />
  </React.StrictMode>,
)
