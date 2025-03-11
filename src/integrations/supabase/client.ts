
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Make sure these values match your Supabase project
const SUPABASE_URL = "https://ajzqugeroxykwzadesiv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqenF1Z2Vyb3h5a3d6YWRlc2l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0MDkzNzAsImV4cCI6MjA1Njk4NTM3MH0.J7iAgSDP4wgQLXx5IlrpsfAJKn_XKfF-P3s1KXu0dps";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
