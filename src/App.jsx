import { useContext, useState, useEffect } from 'react'
import { UserContext } from './context/UserContext'
import { ScreenContext } from './context/ScreenContext'
import Login from './Login'
import Roles from './Roles'
import Users from './Users'
import Loading from './components/Loading'
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
                <Loading />
            </>
        )
    }

    // Update shen screen or user change
    // useEffect (() => {}, [user])

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
        }
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
                <h1 className='text-center'>Users App Home Page</h1>
            </div>
        </>

    )
}

export default App
