import {countries_names} from '../js/countries'

export default function SignUp (props) {
    console.log (props.roles)
    
    return (
        <section className="signup-wrapper">
            <h1 className="text-center">Sign Up</h1>
            <div className="signup">
                <div className="row d-flex align-items-center">
                    <div className="col-12 col-md-6 mt-3 mt-md-5">
                        <form className="mt-0">
                        <div className="mb-3">
                                <label htmlFor="first" className="form-label">First name</label>
                                <input type="text" className="form-control" id="first" placeholder="John" required minLength="3"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="last" className="form-label">Last name</label>
                                <input type="text" className="form-control" id="last" placeholder="Doe" required minLength="3"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="johndoe@gmail.com" required minLength="6"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input type="tel" className="form-control" id="phone" placeholder="555 555 1234" required minLength="10"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="country" className="form-label">Country</label>
                                <select className="form-select" id="country" aria-label="country select" default="United States" required>
                                    {/* Render countries options */}
                                    { countries_names.map ((country) => <option value={country} key={country} >{country}</option>)}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="role" className="form-label">Role</label>
                                <select className="form-select" id="role" aria-label="role select" default="Standard" required>
                                    {/* Render countries options */}
                                    { props.roles.map ((role) => <option value={role} key={role}>{role}</option>)}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password1" required minLength="8"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password2" className="form-label">Repeat password</label>
                                <input type="password" className="form-control" id="password2" required minLength="8"/>
                            </div>
                            <button type="submit" className="btn btn-primary px-5 mt-3">Submit</button>
                        </form>
                    </div>
                    <div className="col-12 col-md-6">
                        <img className="w-75 mx-auto d-block" src="imgs/register.svg" alt="register illustration" />
                    </div>
                </div>
            </div>
        </section>
    )
}