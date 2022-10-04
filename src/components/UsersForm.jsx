import { useState, useEffect } from 'react'
import { countries_names } from '../js/countries'
import Input from './Input'
import Button from './Button'
import Select from './Select'
import {get_roles} from '../js/api'

export default function UsersForm({onSubmit}) {

    // Query rols from database ans save as state
    const [roles, setRoles] = useState([])
    
    // Get roles from api
    useEffect (() => {
        get_roles()
            .then ((roles) => roles.map ((role) => role.name))
            .then ((rol_names) => setRoles(rol_names))
    }, [])

    // States for inputs values
    const [pass_error, setPassError] = useState('')

    function handlePassword () {
        
        // Get passwords
        const pass1_elem = document.querySelector ("#password1")
        const pass2_elem = document.querySelector ("#password2")
        const pass1 = pass1_elem.value
        const pass2 = pass2_elem.value

        // Validate passwords
        if (pass1 && pass2) {
            if (pass1 == pass2) {
                setPassError ("")

                // Activate submit button
                const submit = document.querySelector ('button[type="submit"]')
                submit.disabled = false
            } else {
                setPassError ("The passwords don't match")

                // Disable submit button
                const submit = document.querySelector ('button[type="submit"]')
                submit.disabled = true
            }
        }
    }

    // Update component with error message and passwords
    useEffect (() => {}, [pass_error])



    return (
        <form className='mt-0' onSubmit={function (event) {onSubmit(event)}}>
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
            <Select
                id='country'
                data={countries_names}
                value='United States'
                label="Country"
                required={true}
            />
            <Select
                id='rol'
                data={roles}
                value='Standard'
                label="Rol"
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
                onChange={function (event) {
                    handlePassword ()
                }}
            />
            <Input
                id='password2'
                label='Repeat password'
                type='password'
                placeholder=''
                minLength={8}
                required={true}

                // Save password 2 state variable
                onChange={function (event) {
                    handlePassword ()
                }}
            />
            <p className='text-danger'>{pass_error}</p>
            <Button
                size={5}
                outline={true}
                text='Submit'
                type="submit"
                disabled={true}
            />
        </form>
    )
}
