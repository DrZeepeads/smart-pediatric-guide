
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
    
    // First, search for relevant chunks
    const { data: searchResults, error: searchError } = await supabase
      .from('nelson_chunks')
      .select('chunk_text')
      .textSearch('chunk_text', query, {
        config: 'english',
        type: 'websearch'
      })
      .limit(5);
      
    if (searchError) throw searchError;
    
    // Get additional context from similar chunks
    const { data: similarChunks, error: similarError } = await supabase
      .from('nelson_chunks')
      .select('chunk_text')
      .limit(3);
      
    if (similarError) throw similarError;
    
    // Combine all relevant context
    const context = [
      ...(searchResults?.map(r => r.chunk_text) || []),
      ...(similarChunks?.map(r => r.chunk_text) || [])
    ].join('\n\n');
    
    // Use Gemini API to generate a comprehensive response
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: "system",
            parts: [
              {
                text: `You are a pediatric knowledge assistant based on Nelson's Pediatrics. 
                Provide accurate, evidence-based answers based on the following context from Nelson's Pediatrics textbook.
                If you're not completely certain about something, acknowledge the limitations of your knowledge.
                Always cite specific sections or chapters when possible.
                
                Context:
                ${context}
                
                Question: ${query}
                
                If the specific answer is not in the context:
                1. Say so explicitly
                2. Provide general, evidence-based information from your training
                3. Recommend consulting the full Nelson's Pediatrics text or a healthcare provider for specific medical advice
                
                Always cite "Nelson's Pediatrics" when using information from the context.`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 1024,
          topP: 0.8,
          topK: 40
        }
      }),
    });
    
    const data = await response.json();
    let generatedText = "No response generated";
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      generatedText = data.candidates[0].content.parts[0].text;
    }
    
    return new Response(JSON.stringify({ 
      answer: generatedText,
      sourceChunks: searchResults
    }), {
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
