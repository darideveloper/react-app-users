import { useState, useEffect } from 'react'
import {
    get_users,
    get_roles,
    save_user
} from '../js/api'
import CheckBox from './CheckBox'
import Input from './Input'
import Table from './Table'
import TableLoading from './TableLoading'
import TableButton from './TableButton'
import TableTags from './TableTags'
import UsersForm from './UsersForm'
import Button from './Button'

export default function Users() {
    // form and data states
    const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([])
    const [form_type, setFormType] = useState('Add')
    const [update_id, setUpdateId] = useState(0)
    const [first, setFirst] = useState("")
    const [last, setLast] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [country, setCountry] = useState("United States")
    const [role, setRole] = useState("Standard")
    const [password, setPassword] = useState("")

    // Get users from api
    useEffect(() => {
        if (users.length == 0) {
            get_users().then((users) => setUsers(users))
        }
    }, [users])

    // Get roles from api
    useEffect(() => {
        if (roles.length == 0) {
            get_roles().then((roles) => setRoles(roles))
        }
    }, [roles])

    // Update component when form type change
    useEffect(() => {}, [form_type])

    function handleSubmit(event) {
        // No submit form
        event.preventDefault()


        if (form_type == 'Add') {

            // Get id of the current fol
            const rol_id = roles.filter ((role) => role.name == role).map ((role) => role.id)[0]

            const user_data = {
                first,
                last,
                email, 
                phone, 
                country, 
                rol_id, 
                password
            }

            // Save rol in database
            save_user(user_data).then (
                // Restart users for refresh component
                setUsers([])
            )

        } else if (form_type == 'Update') {
            const user_id = update_id
            const new_users_pages = get_formated_users_pages(pages_ids, user_id)

            // Delete last registers
            const users_pages_last = users_pages.filter(
                (user_page) => user_page.user_id == user_id
            )
            const users_pages_last_ids = users_pages_last.map(
                (user_page) => user_page.id
            )
            delete_users_pages_in(users_pages_last_ids).then(() => {
                // Update rol in database
                const rol_data = { name, details }
                update_user(user_id, rol_data).then(() => {
                    // Insert new users pages in database
                    save_users_pages(new_users_pages).then(() => {
                        // Restart users and users pages for update
                        setusers([])
                        setusersPages([])
                    })
                })
            })
        }

        // Clean form after changes
        event.target.reset()

        // Reset form type
        setFormType('Add')
    }

    function handleEdit(event) {
        // Get rol data
        const table_row = event.target.parentNode.parentNode
        const user_id = table_row.querySelector('.id').innerHTML
        const user_first = table_row.querySelector('.first').innerHTML
        const user_last = table_row.querySelector('.last').innerHTML
        const user_email = table_row.querySelector('.email').innerHTML
        const user_phone = table_row.querySelector('.phone').innerHTML
        const user_country = table_row.querySelector('.country').innerHTML
        const user_role = table_row.querySelector('.role').innerHTML

        // Placa name and details in form
        const first_input = document.querySelector('#first')
        const last_input = document.querySelector('#last')
        const email_input = document.querySelector('#email')
        const phone_input = document.querySelector('#phone')
        const country_input = document.querySelector('#country')
        const role_input = document.querySelector('#role')

        first_input.value = user_first
        last_input.value = user_last
        email_input.value = user_email
        phone_input.value = user_phone
        country_input.value = user_country
        role_input.value = user_role

        // Update states
        setFirst(user_first)
        setLast(user_last)
        setEmail(user_email)
        setPhone(user_phone)
        setCountry(user_country)
        setRole(user_role)

        // Save update id in state
        setUpdateId(user_id)

        // Update form type state
        setFormType('Update')
    }

    function hadleDelete(event) {
        // Get id for the current rol
        const table_row = event.target.parentNode.parentNode
        const user_id = table_row.querySelector('.id').innerHTML

        // Get ids form table 'users pages'
        const users_pages_match = users_pages.filter(
            (user_pages) => user_pages.user_id == user_id
        )
        const users_pages_ids = users_pages_match.map(
            (user_pages) => user_pages.id
        )

        // Delete user
        delete_user(user_id).then(() => {
            // Delete users_pages
            delete_users_pages_in(users_pages_ids).then(() => {
                // Restart users for update
                setusers([])
            })
        })
    }

    function handleCancel(event) {

        // Reset state to add
        setFormType('Add')

        // Reset form
        event.target.parentNode.parentNode.parentNode.reset()

        // set default values for country and role
        setCountry ("United States")
        setRole ("Standard")

        // Reset update id
        setUpdateId(0)
    }

    // Show results or loading in table
    let results
    if (users.length) {

        // Generate results table
        results =
            // Map users
            users.map((user) => {

                // Get rol name for the current user
                const role = roles.filter ((role) => role.id == user.rol_id).map ((role) => role.name)

                // Return table row
                return (
                    <tr key={user.id}>
                        <td className='id d-none'>{user.id}</td>
                        <td className='first'>{user.first}</td>
                        <td className='last'>{user.last}</td>
                        <td className='email'>{user.email}</td>
                        <td className='phone'>{user.phone}</td>
                        <td className='country'>{user.country}</td>
                        <td className='role'>{role}</td>

                        {/* Delete and edit buttons */}
                        <td className='button'>
                            <TableButton
                                value='edit'
                                onClick={function (event) {
                                    handleEdit(event)
                                }}
                            />
                            <TableButton
                                value='delete'
                                onClick={function (event) {
                                    hadleDelete(event)
                                }}
                            />
                        </td>
                    </tr>
                )
            })
    } else {
        // Generate loading spinner
        results = <TableLoading col_span={4} />
    }

    // Generate buttons
    let cancel_button = ""
    if (form_type == 'Update') {
        cancel_button = (
            <Button
                size={5}
                outline={false}
                text="Cancel"
                type="button"
                color="secondary"
                onClick={function (event) {handleCancel(event)}}
            />
        )
    }
    const buttons = (
        <>
            <Button
                size={5}
                outline={true}
                text={form_type}
                type="submit"
                disabled={true}
            />
            {cancel_button}
        </>
    )


    return (
        <section className='users-wrapper'>
            <h1 className='text-center mb-4'>Manage users</h1>
            <div className='users row'>
                <UsersForm 
                    onSubmit={handleSubmit}
                    layout="col-12 col-md-6"
                    buttons={buttons}
                    onChangeFunctions={{
                        setFirst,
                        setLast,
                        setEmail,
                        setPhone, 
                        setCountry,
                        setRole, 
                        setPassword
                    }}
                    country_value={country}
                    rol_value={role}
                />
                <Table
                    headers={['id', 'first name', 'last name', 'email', 'phone', 'country', 'rol']}
                    body={results}
                    layout="col-12 mt-5"
                />
            </div>
        </section>
    )
}
