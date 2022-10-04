import { useState, useEffect } from 'react'
import {
    get_pages,
    get_roles,
    get_roles_pages,
    save_role,
    save_roles_pages,
    update_role,
    delete_role,
    delete_roles_pages_in,
} from '../js/api'
import CheckBox from './CheckBox'
import Input from './Input'
import Table from './Table'
import TableLoading from './TableLoading'
import TableButton from './TableButton'
import TableTags from './TableTags'
import Button from './Button'

export default function Roles() {
    // form and data states
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
            const new_roles_pages = get_formated_roles_pages(pages_ids, role_id)

            // Save rol in database
            save_role(name, details).then((data) => {
                // Save roles pages in database
                save_roles_pages(new_roles_pages).then((data) => {
                    // Restart roles for update
                    setRoles([])
                })
            })
        } else if (form_type == 'Update') {
            const role_id = update_id
            const new_roles_pages = get_formated_roles_pages(pages_ids, role_id)

            // Delete last registers
            const roles_pages_last = roles_pages.filter(
                (role_page) => role_page.role_id == role_id
            )
            const roles_pages_last_ids = roles_pages_last.map(
                (role_page) => role_page.id
            )
            delete_roles_pages_in(roles_pages_last_ids).then(() => {
                // Update rol in database
                const rol_data = { name, details }
                update_role(role_id, rol_data).then(() => {
                    // Insert new roles pages in database
                    save_roles_pages(new_roles_pages).then(() => {
                        // Restart roles and roles pages for update
                        setRoles([])
                        setRolesPages([])
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
        const role_id = table_row.querySelector('.id').innerHTML
        const role_name = table_row.querySelector('.name').innerHTML
        const role_details = table_row.querySelector('.details').innerHTML
        const role_pages = table_row.querySelectorAll('.pages > span')

        // Placa name and details in form
        const name_input = document.querySelector('#name')
        const details_input = document.querySelector('#details')

        name_input.value = role_name
        details_input.value = role_details

        // Update states
        setName(role_name)
        setDetails(role_details)

        // Disable all checkboxes
        const checkboxes_inputs = document.querySelectorAll(
            'input[type="checkbox"]'
        )
        for (const checkbox of checkboxes_inputs) {
            checkbox.checked = false
        }

        // Activate checkboxes in form
        for (const page of role_pages) {
            const page_id = page.innerHTML
            const selector_checkbox = `input#${page_id}`
            const checkbox = document.querySelector(selector_checkbox)
            checkbox.checked = true
        }

        // Save update id in state
        setUpdateId(role_id)

        // Update form type state
        setFormType('Update')
    }

    function hadleDelete(event) {
        // Get id for the current rol
        const table_row = event.target.parentNode.parentNode
        const role_id = table_row.querySelector('.id').innerHTML

        // Get ids form table 'roles pages'
        const roles_pages_match = roles_pages.filter(
            (role_pages) => role_pages.role_id == role_id
        )
        const roles_pages_ids = roles_pages_match.map(
            (role_pages) => role_pages.id
        )

        // Delete role
        delete_role(role_id).then(() => {
            // Delete roles_pages
            delete_roles_pages_in(roles_pages_ids).then(() => {
                // Restart roles for update
                setRoles([])
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
    if (roles.length && pages.length && roles_pages) {

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

                // Return table row
                return (
                    <tr key={role.id}>
                        <td className='id d-none'>{role.id}</td>
                        <td className='name'>{role.name}</td>
                        <td className='details'>{role.details}</td>

                        {/* Pages available for the user */}
                        <td className='pages'>
                            <TableTags value={pages_names_ids} />
                        </td>

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
                onClick={function (event) {

                    // Restart form type
                    setFormType ("Add")

                    // Clean form
                    event.target.parentNode.reset()
                    }
                }
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
            />
            {cancel_button}
        </>
    )

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

                    {/* render checkboxes */}
                    {pages.map((page) => (
                        <CheckBox
                            key={page.id}
                            class_group='page'
                            id={page.name}
                            label={`${page.name} Page`}
                        />
                    ))}

                    {buttons}
                </form>
                <Table
                    headers={['id', 'name', 'details', 'pages', 'buttons']}
                    body={results}
                    layout="col-12 col-lg-8"
                />
            </div>
        </section>
    )
}
