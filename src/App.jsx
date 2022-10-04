import { useContext, useState, useEffect } from 'react'
import { UserContext } from './context/UserContext'
import { ScreenContext } from './context/ScreenContext'
import { eraseCookie } from './js/cookies'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Header from './components/Header'
import Roles from './components/Roles'
import Loading from './components/Loading'
import Users from './components/Users'

function App() {
    // const [count, setCount] = useState(0)

    // Get context
    const { user, setUser, loading } = useContext(UserContext)
    const { screen, setScreen } = useContext(ScreenContext)

    // Return loading spinner
    if (loading) {
        return (
            <>
                <Loading />
            </>
        )
    }

    // return no logged screens
    if (! user) {
        if (['home', 'login'].includes(screen)) {
            return (
                <>
                    <Header />
                    <div className='container'>
                        <Login
                            onClickLink={function () {
                                setScreen('signup')
                            }}
                        />
                    </div>
                </>
            )
        } else if (screen == 'signup') {
            return (
                <>
                    <Header />
                    <div className='container'>
                        <SignUp />
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

    // CRUDS screens
    if (screen == "roles") {
        return (
            <>
                <Header />
                <div className='container'>
                    <Roles />
                </div>
            </>
        )

    }

    // CRUDS screens
    if (screen == "users") {
        return (
            <>
                <Header />
                <div className='container'>
                    <Users />
                </div>
            </>
        )

    }
    
    // return home page as default
    return (
        <>
            <Header />
            <div className='container'>
                <h1 className='text-center'>Users App</h1>
            </div>
        </>

    )
}

export default App
