import { createClient } from '@supabase/supabase-js';

// Environment guards for SmartPriemkaPro
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create client with fallback defaults for build environment
const createSupabaseClient = () => {
  // Use placeholder values during build if env vars are missing
  const url = supabaseUrl || 'https://placeholder.supabase.co';
  const key = supabaseAnonKey || 'placeholder_key';
  
  return createClient(url, key);
};

export const supabase = createSupabaseClient();
export default supabase;
