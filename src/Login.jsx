export default function Login () {
    return (
        <section className="login-wrapper">
            <h1 className="text-center">Login</h1>
            <div className="login">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <img className="w-75 mx-auto d-block" src="imgs/login.svg" alt="login illustration" />
                    </div>
                    <div className="col-12 col-md-6 mt-0 mt-md-5">
                        <form className="mt-0">
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" placeholder="John Doe" required/>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="password" required/>
                            </div>
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="keep" />
                                <label class="form-check-label" for="keep">keep me logged in</label>
                            </div>
                            <div class="form-text">You do not have an account? Sign up <a href="/signup">here</a>
                            </div>
                            <button type="submit" class="btn btn-outline-primary px-5 mt-3">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}