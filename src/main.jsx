import React from 'react'
import App from './App'
import ReactDOM from 'react-dom/client'
import { UserContextProvider } from './context/UserContext'
import { ScreenContextProvider } from './context/ScreenContext'
import {get_roles} from './js/api'

const roles = get_roles()
console.log (roles)

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
