import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,                  // 👈 NOT NEXT_PUBLIC_
  process.env.SUPABASE_SERVICE_ROLE_KEY!      // 👈 This must be secret and correct
);

export default supabaseAdmin;
