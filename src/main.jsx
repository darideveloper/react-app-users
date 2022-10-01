import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { UserContextProvider } from './context/UserContext'
import { ScreenContextProvider } from './context/ScreenContext'

// Import bootstrap
import './css/custom.css'
import 'bootstrap/dist/js/bootstrap.min.js'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* Encapsulate app in contexts */}
        <UserContextProvider>
        <ScreenContextProvider>
            <App />
        </ScreenContextProvider>
        </UserContextProvider>
    </React.StrictMode>
)
