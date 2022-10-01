import { useContext, useState } from 'react'
import { AppContext } from './context/AppContext'
import Login from "./components/Login"
import SignUp from './components/SignUp'



function App() {
    // const [count, setCount] = useState(0)

    // Get context
    const {user} = useContext(AppContext)

    // show home page ifg user its logged
    if (user) {
        return <SignUp></SignUp>
    }
    return <Login></Login>
}

export default App
