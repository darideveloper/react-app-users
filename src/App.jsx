import { useState } from 'react'
import { setCookie, getCookie, eraseCookie } from './js/cookies'
import Login from "./Login"


// Get user name from cookies for validate logjn
const user = getCookie('user')

function App() {
    const [count, setCount] = useState(0)

    // show home page ifg user its logged
    if (user) {
        return <h1>User logged</h1>
    }
    return <Login></Login>
}

export default App
