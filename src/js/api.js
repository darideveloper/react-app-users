import { createClient } from '@supabase/supabase-js'
import {encrypt, decrypt} from '../js/crypt'

// get enviroment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// -------------------
// ROLES QUERIES
// -------------------

export async function get_roles () {
    
    // Query and return all registers from "roles" table
    let { data: roles, error } = await supabase
        .from('roles')
        .select('*')    

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

export async function update_rol (id, data_save) {
    const { data, error } = await supabase
        .from('roles')
        .update(data_save)
        .eq('id', id)

    return (data, error)
}

// -------------------
// USER QUERIES
// -------------------

export async function get_user_password (email) {

    // Query and return an user password, searching by email from users table
    let { data: users, error } = await supabase
        .from('users')
        .select('password')
        .eq('email', email)

    return users
}

// -------------------
// PAGES QUERIES
// -------------------

export async function get_pages () {
    // Query and return all registers from "pages" table
    let { data: pages, error } = await supabase
        .from('pages')
        .select('*')

    return pages

}

export async function get_page_name (page_id) {
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
    // Query all registers from "roles" table
    let { data: roles, error } = await supabase
        .from('roles')
        .select('*')

    // Get ids of rpages for each role
    let roles_ids = []
    for (let role of roles) {
        let { data: roles_users, error } = await supabase
            .from('roles_pages')
            .select('page_id')
            .eq('rol_id', role.id)

        // Add new attribute to rol
        role.pages = {}

        // Save current roleid
        roles_ids.push (role.id)

        for (const role_user of roles_users) {
            const page_id = role_user.page_id

            // Get page name
            const pages_names = await get_page_name(page_id)
            const page_name = pages_names[0].name

            // Save current pages in rol
            role.pages[page_id] = page_name
        }
    }
    
    return roles
}

export async function save_roles_pages (pages) {
    const user = supabase.auth.user()

    const { data, error } = await supabase
        .from('roles_pages')
        .insert(pages)
}