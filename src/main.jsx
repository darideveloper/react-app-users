import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './css/custom.css'
import { UserContextProvider } from './context/UserContext'
import { ScreenContextProvider } from './context/ScreenContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <div className='container'>
            {/* Encapsulate app in contexts */}
            <UserContextProvider>
            <ScreenContextProvider>
                <App />
            </ScreenContextProvider>
            </UserContextProvider>
        </div>
    </React.StrictMode>
)
