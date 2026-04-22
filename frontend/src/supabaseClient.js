import { createClient } from '@supabase/supabase-js'

// Cole a sua URL e a sua Chave Pública (anon) aqui dentro das aspas:
const supabaseUrl = 'https://yrpqyfhxnugxvguigchq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycHF5Zmh4bnVneHZndWlnY2hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3ODE5MTYsImV4cCI6MjA5MjM1NzkxNn0.OXFg7PsBUVJiGTNzpYW41jHESkVG4A-les98lJbzp4E'

export const supabase = createClient(supabaseUrl, supabaseKey)