import { serve } from 'https://deno.land/std/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js'

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  await supabase.from('users').update({ points: 0 }).neq('user_id', '')

  const { error } = await supabase.rpc('calculate_points')
  if (error) return new Response(JSON.stringify({ error }), { status: 500 })

  return new Response(JSON.stringify({ status: 'ok' }), { status: 200 })
})
