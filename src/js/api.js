import { createClient } from '@supabase/supabase-js'

// get enviroment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

function sleep(sec) {
    return new Promise(resolve => setTimeout(resolve, sec*1000));
}

// -------------------
// ROLES QUERIES
// -------------------

export async function get_roles () {

    await sleep(1)
    
    // Query and return all registers from "roles" table
    let { data: roles, error } = await supabase
        .from('roles')
        .select('*')  

    return roles
}

export async function get_role (id) {

    await sleep(1)
    
    // Query and return specific rol by id
    let { data: roles, error } = await supabase
        .from('roles')
        .select('*')
        .eq ('id', id)

    return roles
}

export async function save_role (name, details) {
    const { data, error } = await supabase
        .from('roles')
        .insert([
            { 
                name: name, 
                details: details
            },
        ])

    return (data, error)
}

export async function update_role (id, data_save) {
    const { data, error } = await supabase
        .from('roles')
        .update(data_save)
        .eq('id', id)

    return (data, error)
}

export async function delete_role (id) {
    const { data, error } = await supabase
        .from('roles')
        .delete()
        .eq('id', id)

        return (data, error)
}

// -------------------
// USER QUERIES
// -------------------

export async function get_user_password (email) {

    await sleep(1)

    // Query and return an user password, searching by email from users table
    let { data: users, error } = await supabase
        .from('users')
        .select('password')
        .eq('email', email)

    return users
}

export async function get_users () {

    await sleep(1)

    // Query and return all users from database
    let { data: users, error } = await supabase
        .from('users')
        .select('*')
    return (users)
}

export async function save_user (user_data) {
    const { data, error } = await supabase
        .from('users')
        .insert([user_data])

    return (data, error)
}

export async function update_user (id, user_data) {
    const { data, error } = await supabase
        .from('users')
        .update(user_data)
        .eq('id', id)

    return (data, error)
}

export async function delete_user (id) {
    const { data, error } = await supabase
        .from('users')
        .delete()
        .eq('id', id)

    return (data, error)
}

// -------------------
// PAGES QUERIES
// -------------------

export async function get_pages () {
    
    await sleep(1)

    // Query and return all registers from "pages" table
    let { data: pages, error } = await supabase
        .from('pages')
        .select('*')

    return pages

}

export async function get_page_name (page_id) {

    await sleep(1)

    // Query and return name column of registers from "pages" table
    let { data: pages, error } = await supabase
        .from('pages')
        .select('name')
        .eq ('id', page_id)

    return pages
}

// -------------------
// ROLES PAGES QUERIES
// -------------------


export async function get_roles_pages () {

    await sleep(1)
    
    let { data: roles_pages, error } = await supabase
        .from('roles_pages')
        .select('*')
    return roles_pages
}

export async function save_roles_pages (roles_pages) {

    // Add rol to page
    const { data, error } = await supabase
        .from('roles_pages')
        .insert(roles_pages)

    return data, error
}

export async function delete_roles_pages_in (ids) {
    // Delete registers from table 'roles_pages' based in a array of ids
    const { data, error } = await supabase
        .from('roles_pages')
        .delete()
        .in('id', ids)

    return (data, error)
}

