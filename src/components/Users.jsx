import { useState, useEffect } from 'react'
import {
    get_users,
    get_roles
} from '../js/api'
import CheckBox from './CheckBox'
import Input from './Input'
import Table from './Table'
import TableLoading from './TableLoading'
import TableButton from './TableButton'
import TableTags from './TableTags'

export default function Users() {
    // form and data states
    const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([])
    const [form_type, setFormType] = useState('Add')
    const [update_id, setUpdateId] = useState(0)
    const [name, setName] = useState(0)
    const [details, setDetails] = useState(0)

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


        // if (form_type == 'Add') {

        //     // Save rol in database
        //     save_user(name, details).then((data) => {
        //         // Save users pages in database
        //         save_users_pages(new_users_pages).then((data) => {
        //             // Restart users for update
        //             setusers([])
        //         })
        //     })
        // } else if (form_type == 'Update') {
        //     const user_id = update_id
        //     const new_users_pages = get_formated_users_pages(pages_ids, user_id)

        //     // Delete last registers
        //     const users_pages_last = users_pages.filter(
        //         (user_page) => user_page.user_id == user_id
        //     )
        //     const users_pages_last_ids = users_pages_last.map(
        //         (user_page) => user_page.id
        //     )
        //     delete_users_pages_in(users_pages_last_ids).then(() => {
        //         // Update rol in database
        //         const rol_data = { name, details }
        //         update_user(user_id, rol_data).then(() => {
        //             // Insert new users pages in database
        //             save_users_pages(new_users_pages).then(() => {
        //                 // Restart users and users pages for update
        //                 setusers([])
        //                 setusersPages([])
        //             })
        //         })
        //     })
        // }

        // Clean form after changes
        event.target.reset()

        // Reset form type
        setFormType('Add')
    }

    function handleEdit(event) {
        // Get rol data
        const table_row = event.target.parentNode.parentNode
        const user_id = table_row.querySelector('.id').innerHTML
        const user_name = table_row.querySelector('.name').innerHTML
        const user_details = table_row.querySelector('.details').innerHTML
        const user_pages = table_row.querySelectorAll('.pages > span')

        // Placa name and details in form
        const name_input = document.querySelector('#name')
        const details_input = document.querySelector('#details')

        name_input.value = user_name
        details_input.value = user_details

        // Update states
        setName(user_name)
        setDetails(user_details)

        // Disable all checkboxes
        const checkboxes_inputs = document.querySelectorAll(
            'input[type="checkbox"]'
        )
        for (const checkbox of checkboxes_inputs) {
            checkbox.checked = false
        }

        // Activate checkboxes in form
        for (const page of user_pages) {
            const page_id = page.innerHTML
            const selector_checkbox = `input#${page_id}`
            const checkbox = document.querySelector(selector_checkbox)
            checkbox.checked = true
        }

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
        event.target.parentNode.reset()

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
                        <td className='rol'>{role}</td>

                        {/* Delete and edit buttons */}
                        <td className='button'>
                            <TableButton
                                value='edit'
                                onClick={function (event) {
                                    // handleEdit(event)
                                }}
                            />
                            <TableButton
                                value='delete'
                                onClick={function (event) {
                                    // hadleDelete(event)
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

    let cancel_button = ''
    if (form_type == 'Update') {
        cancel_button = (
            <TableButton
                value='cancel'
                onClick={function (event) {
                    // handleCancel(event)
                }}
            />
        )
    }


    return (
        <section className='users-wrapper'>
            <h1 className='text-center mb-4'>Manage users</h1>
            <div className='users row'>
                <form
                    className='col-12 col-lg-4 border-end p-4'
                    onSubmit={function (event) {
                        // handleSubmit(event)
                    }}
                >
                    <Input
                        id='name'
                        label='Name'
                        type='text'
                        placeholder='Admin'
                        required={true}
                        onChange={function (event) {
                            setName(event.target.value)
                        }}
                    />
                    <Input
                        id='details'
                        label='Details'
                        type='text'
                        placeholder='About the rol...'
                        required={true}
                        onChange={function (event) {
                            setDetails(event.target.value)
                        }}
                    />

                    <h2 className='h5'>Pages permisions</h2>

                    <TableButton
                        value='add'
                        type="submit"
                    />

                    {/* Insert cancel button for update */}
                    {cancel_button}
                </form>
                <Table
                    headers={['id', 'first name', 'last name', 'email', 'phone', 'country', 'rol']}
                    body={results}
                    layout="col-12"
                />
            </div>
        </section>
    )
}
