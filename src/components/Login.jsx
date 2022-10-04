import { useContext, useState, useEffect } from 'react'
import { ScreenContext } from '../context/ScreenContext'
import { UserContext } from '../context/UserContext'
import { get_user_password } from '../js/api'
import { decrypt } from '../js/crypt'
import { setCookie } from '../js/cookies'
import Input from './Input'
import Button from './Button'
import Loading from './Loading'

export default function Login({ onClickLink }) {

    // Contexts
    const {setScreen} = useContext(ScreenContext)
    const {setUser} = useContext(UserContext)

    // States
    const [email, setEmail] = useState('')
    const [password, setPassoword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    // Update screen with loading status
    useEffect (() => {}, [loading])

    function handleSubmit (event) {
        // Show loading page
        setLoading (true)

        // Dont submit form
        event.preventDefault ()

        // Get user and password from database
        get_user_password (email)
            .then ((users_pass) => {
                // Show error by defaul
                setError ("Wrong user or password. Try again.")

                if (users_pass.length > 0) {
                    
                    // Decript password from database
                    console.log (users_pass)
                    const password_db = decrypt(users_pass[0].password)
    
    
                    // Validate password
                    if (password_db == password) {
                        // Restart error message
                        setError ("")
    
                        // Update user in cookies
                        setCookie ("user", email, 20)
    
                        // Update user in context
                        setUser (email)
    
                        // Update current screen
                        setScreen ("home")
                    }
                }

                // Disable loading
                setLoading (false)
            })
    }

    // Return loading screen
    if (loading) {
        return (
            <div className="d-flex w-100 mt-5 align-items-center justify-content-center">
                <Loading />
            </div>
        )
    }

    return (
        <section className='login-wrapper'>
            <h1 className='text-center'>Login</h1>
            <div className='login'>
                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <img
                            className='w-75 mx-auto d-block'
                            src='imgs/login.svg'
                            alt='login illustration'
                        />
                    </div>
                    <div className='col-12 col-md-6 mt-0 mt-md-5'>
                        <form className='mt-0' onSubmit={function (event) {handleSubmit(event)}}>
                            <Input
                                id='email'
                                label='Email'
                                type='email'
                                placeholder='johndoe@gmail.com'
                                minLength={6}
                                required={true}

                                // Save email as state
                                onChange={function (event) {setEmail(event.target.value)}}
                            />
                            <Input
                                id='password'
                                label='Password'
                                type='password'
                                placeholder=''
                                minLength={8}
                                required={true}

                                // Save password as state
                                onChange={function (event) {setPassoword(event.target.value)}}
                            />
                            <div id="error" className="form-text text-danger mt-0 mb-3">{error}</div>
                            <div className='form-text'>
                                You do not have an account? Sign up
                                <button
                                    type='button'
                                    className='link-primary border-0 bg-transparent'
                                    onClick={onClickLink}
                                >
                                    here
                                </button>
                            </div>

                            <Button
                                size={5}
                                outline={true}
                                text='Submit'
                                type='submit'
                            />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
