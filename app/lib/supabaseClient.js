// app/lib/supabaseClient.js
// একটাই client instance সারা অ্যাপে ব্যবহার হবে (singleton pattern) —
// প্রতি রিকোয়েস্টে নতুন ইনস্ট্যান্স বানানো অপ্রয়োজনীয় ওভারহেড।
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://vnttqxrecxbpulyvrjyk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZudHRxeHJlY3hicHVseXZyanlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzMTUyODQsImV4cCI6MjEwMDg5MTI4NH0.NJ7xpbBfS1jiwjW8PFxqQ6abtRkTqdAIsgNTcjXz184";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);