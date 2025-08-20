import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY');

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
    const { fileName, fileContent, fileType } = await req.json();

    if (!fileName || !fileContent) {
      throw new Error('File name and content are required');
    }

    // Decode base64 file content
    const fileBuffer = Uint8Array.from(atob(fileContent), c => c.charCodeAt(0));
    
    let extractedText = '';

    // Simple text extraction for different file types
    if (fileType === 'text/plain') {
      extractedText = new TextDecoder().decode(fileBuffer);
    } else if (fileType === 'application/pdf') {
      // For PDF files, we'll use a simplified approach
      // In a production environment, you'd want to use a proper PDF parsing library
      const textContent = new TextDecoder().decode(fileBuffer);
      // Extract readable text from PDF (this is a simplified approach)
      extractedText = textContent.replace(/[^\x20-\x7E\n\r]/g, ' ').replace(/\s+/g, ' ').trim();
    } else if (fileType.includes('word') || fileType.includes('document')) {
      // For Word documents, extract text content
      const textContent = new TextDecoder().decode(fileBuffer);
      extractedText = textContent.replace(/[^\x20-\x7E\n\r]/g, ' ').replace(/\s+/g, ' ').trim();
    }

    if (!extractedText || extractedText.length < 50) {
      throw new Error('Could not extract meaningful text from the CV. Please try uploading a different format or a text-based CV.');
    }

    // Use AI to analyze and structure the CV content
    const systemPrompt = `You are a CV analysis expert. Extract and structure key information from the provided CV text. Return the information in a JSON format with the following structure:

{
  "personalInfo": {
    "fullName": "extracted name",
    "email": "extracted email",
    "phone": "extracted phone",
    "location": "extracted location/address"
  },
  "professionalSummary": "brief professional summary",
  "workExperience": [
    {
      "jobTitle": "position title",
      "company": "company name",
      "duration": "employment period",
      "achievements": ["key achievement 1", "key achievement 2"]
    }
  ],
  "skills": ["skill1", "skill2", "skill3"],
  "education": [
    {
      "degree": "degree name",
      "institution": "school/university",
      "year": "graduation year"
    }
  ],
  "keyStrengths": ["strength1", "strength2", "strength3"]
}

Extract as much relevant information as possible. If certain fields are not available in the CV, set them as empty strings or empty arrays. Focus on professional experience, skills, and achievements that would be valuable for cover letter generation.`;

    const userPrompt = `Please analyze this CV and extract the key information in the specified JSON format:

CV CONTENT:
${extractedText}

Return only valid JSON without any additional text or formatting.`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://lovable.dev',
        'X-Title': 'CV Builder AI',
      },
      body: JSON.stringify({
        model: 'tngtech/deepseek-r1t2-chimera:free',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to process CV with AI');
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Parse the JSON response
    let cvData;
    try {
      cvData = JSON.parse(aiResponse);
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', aiResponse);
      throw new Error('Failed to structure CV data. Please try again with a clearer CV format.');
    }

    console.log('CV processed successfully for:', fileName);

    return new Response(JSON.stringify({ cvData }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in process-cv function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});