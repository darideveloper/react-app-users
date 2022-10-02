import { createClient } from '@supabase/supabase-js'
import {encrypt, decrypt} from '../js/crypt'

// get enviroment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function get_roles () {

    // const pass1 = encrypt("alice1999++")
    // console.log (pass1)
    
    // Query and return all registers from "roles" table
    let { data: roles, error } = await supabase
        .from('roles')
        .select('*')

    return roles
}

export async function get_user_password (email) {

    // Query and return an user password, searching by email from users table
    let { data: users, error } = await supabase
        .from('users')
        .select('password')
        .ilike('email', email)

    return users
}

export async function get_pages () {
    // Query and return all registers from "roles" table
    let { data: pages, error } = await supabase
        .from('pages')
        .select('*')

    return pages

}