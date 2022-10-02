import { useContext, useState, useEffect } from 'react'
import { UserContext } from './context/UserContext'
import { ScreenContext } from './context/ScreenContext'
import { eraseCookie } from './js/cookies'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Header from './components/Header'

function App() {
    // const [count, setCount] = useState(0)

    // Get context
    const { user, setUser, loading } = useContext(UserContext)
    const { screen, setScreen } = useContext(ScreenContext)

    // Return loading spinner
    if (loading) {
        return (
            <>
                <div className='vw-100 vh-100 position-absolute top-0 left-0 d-flex align-items-center justify-content-center'>
                    <div className="spinner spinner-grow text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </>
        )
    }

    // return no logged screens
    if (! user) {
        if (['home', 'login'].includes(screen)) {
            return (
                <>
                    <Header></Header>
                    <div className='container'>
                        <Login
                            onClickLink={function () {
                                setScreen('signup')
                            }}
                        ></Login>
                    </div>
                </>
            )
        } else if (screen == 'signup') {
            return (
                <>
                    <Header></Header>
                    <div className='container'>
                        <SignUp></SignUp>
                    </div>
                </>
            )
        }
    }

    // Logout when user change screen to "logout"
    if (screen == "logout") {
        // Delete user in cookies
        eraseCookie ("user")

        // Delete user in context
        setUser (null)

        // Update current screen
        setScreen ("login")
    }
    
    // return home page as default
    return (
        <>
            <Header></Header>
            <div className='container'>
                <h1 className='text-center'>Users App</h1>
            </div>
        </>

    )
}

export default App
