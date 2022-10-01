export default function Header () {
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
                            <li className="nav-item">
                                <button className="nav-link border-0 bg-transparent">Home</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link border-0 bg-transparent">Users</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link border-0 bg-transparent">Roles</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link border-0 bg-transparent">Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}