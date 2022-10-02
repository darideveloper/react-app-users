import { ScreenContext } from '../context/ScreenContext'
import { useContext } from 'react'
import Input from './Input'
import Button from './Button'

export default function Login ({ onClickLink }) {
    // const {setScreen} = useContext(ScreenContext)

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
                            <Input id="email" label="Email" type="email" placeholder="johndoe@gmail.com" minLength={6} required={true}/>
                            <Input id="password" label="Password" type="password" placeholder="" minLength={8} required={true}/>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="keep" />
                                <label className="form-check-label" htmlFor="keep">keep me logged in</label>
                            </div>
                            <div className="form-text">You do not have an account? Sign up
                                <button type="button" className="link-primary border-0 bg-transparent" onClick={onClickLink}>here</button>
                            </div>

                            <Button size={5} outline={true} text="Submit" type="submit" />
                            
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}