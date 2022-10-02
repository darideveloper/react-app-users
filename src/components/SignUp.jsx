import { createContext, useState, useEffect } from 'react'
import { countries_names } from '../js/countries'
import Input from './Input'
import Button from './Button'
import DropDown from './Select'
import {get_roles} from '../js/api'

export default function SignUp() {

    // Query rols from database ans save as state
    const [roles, setRoles] = useState([])
    
    useEffect (() => {
        get_roles()
            .then ((roles) => roles.map ((role) => role.name))
            .then ((rol_names) => setRoles(rol_names))
    }, [])

    // States for inputs values
    const [pass1, setPass1] = useState('')
    const [pass2, setPass2] = useState('')

    function handleSubmit (event) {

        // Dont submit form
        event.preventDefault ()

        // Validate passwords
        if (pass1 && pass2) {
            if (pass1 == pass2) {
                alert('ok')
            } else {
                alert('no ok')
            }
        }
    }

    return (
        <section className='signup-wrapper'>
            <h1 className='text-center'>Sign Up</h1>
            <div className='signup'>
                <div className='row d-flex align-items-center'>
                    <div className='col-12 col-md-6 mt-3 mt-md-5'>
                        <form className='mt-0' onSubmit={handleSubmit}>
                            <Input
                                id='first'
                                label='First name'
                                type='text'
                                placeholder='John'
                                minLength={3}
                                required={true}
                            />
                            <Input
                                id='last'
                                label='Last name'
                                type='text'
                                placeholder='Doe'
                                minLength={3}
                                required={true}
                            />
                            <Input
                                id='email'
                                label='Email'
                                type='email'
                                placeholder='johndoe@gmail.com'
                                minLength={6}
                                required={true}
                            />
                            <Input
                                id='phone'
                                label='Phone'
                                type='tel'
                                placeholder='555 555 1234'
                                minLength={10}
                                required={true}
                            />
                            <DropDown
                                id='country'
                                data={countries_names}
                                value='United States'
                                required={true}
                            />
                            <DropDown
                                id='rol'
                                data={roles}
                                value='Standard'
                                required={true}
                            />
                            <Input
                                id='password1'
                                label='Password'
                                type='password'
                                placeholder=''
                                minLength={8}
                                required={true}

                                // Save password 1 state variable
                                onChange={function (event) {setPass1(event.target.value)}}
                            />
                            <Input
                                id='password2'
                                label='Repeat password'
                                type='password'
                                placeholder=''
                                minLength={8}
                                required={true}

                                // Save password 2 state variable
                                onChange={function (event) {setPass2(event.target.value)}}
                            />
                            <Button
                                size={5}
                                outline={true}
                                text='Submit'
                                type="submit"
                            />
                        </form>
                    </div>
                    <div className='col-12 col-md-6'>
                        <img
                            className='w-75 mx-auto d-block'
                            src='imgs/register.svg'
                            alt='register illustration'
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
