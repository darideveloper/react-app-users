export default function SignUp () {
    return (
        <section className="signup-wrapper">
            <h1 className="text-center">Sign Up</h1>
            <div className="signup">
                <div className="row">
                    <div className="col-12 col-md-6 mt-0 mt-md-5">
                        <form className="mt-0">
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="John Doe" required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" required/>
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="keep" />
                                <label className="form-check-label" htmlFor="keep">keep me logged in</label>
                            </div>
                            <div className="form-text">You do not have an account? Sign up <a href="/signup">here</a>
                            </div>
                            <button type="submit" className="btn btn-outline-primary px-5 mt-3">Submit</button>
                        </form>
                    </div>
                    <div className="col-12 col-md-6">
                        <img className="w-75 mx-auto d-block" src="imgs/login.svg" alt="login illustration" />
                    </div>
                </div>
            </div>
        </section>
    )
}