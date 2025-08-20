import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { cvData } = await req.json();

    if (!OPENROUTER_API_KEY) {
      throw new Error('OpenRouter API key not configured');
    }

    console.log('Enhancing CV via OpenRouter (DeepSeek R1 Distill)...');

    // Create enhancement prompts for each section
    const enhancedPersonalInfo = cvData.personalInfo;
    
    // Enhance summary
    const enhancedSummary = await enhanceText(cvData.summary, 'professional summary');
    
    // Enhance experience descriptions
    const enhancedExperience = await Promise.all(
      cvData.experience.map(async (exp: any) => ({
        ...exp,
        description: exp.description ? await enhanceText(exp.description, 'job description') : exp.description
      }))
    );

    // Enhance custom sections
    const enhancedCustomSections = await Promise.all(
      (cvData.customSections || []).map(async (section: any) => ({
        ...section,
        content: section.content ? await enhanceText(section.content, 'section content') : section.content
      }))
    );

    const enhancedCV = {
      ...cvData,
      personalInfo: enhancedPersonalInfo,
      summary: enhancedSummary,
      experience: enhancedExperience,
      education: cvData.education, // Education typically doesn't need text enhancement
      skills: cvData.skills,
      languages: cvData.languages,
      customSections: enhancedCustomSections
    };

    console.log('CV enhancement completed successfully');

    return new Response(JSON.stringify({ enhancedCV }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in enhance-cv function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function enhanceText(text: string, context: string): Promise<string> {
  if (!text || text.trim().length === 0) return text;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1-distill-llama-70b',
        messages: [
          {
            role: 'system',
            content: `You are a professional CV enhancement specialist. Improve grammar, punctuation, clarity, and professional tone while preserving meaning and key info.

1. Correct grammar and punctuation
2. Improve sentence structure and flow
3. Use professional language and consistent tone
4. Keep similar length, do not add new facts

Return ONLY the enhanced text with no extra commentary or formatting.`,
          },
          {
            role: 'user',
            content: `Please enhance this ${context} for a professional CV:\n\n${text}`,
          },
        ],
        temperature: 0.3,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const enhancedText = data.choices?.[0]?.message?.content?.trim();
    
    if (!enhancedText) {
      console.warn(`No enhancement received for ${context}, using original text`);
      return text;
    }

    console.log(`Enhanced ${context}: ${text.length} -> ${enhancedText.length} characters`);
    return enhancedText;

  } catch (error) {
    console.error(`Error enhancing ${context}:`, error);
    return text; // Return original text if enhancement fails
  }
}
