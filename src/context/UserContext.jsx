import { createContext, useState, useEffect } from 'react'
import { setCookie, getCookie, eraseCookie } from '../js/cookies'

// Create general context for the User
export const UserContext = createContext()

// Context provider
export function UserContextProvider(props) {

    // state for manage user name
    const [user, setUser] = useState(null)

    // get user from cookies and save as state, when load
    useEffect(() => setUser(getCookie('user')), [])

    // Retur4n context for encapsulate childs
    return (
        <UserContext.Provider
            // Set as value an object with the context data
            value={{
                user,
                setUser,
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}
