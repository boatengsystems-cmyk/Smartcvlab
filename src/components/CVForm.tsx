import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from "lucide-react";

interface CVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    nationality: string;
    dateOfBirth: string;
    linkedin: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    graduationDate: string;
    description?: string;
  }>;
  skills: string[];
  languages: Array<{
    id: string;
    language: string;
    proficiency: string;
  }>;
  customSections: Array<{
    id: string;
    title: string;
    content: string;
  }>;
}

interface CVFormProps {
  data: CVData;
  onChange: (data: CVData) => void;
}

const CVForm = ({ data, onChange }: CVFormProps) => {
  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: ""
    };
    onChange({
      ...data,
      experience: [...data.experience, newExperience]
    });
  };

  const updateExperience = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      experience: data.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter(exp => exp.id !== id)
    });
  };

  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      graduationDate: ""
    };
    onChange({
      ...data,
      education: [...data.education, newEducation]
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      education: data.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter(edu => edu.id !== id)
    });
  };

  const addCustomSection = () => {
    const newSection = {
      id: Date.now().toString(),
      title: "",
      content: ""
    };
    onChange({
      ...data,
      customSections: [...(data.customSections || []), newSection]
    });
  };

  const updateCustomSection = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      customSections: (data.customSections || []).map(section => 
        section.id === id ? { ...section, [field]: value } : section
      )
    });
  };

  const removeCustomSection = (id: string) => {
    onChange({
      ...data,
      customSections: (data.customSections || []).filter(section => section.id !== id)
    });
  };

  const addSkill = () => {
    const newSkill = prompt("Enter a skill:");
    if (newSkill && newSkill.trim()) {
      onChange({
        ...data,
        skills: [...data.skills, newSkill.trim()]
      });
    }
  };

  const removeSkill = (index: number) => {
    onChange({
      ...data,
      skills: data.skills.filter((_, i) => i !== index)
    });
  };

  const addLanguage = () => {
    const newLanguage = {
      id: Date.now().toString(),
      language: "",
      proficiency: ""
    };
    onChange({
      ...data,
      languages: [...data.languages, newLanguage]
    });
  };

  const updateLanguage = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      languages: data.languages.map(lang => 
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    });
  };

  const removeLanguage = (id: string) => {
    onChange({
      ...data,
      languages: data.languages.filter(lang => lang.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={data.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.personalInfo.email}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={data.personalInfo.phone}
                onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={data.personalInfo.location}
                onChange={(e) => updatePersonalInfo("location", e.target.value)}
                placeholder="New York, NY"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Input
                id="nationality"
                value={data.personalInfo.nationality}
                onChange={(e) => updatePersonalInfo("nationality", e.target.value)}
                placeholder="American"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={data.personalInfo.dateOfBirth}
                onChange={(e) => updatePersonalInfo("dateOfBirth", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={data.personalInfo.linkedin}
                onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                placeholder="linkedin.com/in/johndoe"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Professional Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              value={data.summary}
              onChange={(e) => onChange({ ...data, summary: e.target.value })}
              placeholder="A brief overview of your professional background and key achievements..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Work Experience */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Work Experience</CardTitle>
            <Button onClick={addExperience} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id} className="border border-border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                    <div className="space-y-2">
                      <Label>Job Title</Label>
                      <Input
                        value={exp.jobTitle}
                        onChange={(e) => updateExperience(exp.id, "jobTitle", e.target.value)}
                        placeholder="Software Engineer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                        placeholder="Tech Corp"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                        placeholder="San Francisco, CA"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input
                          type="month"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input
                          type="month"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                          placeholder="Present"
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => removeExperience(exp.id)}
                    size="sm"
                    variant="ghost"
                    className="ml-2 text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Job Description</Label>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                    placeholder="Describe your responsibilities and achievements..."
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Education</CardTitle>
            <Button onClick={addEducation} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="border border-border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                    <div className="space-y-2">
                      <Label>Degree</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                        placeholder="Bachelor of Science in Computer Science"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Institution</Label>
                      <Input
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                        placeholder="Stanford University"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={edu.location}
                        onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                        placeholder="Stanford, CA"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input
                          type="month"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Graduation Date</Label>
                        <Input
                          type="month"
                          value={edu.graduationDate}
                          onChange={(e) => updateEducation(edu.id, "graduationDate", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => removeEducation(edu.id)}
                    size="sm"
                    variant="ghost"
                    className="ml-2 text-destructive hover:text-destructive"
                  >
                   <X className="h-4 w-4" />
                   </Button>
                 </div>
                 <div className="space-y-2">
                   <Label>Description (Optional)</Label>
                   <Textarea
                     value={edu.description || ""}
                     onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                     placeholder="Additional details about achievements, projects, or relevant coursework..."
                     rows={2}
                   />
                 </div>
                </div>
             ))}
           </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Skills</CardTitle>
            <Button onClick={addSkill} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-1 bg-secondary px-3 py-1 rounded-full">
                <span className="text-sm">{skill}</span>
                <Button
                  onClick={() => removeSkill(index)}
                  size="sm"
                  variant="ghost"
                  className="h-auto p-1 text-destructive hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
          {data.skills.length === 0 && (
            <p className="text-muted-foreground text-sm">No skills added yet. Click "Add Skill" to get started.</p>
          )}
        </CardContent>
      </Card>

      {/* Languages */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Languages</CardTitle>
            <Button onClick={addLanguage} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Language
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.languages.map((lang) => (
              <div key={lang.id} className="border border-border rounded-lg p-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Input
                        value={lang.language}
                        onChange={(e) => updateLanguage(lang.id, "language", e.target.value)}
                        placeholder="e.g., Spanish, French, Mandarin"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Proficiency Level</Label>
                      <Input
                        value={lang.proficiency}
                        onChange={(e) => updateLanguage(lang.id, "proficiency", e.target.value)}
                        placeholder="e.g., Native, Fluent, Conversational, Basic"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={() => removeLanguage(lang.id)}
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {data.languages.length === 0 && (
            <p className="text-muted-foreground text-sm">No languages added yet. Click "Add Language" to get started.</p>
          )}
        </CardContent>
      </Card>

      {/* Custom Sections */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Custom Sections</CardTitle>
            <Button onClick={addCustomSection} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Section
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(data.customSections || []).map((section) => (
              <div key={section.id} className="border border-border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <Label>Section Title</Label>
                      <Input
                        value={section.title}
                        onChange={(e) => updateCustomSection(section.id, "title", e.target.value)}
                        placeholder="e.g., Certifications, Awards, Volunteer Work"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Content</Label>
                      <Textarea
                        value={section.content}
                        onChange={(e) => updateCustomSection(section.id, "content", e.target.value)}
                        placeholder="Add any additional information you'd like to include..."
                        rows={4}
                      />
                    </div>
                  </div>
                  <Button
                    onClick={() => removeCustomSection(section.id)}
                    size="sm"
                    variant="ghost"
                    className="ml-2 text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CVForm;