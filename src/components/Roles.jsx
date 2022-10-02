import { useState, useEffect } from 'react'
import { get_pages, get_roles_pages } from '../js/api'
import CheckBox from './CheckBox'

export default function Roles () {

    // Pages states
    const [pages, setPages] = useState ([])
    const [roles, setRoles] = useState ([])
    const [form_type, setFormType] = useState ("Add")

    // Get pages from api
    useEffect (() => {
        get_pages()
            .then ((pages) => setPages(pages))
    }, [])

    // Get rikes from api
    useEffect (() => {
        get_roles_pages()
            .then ((roles) => {
                setRoles(roles)
            })
    }, [])

    function handleEdit (event) {
        const table_row = event.target.parentNode

    }


    return (
        <section className='roles-wrapper'>
            <h1 className="text-center mb-4">Manage Roles</h1>
            <div className="roles row">
                <div className="table-wrapper col-12 col-lg-8">
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
                                            <button type="button" className="btn btn-primary m-1">Edit</button>
                                            <button type="button" className="btn btn-danger m-1">Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                            
                        </tbody>
                    </table>
                </div>
                <form className='col-12 col-lg-4'>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Admin" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="details" className="form-label">Details</label>
                        <input type="text" className="form-control" id="details" placeholder="About the rol..." required/>
                    </div>
                    <h2 className="h5">Pages permisions</h2>

                    { pages.map (page => <CheckBox key={page.id} class_group="page" id={page.name} label={`${page.name} Page`} />)}

                    <button type="submit" className="btn btn-primary mt-4 px-4">{form_type}</button>
                </form>
            </div>
        </section>
    )
}