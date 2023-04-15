import { createClient } from "@supabase/supabase-js";

const URL = process.env.SUPABASE_URL as string;
const PUBLIC_ANON_KEY = process.env.SUPABASE_ANON_KEY as string;

const supabase = createClient(URL, PUBLIC_ANON_KEY);

export function dbSupabase() {
  return supabase;
}
