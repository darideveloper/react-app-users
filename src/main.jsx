import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './css/custom.css'
import { AppContextProvider } from './context/AppContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <div className='container'>
            {/* Encapsulate app in context */}
            <AppContextProvider>
                <App />
            </AppContextProvider>
        </div>
    </React.StrictMode>
)
