import { useState, useEffect } from 'react'
import {
    get_pages,
    get_roles,
    get_roles_pages,
    save_role,
    save_roles_pages,
    update_role,
    delete_role,
    delete_roles_pages_in
} from '../js/api'
import CheckBox from './CheckBox'
import Loading from './Loading'

export default function Roles() {
    // Pages states
    const [pages, setPages] = useState([])
    const [roles, setRoles] = useState([])
    const [roles_pages, setRolesPages] = useState([])
    const [form_type, setFormType] = useState('Add')
    const [update_id, setUpdateId] = useState(0)
    const [name, setName] = useState(0)
    const [details, setDetails] = useState(0)

    // Get pages from api
    useEffect(() => {
        if (pages.length == 0) {
            get_pages().then((pages) => setPages(pages))
        }
    }, [pages])

    // Get roles from api
    useEffect(() => {
        if (roles.length == 0) {
            get_roles().then((roles) => setRoles(roles))
        }
    }, [roles])

    // Get roles from api
    useEffect(() => {
        if (roles_pages.length == 0) {
            get_roles_pages().then((roles_pages) => setRolesPages(roles_pages))
        }
    }, [roles_pages])

    // Update component when form type change
    useEffect(() => {}, [form_type])

    function get_formated_roles_pages(pages_ids, role_id) {
        // Format registers for the table 'roles_pages'
        const roles_pages = pages_ids.map((page_id) => {
            return {
                role_id: role_id,
                page_id: page_id,
            }
        })

        return roles_pages
    }

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
            // get rol id and formated roles pages
            const role_id = Math.max(...roles.map((role) => role.id)) + 1
            const roles_pages = get_formated_roles_pages(pages_ids, role_id)

            // Save rol in database
            save_role(name, details).then((data) => {
                // Save roles pages in database
                save_roles_pages(roles_pages).then((data) => {
                    // Restart roles for update
                    setRoles([])
                })
            })
        } else if (form_type == 'Update') {
            const role_id = update_id
            const roles_pages = get_formated_roles_pages(pages_ids, role_id)

            // Update rol in database
            const rol_data = { name, details }
            update_role(role_id, rol_data).then(() => {
                // Restart roles for update
                setRoles([])
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
        const role_id = table_row.querySelector('.id').innerHTML
        const role_name = table_row.querySelector('.name').innerHTML
        const role_details = table_row.querySelector('.details').innerHTML
        const role_pages = table_row.querySelectorAll('.pages > span')
        console.log (role_pages)

        // Placa name and details in form
        const name_input = document.querySelector('#name')
        const details_input = document.querySelector('#details')

        name_input.value = role_name
        details_input.value = role_details

        // Update states
        setName (role_name)
        setDetails (role_details)

        // Disable all checkboxes
        const checkboxes_inputs = document.querySelectorAll ('input[type="checkbox"]')
        for (const checkbox of checkboxes_inputs) {
            checkbox.checked = false
        }

        // Activate checkboxes in form
        for (const page of role_pages) {
            const page_id = page.innerHTML
            const selector_checkbox = `input#${page_id}`
            const checkbox = document.querySelector (selector_checkbox)
            console.log ({checkbox, selector_checkbox})
            checkbox.checked = true
        }

        // Save update id in state
        setUpdateId(role_id)

        // Update form type state
        setFormType('Update')
    }

    function hadleDelete (event) {
        // Get id for the current rol
        const table_row = event.target.parentNode.parentNode
        const role_id = table_row.querySelector('.id').innerHTML

        // Get ids form table 'roles pages'
        const roles_pages_match = roles_pages.filter ((role_pages) => role_pages.role_id == role_id)
        const roles_pages_ids = roles_pages_match.map ((role_pages) => role_pages.id)

        // Delete role
        delete_role(role_id).then (() => {
            // Delete roles_pages
            delete_roles_pages_in(roles_pages_ids).then (() => {
                // Restart roles for update
                setRoles([])
            })
        })


    }

    // Show results or loading in table
    let results
    if (roles.length && pages.length && roles_pages) {
        // Generate results table

        // Generate results table
        results =
            // Map roles
            roles.map((role) => {
                // Get pages
                const pages_objs = roles_pages.filter(
                    (role_pages) => role_pages.role_id == role.id
                )
                const pages_ids = pages_objs.map((page) => page.page_id)
                const pages_names_ids = pages
                    .filter((page) => pages_ids.includes(page.id))
                    .map((page) => [page.id, page.name])

                return (
                    <tr key={role.id}>
                        <td className='id d-none'>{role.id}</td>
                        <td className='name'>{role.name}</td>
                        <td className='details'>{role.details}</td>

                        <td className='pages'>
                            {pages_names_ids.map((page) => {
                                const page_id = page[0]
                                const page_name = page[1]

                                return (
                                    <span
                                        page={page_id}
                                        className='p-1'
                                        key={page_id}
                                    >
                                        {page_name}
                                    </span>
                                )
                            })}
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
                                onClick={function(event) {hadleDelete(event)}}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                )
            })
    } else {
        // Generate loading spinner
        results = (
            <tr>
                <td
                    colSpan='4'
                    className='text-center p-5'
                >
                    <Loading />
                </td>
            </tr>
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
                            onChange={function (event) {
                                setName(event.target.value)
                            }}
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
                            onChange={function (event) {
                                setDetails(event.target.value)
                            }}
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
                                // Reset state to add
                                setFormType('Add')

                                // Reset form
                                event.target.parentNode.reset()

                                // Reset update id
                                setUpdateId(0)
                            }}
                        >
                            Cancel
                        </button>
                    ) : (
                        ''
                    )}
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
                        <tbody>{results}</tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}
