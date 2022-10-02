import { createClient } from '@supabase/supabase-js'

// get enviroment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

export async function get_roles () {
    const supabase = createClient(supabaseUrl, supabaseKey)
    // supabase = await get_supabase ()
    let { data: roles, error } = await supabase
        .from('roles')
        .select('*')

    console.log (roles)
}