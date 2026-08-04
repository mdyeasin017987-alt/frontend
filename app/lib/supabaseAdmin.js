// app/lib/supabaseAdmin.js
//
// ⚠️ এই ফাইল শুধু API routes / server components-এ import করবে।
// কখনো "use client" কম্পোনেন্টে import করবে না — service_role key
// RLS (Row Level Security) বাইপাস করে, browser-এ leak হলে পুরো DB exposed।
//
// supabaseClient.js (anon key) ↔ browser-এর জন্য
// supabaseAdmin.js  (service_role key) ↔ শুধু server-এর জন্য

import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Missing Supabase admin env vars — check .env.local');
}

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    // server-side client-এ session persist করার দরকার নেই — প্রতিটা request stateless
    persistSession: false,
    autoRefreshToken: false,
  },
});