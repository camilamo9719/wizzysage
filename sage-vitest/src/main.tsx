import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Home from './pages/Home.tsx'
import '../src/components/styles/Home.css'
import '../src/components/styles/JuanJose.css'
import JuanJose from '../src/components/JuanJose.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Home />
    <JuanJose />
  </React.StrictMode>,
)