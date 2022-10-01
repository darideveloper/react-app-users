import { createContext, useState, useEffect } from 'react'

// Create general context for the app
export const ScreenContext = createContext()

// Context provider
export function ScreenContextProvider(props) {

    // State for manage the screens
    const [screen, setScreen] = useState("home")

    // Retur4n context for encapsulate childs
    return (
        <ScreenContext.Provider
            // Set as value an object with the context data
            value={{
                screen,
                setScreen
            }}
        >
            {props.children}
        </ScreenContext.Provider>
    )
}
