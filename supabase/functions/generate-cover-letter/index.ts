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
    const { jobDetails, personalInfo, education, workExperience } = await req.json();

    // Debug logging to see what data we're receiving
    console.log('Request data received:');
    console.log('- jobDetails:', JSON.stringify(jobDetails, null, 2));
    console.log('- personalInfo:', JSON.stringify(personalInfo, null, 2));
    console.log('- education:', JSON.stringify(education, null, 2));
    console.log('- workExperience:', JSON.stringify(workExperience, null, 2));

    if (!jobDetails || !personalInfo) {
      throw new Error('Job details and personal information are required');
    }

    const systemPrompt = `You are a professional cover letter writer with expertise in creating compelling, personalized cover letters. Your task is to generate a professional cover letter that:

1. Is personalized and specific to the job and company
2. Highlights relevant experience and skills
3. Shows enthusiasm for the role and company
4. Follows proper business letter format
5. Is concise yet impactful (typically 3-4 paragraphs)
6. Uses professional but engaging language
7. Includes a strong opening and closing

Format the cover letter as a complete business letter with proper formatting.`;

    const userPrompt = `Please generate a professional cover letter with the following information:

PERSONAL INFORMATION:
- Name: ${personalInfo.fullName}
- Email: ${personalInfo.email}
- Phone: ${personalInfo.phone}
- Location: ${personalInfo.location}

JOB INFORMATION:
- Job Title: ${jobDetails.jobTitle}
- Company Name: ${jobDetails.companyName}
- Job Description: ${jobDetails.jobDescription}
${jobDetails.additionalInfo ? `- Additional Information: ${jobDetails.additionalInfo}` : ''}

${(education && education.length > 0 && education.some((edu: any) => edu.degree || edu.institution)) || (workExperience && workExperience.length > 0 && workExperience.some((exp: any) => exp.jobTitle || exp.company)) ? `
BACKGROUND INFORMATION:

${education && education.length > 0 && education.some((edu: any) => edu.degree || edu.institution) ? `
EDUCATION:
${education.filter((edu: any) => edu.degree || edu.institution).map((edu: any) => `• ${edu.degree || 'Degree'} from ${edu.institution || 'Institution'} ${edu.startDate && edu.endDate ? `(${edu.startDate} - ${edu.endDate})` : ''}${edu.description ? `\n  ${edu.description}` : ''}`).join('\n')}` : ''}

${workExperience && workExperience.length > 0 && workExperience.some((exp: any) => exp.jobTitle || exp.company) ? `
WORK EXPERIENCE:
${workExperience.filter((exp: any) => exp.jobTitle || exp.company).map((exp: any) => `• ${exp.jobTitle || 'Position'} at ${exp.company || 'Company'} ${exp.startDate && exp.endDate ? `(${exp.startDate} - ${exp.endDate})` : ''}${exp.description ? `\n  ${exp.description}` : ''}`).join('\n')}` : ''}

IMPORTANT: Use this background information extensively to create a highly personalized cover letter. Specifically mention relevant experience, education, and achievements that directly align with the job requirements. Reference specific companies, roles, educational qualifications, and accomplishments to demonstrate your qualifications for this position.` : 'Note: No background information provided. Focus on the personal information and job details to create the cover letter.'}

Generate a compelling cover letter that connects the candidate's background to this specific role and company. Make it professional, engaging, and tailored to the position.`;

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
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to generate cover letter');
    }

    const data = await response.json();
    const coverLetter = data.choices[0].message.content;

    console.log('Cover letter generated successfully');

    return new Response(JSON.stringify({ coverLetter }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-cover-letter function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});