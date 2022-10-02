import { createClient } from '@supabase/supabase-js'

// get enviroment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function get_roles () {

    // supabase = await get_supabase ()
    let { data: roles, error } = await supabase
        .from('roles')
        .select('*')

    return roles
}