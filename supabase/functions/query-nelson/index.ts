
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
const mistralApiKey = Deno.env.get('MISTRAL_API_KEY') || '';

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
    console.log('Received query:', query);
    
    if (!query) {
      throw new Error('Query is required');
    }

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
      
    if (searchError) {
      console.error('Search error:', searchError);
      throw searchError;
    }
    
    console.log(`Found ${searchResults?.length || 0} relevant chunks`);
    
    // Get additional context from similar chunks
    const { data: similarChunks, error: similarError } = await supabase
      .from('nelson_chunks')
      .select('chunk_text')
      .limit(3);
      
    if (similarError) {
      console.error('Similar chunks error:', similarError);
      throw similarError;
    }
    
    // Combine all relevant context
    const context = [
      ...(searchResults?.map(r => r.chunk_text) || []),
      ...(similarChunks?.map(r => r.chunk_text) || [])
    ].join('\n\n');
    
    console.log('Making request to Mistral API...');
    
    // Use Mistral API to generate a comprehensive response
    const response = await fetch(`https://api.mistral.ai/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${mistralApiKey}`
      },
      body: JSON.stringify({
        model: "mistral-large-latest",
        messages: [
          {
            role: "system",
            content: `You are a pediatric knowledge assistant based on Nelson's Pediatrics. 
            Provide accurate, evidence-based answers based on the following context from Nelson's Pediatrics textbook.
            If you're not completely certain about something, acknowledge the limitations of your knowledge.
            Always cite specific sections or chapters when possible.
            
            Context:
            ${context}
            
            If the specific answer is not in the context:
            1. Say so explicitly
            2. Provide general, evidence-based information from your training
            3. Recommend consulting the full Nelson's Pediatrics text or a healthcare provider for specific medical advice
            
            Always cite "Nelson's Pediatrics" when using information from the context.`
          },
          {
            role: "user",
            content: query
          }
        ],
        temperature: 0.2,
        max_tokens: 1024,
        top_p: 0.8
      })
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Mistral API error:', errorData);
      throw new Error(`Mistral API error: ${response.status} ${errorData}`);
    }
    
    const data = await response.json();
    console.log('Mistral API response:', JSON.stringify(data));
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from Mistral API');
    }
    
    const generatedText = data.choices[0].message.content;
    
    return new Response(JSON.stringify({ 
      answer: generatedText,
      sourceChunks: searchResults
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in query-nelson function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'An unexpected error occurred',
      details: error.toString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
