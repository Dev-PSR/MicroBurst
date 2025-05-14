import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { courseId, type, sourceUrl } = await req.json();

    // Here we would process the content based on type
    // For now, we'll create mock lessons
    const lessons = [];
    const totalLessons = type === 'youtube' ? 30 : 20;

    for (let i = 1; i <= totalLessons; i++) {
      lessons.push({
        course_id: courseId,
        order_number: i,
        title: `Lesson ${i}`,
        content: `Content for lesson ${i}`,
        scheduled_for: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
      });
    }

    const { error } = await supabaseClient
      .from('lessons')
      .insert(lessons);

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, totalLessons }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});