import HeaderButton from "./HeaderButton"
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { get_pages, get_roles_pages, get_user } from '../js/api'
import { useState, useEffect } from "react"

export default function Header () {

    // Default user pages
    const default_pages = ["login", "signup"]

    // Get user form context
    const { user } = useContext (UserContext)

    // states
    const [user_pages, setUserPages] = useState(default_pages)
    const [user_data, setUserData] = useState(null)
    const [pages, setPages] = useState(null)
    const [roles_pages, setRolesPages] = useState(null)

    // Get apì data
    useEffect (() => {
        if (! user_data) {
            get_user (user).then((user_data) => {
                if (user_data) {
                    // Save user data
                    setUserData(user_data) 
                } else {
                    // Set default pages (for not logged user)
                    setUserPages (default_pages)
                }
            })
        }    
    }, [user_data, user])
    
    useEffect (() => {
        if (! pages) {
            get_pages ().then((pages) => setPages(pages) )
        }    
    }, [pages])
    
    useEffect (() => {
        if (! roles_pages) {
            get_roles_pages ().then((roles_pages) => setRolesPages(roles_pages) )
        }    
    }, [roles_pages])

    // Update manu
    useEffect (() => {
        console.log ({
            user_data,
            pages,
            roles_pages,
            user_pages
        })
        if (user_data && pages && roles_pages && user_pages[0] == default_pages[0]) {
            console.log ("login pages")

            // Get the pages ids
            const pages_ids = roles_pages.filter ((role_page) => role_page.role_id == user_data.rol_id)
                .map ((role_page) => role_page.page_id)

            // Get pages names
            let user_pages = pages_ids.map (page_id => {
                return pages.filter ((page_data) => page_data.id === page_id).map ((page_data) => page_data.name)[0]
            })

            setUserPages ([...user_pages, "logout"])
        }

    }, [user_data, pages, roles_pages])

    useEffect (() => {
        // Logout when user change screen to "logout"
        if (screen == "logout") {
            // Delete user in cookies
            eraseCookie ("user")
    
            // Delete user in context
            setUser (null)
    
            // Update current screen
            setScreen ("login")
        }
    }, [screen])


    return (
        <header className="mb-4">
            <nav className="navbar navbar-expand-lg container">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Users Web App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">

                            {/* Generate menu buttons */}
                            { user_pages.map (menu_item => <HeaderButton value={menu_item} key={menu_item}/>) }
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}