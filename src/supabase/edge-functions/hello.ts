
// Supabase Edge Function example
// This would be deployed to Supabase Edge Functions

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const { method } = req

  if (method === 'GET') {
    return new Response(
      JSON.stringify({ 
        status: 'ok',
        message: 'Supabase Edge Function is running!',
        timestamp: new Date().toISOString()
      }),
      {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      },
    )
  }

  return new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    { 
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    }
  )
})
