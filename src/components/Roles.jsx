import { useState, useEffect } from 'react'
import {
    get_pages,
    get_roles_pages,
    save_role,
    save_roles_pages,
} from '../js/api'
import CheckBox from './CheckBox'
import Loading from './Loading'

export default function Roles() {
    // Pages states
    const [pages, setPages] = useState([])
    const [roles, setRoles] = useState([])
    const [form_type, setFormType] = useState('Add')
    const [loading, setLoading] = useState(true)

    // Get pages from api
    useEffect(() => {
        get_pages().then((pages) => setPages(pages))
    }, [loading])

    // Get rikes from api
    useEffect(() => {
        get_roles_pages().then((roles) => {
            setRoles(roles)
            setLoading(false)
        })
    }, [loading])

    // Update component when form type change
    useEffect(() => {}, [form_type])

    function handleSubmit(event) {
        // No submit form
        event.preventDefault()

        // Loop for each page selected in checkboxes
        let pages_ids = []
        const input_pages = document.querySelectorAll('.page > input:checked')
        for (const input_page of input_pages) {
            const page_name = input_page.id

            // Get and sdve page id
            pages_ids = pages_ids.concat(
                pages
                    .filter((page) => page.name == page_name)
                    .map((page) => page.id)
            )
        }

        if (form_type == 'Add') {
            // Calculate id of the new register
            const rol_id = Math.max(...roles.map((role) => role.id)) + 1

            // Format registers for the table 'roles_pages'
            const roles_pages = pages_ids.map((page_id) => {
                return {
                    rol_id: rol_id,
                    page_id: page_id,
                }
            })

            // Save rol in database
            save_role(name, details).then(
                // Save roles pages in database
                save_roles_pages(roles_pages).then(
                    // refresh component actgivating the loading spinner
                    setLoading(true)
                )
            )
        }

        // Clean form after changes
        event.target.reset()
    }

    function handleEdit(event) {
        // Get rol data
        const table_row = event.target.parentNode.parentNode
        console.log(table_row)
        const role_id = table_row.querySelector('.id').innerHTML
        const role_name = table_row.querySelector('.name').innerHTML
        const role_details = table_row.querySelector('.details').innerHTML
        const role_pages = table_row.querySelector('.pages > span')

        // Placa data in form
        const name_input = document.querySelector('#name')
        const details_input = document.querySelector('#details')
        const pages_input = document.querySelector('input.page')

        name_input.value = role_name
        details_input.value = role_details

        // Update form type state
        setFormType('Update')
    }

    if (loading) {
        return (
            <section className='roles-wrapper'>
                <div className='loading-wrapper w-100 mt-0 d-flex align-items-center justify-content-center'>
                    <Loading />
                </div>
            </section>
        )
    }

    return (
        <section className='roles-wrapper'>
            <h1 className='text-center mb-4'>Manage Roles</h1>
            <div className='roles row'>
                <form
                    className='col-12 col-lg-4 border-end p-4'
                    onSubmit={function (event) {
                        handleSubmit(event)
                    }}
                >
                    <div className='mb-3'>
                        <label
                            htmlFor='name'
                            className='form-label'
                        >
                            Name
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            id='name'
                            placeholder='Admin'
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label
                            htmlFor='details'
                            className='form-label'
                        >
                            Details
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            id='details'
                            placeholder='About the rol...'
                            required
                        />
                    </div>
                    <h2 className='h5'>Pages permisions</h2>

                    {pages.map((page) => (
                        <CheckBox
                            key={page.id}
                            class_group='page'
                            id={page.name}
                            label={`${page.name} Page`}
                        />
                    ))}

                    <button
                        type='submit'
                        className='btn btn-primary mt-4 px-5 m-1'
                    >
                        {form_type}
                    </button>

                    {form_type == 'Update' ? (
                        <button
                            type='button'
                            className='btn btn-secondary mt-4 px-5 m-1'
                            onClick={function (event) {
                                setFormType('Add')
                                event.target.parentNode.reset ()
                            }}
                        >
                            Cancel
                        </button>
                    ) : ('')}
                </form>
                <div className='table-wrapper col-12 col-lg-8 p-4'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th
                                    scope='col'
                                    className='d-none'
                                >
                                    id
                                </th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Details</th>
                                <th scope='col'>Pages</th>
                                <th scope='col'>Buttons</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((role) => {
                                return (
                                    <tr key={role.id}>
                                        <td className='id d-none'>{role.id}</td>
                                        <td className='name'>{role.name}</td>
                                        <td className='details'>
                                            {role.details}
                                        </td>

                                        <td className='pages'>
                                            {
                                                /* Generate pages tags */
                                                Object.keys(role.pages).map(
                                                    (page_key) => {
                                                        let page =
                                                            role.pages[page_key]
                                                        return (
                                                            <span
                                                                page={page_key}
                                                                className='p-1'
                                                                key={page_key}
                                                            >
                                                                {page}
                                                            </span>
                                                        )
                                                    }
                                                )
                                            }
                                        </td>

                                        <td className='button'>
                                            <button
                                                type='button'
                                                className='btn btn-outline-primary m-1'
                                                onClick={function (event) {
                                                    handleEdit(event)
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type='button'
                                                className='btn btn-danger m-1'
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}
