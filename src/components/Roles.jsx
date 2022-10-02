import { useState, useEffect } from 'react'
import { get_pages, get_roles_pages, save_role, save_roles_pages } from '../js/api'
import CheckBox from './CheckBox'

export default function Roles () {

    // Pages states
    const [pages, setPages] = useState ([])
    const [roles, setRoles] = useState ([])
    const [form_type, setFormType] = useState ("Add")
    const [name, setName] = useState ("Add")
    const [details, setDetails] = useState ("Add")
    const [update, setUpdate] = useState (0)

    // Get pages from api
    useEffect (() => {
        get_pages().then ((pages) => setPages(pages))
    }, [update])

    // Get rikes from api
    useEffect (() => {
        get_roles_pages().then ((roles) => {
                setRoles(roles)
            })
    }, [update])

    function handleEdit (event) {
        const table_row = event.target.parentNode
    }

    function handleSubmit (event) {

        // No submit form
        event.preventDefault()

        // Loop for each page selected in checkboxes
        let pages_ids = []
        const input_pages = document.querySelectorAll (".page > input:checked")
        for (const input_page of input_pages) {
            const page_name = input_page.id

            // Get and sdve page id
            pages_ids = pages_ids.concat (
                pages.filter ((page) => page.name == page_name)
                    .map ((page) => page.id)
            )
        }      

        if (form_type == "Add") {

            // Calculate id of the new register
            const rol_id = Math.max (...roles.map((role) => role.id)) + 1

            // Format registers for the table 'roles_pages'
            const roles_pages = pages_ids.map ((page_id) => {
                return {
                    "rol_id": rol_id,
                    "page_id": page_id
                }
            })

            
            // Save rol in database
            save_role(name, details).then (
                // Save roles pages in database
                save_roles_pages (roles_pages).then (
                    // refresh component
                    setUpdate (update + 1)
                )
            )
        }

        // Clean form after changes
        event.target.reset()

    } 


    return (
        <section className='roles-wrapper'>
            <h1 className="text-center mb-4">Manage Roles</h1>
            <div className="roles row">
                <form className='col-12 col-lg-4 border-end p-4' onSubmit={function (event) {handleSubmit(event)}}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Admin" required onChange={function (event) {setName(event.target.value)} }/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="details" className="form-label">Details</label>
                        <input type="text" className="form-control" id="details" placeholder="About the rol..." required onChange={function (event) {setDetails(event.target.value)} }/>
                    </div>
                    <h2 className="h5">Pages permisions</h2>

                    { pages.map (page => <CheckBox key={page.id} class_group="page" id={page.name} label={`${page.name} Page`} />)}

                    <button type="submit" className="btn btn-primary mt-4 px-5">{form_type}</button>
                </form>
                <div className="table-wrapper col-12 col-lg-8 p-4">
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Details</th>
                            <th scope="col">Pages</th>
                            <th scope="col">Buttons</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map ((role) => {
                                return (
                                    <tr key={role.id}>
                                        <td>{role.name}</td>
                                        <td>{role.details}</td>

                                        <td>
                                            {
                                                /* Generate pages tags */
                                                Object.keys(role.pages).map ((page_key) => {
                                                    let page = role.pages[page_key]
                                                    return <span page={page_key} className='p-1' key={page_key}>{page}</span>
                                                })
                                            }
                                        </td>


                                        <td>
                                            <button type="button" className="btn btn-outline-primary m-1">Edit</button>
                                            <button type="button" className="btn btn-danger m-1">Delete</button>
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