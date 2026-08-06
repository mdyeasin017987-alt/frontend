// app/lib/supabaseClient.js
// একটাই client instance সারা অ্যাপে ব্যবহার হবে (singleton pattern) —
// প্রতি রিকোয়েস্টে নতুন ইনস্ট্যান্স বানানো অপ্রয়োজনীয় ওভারহেড।
//
// এই client শুধু "use client" কম্পোনেন্ট থেকে ব্যবহার হবে (browser-side)।
// anon key browser bundle-এ visible থাকা নিরাপদ কারণ Supabase RLS
// policy দিয়ে row-level access control করে — কিন্তু hardcode না করে
// env var থেকে নেওয়া ভালো practice, dev/prod project সহজে সুইচ করতে।
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = "https://vnttqxrecxbpulyvrjyk.supabase.co";
const supabaseAnonKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZudHRxeHJlY3hicHVseXZyanlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzMTUyODQsImV4cCI6MjEwMDg5MTI4NH0.NJ7xpbBfS1jiwjW8PFxqQ6abtRkTqdAIsgNTcjXz184";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);