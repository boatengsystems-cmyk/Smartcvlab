import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Sparkles, Download, Loader2, Plus, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const CoverLetterBuilder = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [jobDetails, setJobDetails] = useState({
    jobTitle: "",
    companyName: "",
    jobDescription: "",
    additionalInfo: ""
  });

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: ""
  });

  const [education, setEducation] = useState([{
    degree: "",
    institution: "",
    startDate: "",
    endDate: "",
    description: ""
  }]);

  const [workExperience, setWorkExperience] = useState([{
    jobTitle: "",
    company: "",
    startDate: "",
    endDate: "",
    description: ""
  }]);

  const [generatedCoverLetter, setGeneratedCoverLetter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const addEducation = () => {
    setEducation([...education, {
      degree: "",
      institution: "",
      startDate: "",
      endDate: "",
      description: ""
    }]);
  };

  const removeEducation = (index: number) => {
    if (education.length > 1) {
      setEducation(education.filter((_, i) => i !== index));
    }
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const updated = education.map((edu, i) => 
      i === index ? { ...edu, [field]: value } : edu
    );
    setEducation(updated);
  };

  const addWorkExperience = () => {
    setWorkExperience([...workExperience, {
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      description: ""
    }]);
  };

  const removeWorkExperience = (index: number) => {
    if (workExperience.length > 1) {
      setWorkExperience(workExperience.filter((_, i) => i !== index));
    }
  };

  const updateWorkExperience = (index: number, field: string, value: string) => {
    const updated = workExperience.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    );
    setWorkExperience(updated);
  };

  const handleGenerateCoverLetter = async () => {
    if (!jobDetails.jobTitle || !jobDetails.companyName || !personalInfo.fullName) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the job title, company name, and your name.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-cover-letter', {
        body: {
          jobDetails,
          personalInfo,
          education,
          workExperience
        }
      });

      if (error) throw error;

      setGeneratedCoverLetter(data.coverLetter);
      toast({
        title: "Cover Letter Generated!",
        description: "Your AI-powered cover letter is ready for review."
      });
    } catch (error) {
      console.error('Error generating cover letter:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your cover letter. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedCoverLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${personalInfo.fullName.replace(/\s+/g, '_')}_Cover_Letter.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">AI Cover Letter Builder</h1>
              <p className="text-sm text-muted-foreground">Generate personalized cover letters with AI</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Personal Information */}
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={personalInfo.fullName}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={personalInfo.location}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="New York, NY"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="bg-gradient-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Education</CardTitle>
                  <Button onClick={addEducation} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Education
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium text-foreground">Education {index + 1}</h4>
                      {education.length > 1 && (
                        <Button 
                          onClick={() => removeEducation(index)} 
                          variant="ghost" 
                          size="sm"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Degree/Qualification</Label>
                        <Input
                          value={edu.degree}
                          onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                          placeholder="Bachelor of Science in Computer Science"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Institution</Label>
                        <Input
                          value={edu.institution}
                          onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                          placeholder="University of Technology"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input
                          value={edu.startDate}
                          onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                          placeholder="2018"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input
                          value={edu.endDate}
                          onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                          placeholder="2022"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description (Optional)</Label>
                      <Textarea
                        value={edu.description}
                        onChange={(e) => updateEducation(index, 'description', e.target.value)}
                        placeholder="Relevant coursework, achievements, GPA, etc."
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Work Experience */}
            <Card className="bg-gradient-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Work Experience</CardTitle>
                  <Button onClick={addWorkExperience} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Experience
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {workExperience.map((exp, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium text-foreground">Experience {index + 1}</h4>
                      {workExperience.length > 1 && (
                        <Button 
                          onClick={() => removeWorkExperience(index)} 
                          variant="ghost" 
                          size="sm"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Job Title</Label>
                        <Input
                          value={exp.jobTitle}
                          onChange={(e) => updateWorkExperience(index, 'jobTitle', e.target.value)}
                          placeholder="Software Developer"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Company</Label>
                        <Input
                          value={exp.company}
                          onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                          placeholder="Tech Solutions Inc."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input
                          value={exp.startDate}
                          onChange={(e) => updateWorkExperience(index, 'startDate', e.target.value)}
                          placeholder="January 2022"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input
                          value={exp.endDate}
                          onChange={(e) => updateWorkExperience(index, 'endDate', e.target.value)}
                          placeholder="Present"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={exp.description}
                        onChange={(e) => updateWorkExperience(index, 'description', e.target.value)}
                        placeholder="Key responsibilities, achievements, and skills developed..."
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Job Details */}
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg">Job Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={jobDetails.jobTitle}
                    onChange={(e) => setJobDetails(prev => ({ ...prev, jobTitle: e.target.value }))}
                    placeholder="Software Engineer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={jobDetails.companyName}
                    onChange={(e) => setJobDetails(prev => ({ ...prev, companyName: e.target.value }))}
                    placeholder="Tech Corp"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobDescription">Job Description</Label>
                  <Textarea
                    id="jobDescription"
                    value={jobDetails.jobDescription}
                    onChange={(e) => setJobDetails(prev => ({ ...prev, jobDescription: e.target.value }))}
                    placeholder="Paste the job description or key requirements here..."
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                  <Textarea
                    id="additionalInfo"
                    value={jobDetails.additionalInfo}
                    onChange={(e) => setJobDetails(prev => ({ ...prev, additionalInfo: e.target.value }))}
                    placeholder="Any specific points you want to highlight or mention..."
                    rows={3}
                  />
                </div>
                <Button
                  onClick={handleGenerateCoverLetter}
                  disabled={isGenerating}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Cover Letter
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Generated Cover Letter</CardTitle>
                {generatedCoverLetter && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setIsEditing(!isEditing)}
                      variant="outline"
                      size="sm"
                    >
                      {isEditing ? "Preview" : "Edit"}
                    </Button>
                    <Button
                      onClick={handleDownload}
                      variant="outline"
                      size="sm"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="h-[600px] overflow-auto">
              {!generatedCoverLetter ? (
                <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                  <div>
                    <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Your AI-generated cover letter will appear here.</p>
                    <p className="text-sm mt-2">Fill in the details and click "Generate Cover Letter" to start.</p>
                  </div>
                </div>
              ) : isEditing ? (
                <Textarea
                  value={generatedCoverLetter}
                  onChange={(e) => setGeneratedCoverLetter(e.target.value)}
                  className="w-full h-full resize-none"
                  placeholder="Edit your cover letter here..."
                />
              ) : (
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {generatedCoverLetter}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterBuilder;