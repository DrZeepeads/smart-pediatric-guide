
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
const geminiApiKey = Deno.env.get('GEMINI_API_KEY') || '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    
    // Create a Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Get relevant chunks based on the query
    const { data: chunks, error } = await supabase
      .from('nelson_chunks')
      .select('chunk_text')
      .limit(5);
      
    if (error) throw error;
    
    // Combine chunks into context
    const context = chunks.map(chunk => chunk.chunk_text).join('\n\n');
    
    // Use Gemini API to generate response
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `You are a pediatric knowledge assistant based on Nelson's Pediatrics. 
                You will answer questions based on the following context from Nelson's Pediatrics textbook.
                
                Context:
                ${context}
                
                Question: ${query}
                
                If the answer is not in the context, say so and provide general information from your training.
                Always cite the source as Nelson's Pediatrics when answering from the context.`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 1024,
        }
      }),
    });
    
    const data = await response.json();
    let generatedText = "No response generated";
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      generatedText = data.candidates[0].content.parts[0].text;
    }
    
    return new Response(JSON.stringify({ answer: generatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in query-nelson function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
