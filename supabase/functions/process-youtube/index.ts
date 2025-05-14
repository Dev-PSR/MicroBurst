import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { url } = await req.json();
    
    // Extract video IDs from playlist URL
    const playlistId = new URL(url).searchParams.get("list");
    if (!playlistId) {
      throw new Error("Invalid YouTube playlist URL");
    }

    // Here we would use YouTube API to get playlist items
    // For demo, we'll create mock lessons
    const lessons = Array.from({ length: 30 }, (_, i) => ({
      title: `Lesson ${i + 1}`,
      content: `Content for lesson ${i + 1}`,
      duration: 300, // 5 minutes in seconds
    }));

    return new Response(
      JSON.stringify({ lessons }),
      { 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  }
});