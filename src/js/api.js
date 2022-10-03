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
}