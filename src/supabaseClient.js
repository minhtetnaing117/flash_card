// src/supabaseClient.js

import { createClient } from "@supabase/supabase-js";

// Replace these with your real Supabase project details
const SUPABASE_URL = "https://khbphezkpgdrjpwlfdga.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_VFR3ISDEqCWM81RcSoBTmQ_Xi_hkgaG";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
