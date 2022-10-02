import { useContext, useState, useEffect } from 'react'
import { UserContext } from './context/UserContext'
import { ScreenContext } from './context/ScreenContext'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Header from './components/Header'

function App() {
    // const [count, setCount] = useState(0)

    // Get context
    const { user, loading } = useContext(UserContext)
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

    // Get current page from context and show it
    if (user) {
        // Loaged pages

        return (
            <>
                <Header></Header>
                <div className='container'>
                    <h1 className='text-center'>Users App</h1>
                </div>
            </>

        )
    } else {
        // No loged pages

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
}

export default App
