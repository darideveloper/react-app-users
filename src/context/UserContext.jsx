import { createContext, useState, useEffect } from 'react'
import { setCookie, getCookie, eraseCookie } from '../js/cookies'

// Create general context for the User
export const UserContext = createContext()

// Context provider
export function UserContextProvider(props) {

    // states for manage user name
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // get user from cookies and save as state, when load
        setUser(getCookie('user'))

        // update loading state
        setLoading(false)
    }, [])

    // Retur4n context for encapsulate childs
    return (
        <UserContext.Provider
            // Set as value an object with the context data
            value={{
                user,
                setUser,
                loading,
                setLoading
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}
