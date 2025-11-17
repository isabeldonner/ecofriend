import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://jodboomgyubhhlqrnswy.supabase.co";
const supabasePublishableKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvZGJvb21neXViaGhscXJuc3d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMzMzOTQsImV4cCI6MjA3ODcwOTM5NH0.c2r2o_mOyCZSdyti6XIFkNQvbx9SQpaP3LgJ51w9H2M";

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})