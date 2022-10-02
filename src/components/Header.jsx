import HeaderButton from "./HeaderButton"
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

export default function Header () {

    const { user } = useContext (UserContext)
    let menu

    if (user) {
        // Menu buttons based in rol
        menu = ["home", "users", "roles", "logout"]
    } else {
        // menu for not login users
        menu = ["login", "signup"]
    }

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
                            { menu.map (menu_item => <HeaderButton value={menu_item} key={menu_item}/>) }
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}