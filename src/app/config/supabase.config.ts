// src/app/config/supabase.config.ts
import { createClient } from '@supabase/supabase-js'

// Ihre Supabase-URL (von Ihrem Projekt)
const supabaseUrl = 'https://aaudhruoibyufouoqlaj.supabase.co'

// Ihr Supabase anon/public Schlüssel (NICHT das Datenbankpasswort)
const supabaseKey = '[130824]'

// Erstellen und exportieren des Supabase-Clients
export const supabase = createClient(supabaseUrl, supabaseKey)