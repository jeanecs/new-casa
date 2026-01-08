import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // Make sure your Tailwind is imported here!
import AppContextProvider from './context/AppContext.jsx' // 1. Import it here


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContextProvider> {/* 2. Wrap your App with the provider */}
      <App />
    </AppContextProvider>
  </React.StrictMode>,
)