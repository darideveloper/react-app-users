import { useContext, useState, useEffect} from 'react'
import { UserContext } from './context/UserContext'
import { ScreenContext } from './context/ScreenContext'
import Login from "./components/Login"
import SignUp from './components/SignUp'

function App() {
    // const [count, setCount] = useState(0)

    // Get context
    const {user} = useContext(UserContext)
    const {screen, setScreen} = useContext(ScreenContext)

    // Get current page from context and show it
    if (user) {
        <h1>Home page</h1>
    } else {
        if (["home", "login"].includes(screen)) {
            return <Login onClickLink={function () {setScreen("signup")}}></Login>
        } else if (screen == "signup") {
            return <SignUp></SignUp>
        }
    }
}

export default App
