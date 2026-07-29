// app/lib/supabaseClient.js
// একটাই client instance সারা অ্যাপে ব্যবহার হবে (singleton pattern) —
// প্রতি রিকোয়েস্টে নতুন ইনস্ট্যান্স বানানো অপ্রয়োজনীয় ওভারহেড।
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);