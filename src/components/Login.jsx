import { useContext, useState } from 'react'
import { ScreenContext } from '../context/ScreenContext'
import { UserContext } from '../context/UserContext'
import { get_user_password } from '../js/api'
import { decrypt } from '../js/crypt'
import { setCookie } from '../js/cookies'
import Input from './Input'
import Button from './Button'

export default function Login({ onClickLink }) {

    // Contexts
    const {setScreen} = useContext(ScreenContext)
    const {setUser} = useContext(UserContext)

    // States
    const [email, setEmail] = useState('')
    const [password, setPassoword] = useState('')

    function handleSubmit (event) {
        // Dont submit form, get inputs and query password in database

        // Dont submit form
        event.preventDefault ()

        // Get user and passwors from database
        get_user_password (email)
            .then ((password_obj) => {
                if (password_obj) {
                    checkPassword (password_obj[0].password)
                } else {
                    invalidPassword ()
                }
            })
    }

    function checkPassword (password_encrypted) {
        // Decript database password and validate with the password in form
        const password_db = decrypt(password_encrypted)
        if (password_db == password) {
            // Valid password

            // Update user in cookies
            setCookie ("user", email, 20)

            // Update user in context
            setUser (email)

            // Update current screen
            setScreen ("home")


        } else {
            // Invalid password
            invalidPassword ()
        }
    }

    function invalidPassword() {
        // Show error when password its invalides
        console.log ("invalid")
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
                            <div className='mb-3 form-check'>
                                <input
                                    type='checkbox'
                                    className='form-check-input'
                                    id='keep'
                                />
                                <label
                                    className='form-check-label'
                                    htmlFor='keep'
                                >
                                    keep me logged in
                                </label>
                            </div>
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
