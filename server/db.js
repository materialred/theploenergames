import postgres from 'postgres'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';
dotenv.config();

// Use DATABASE_URL for direct Postgres connection
const pgUrl = process.env.DATABASE_URL

// Use SUPABASE_URL and SUPABASE_ANON_KEY for Supabase client
const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

// Initialize postgres client (if you need direct SQL access)
const sql = postgres(pgUrl)

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export { sql, supabase }
console.log('Database connection established')





