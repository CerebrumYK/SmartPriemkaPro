import { createClient } from '@supabase/supabase-js';

// Environment guards for SmartPriemkaPro
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// TODO: Replace with actual Supabase configuration when ready
// For now, create client only if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export default supabase;
