import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Sparkles, Download, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import CVForm from "@/components/CVForm";
import CVPreview from "@/components/CVPreview";
import { useReactToPrint } from "react-to-print";

const CVBuilder = () => {
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get("template") || "1";
  const templateName = searchParams.get("name") || "Modern Professional";

  const [cvData, setCvData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      nationality: "",
      dateOfBirth: "",
      linkedin: ""
    },
    summary: "",
    experience: [] as any[],
    education: [] as any[],
    skills: [] as string[],
    languages: [] as any[],
    customSections: [] as any[]
  });

  const [enhancedData, setEnhancedData] = useState<typeof cvData | null>(null);
  const [viewMode, setViewMode] = useState<"original" | "enhanced">("original");
  const [enhanceEnabled, setEnhanceEnabled] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const { toast } = useToast();

  // Reset enhanced preview when user edits original content
  useEffect(() => {
    setEnhancedData(null);
    if (viewMode === "enhanced") setViewMode("original");
  }, [cvData]);

  const previewRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => previewRef.current,
    documentTitle: `${cvData.personalInfo.fullName || "CV"}_CV`,
  });

  const enhanceCV = async () => {
    if (!enhanceEnabled) return cvData;
    setIsEnhancing(true);
    try {
      const { data: enhancedDataResp, error } = await supabase.functions.invoke('enhance-cv', {
        body: { cvData }
      });
      if (error) throw error;
      const enhanced = enhancedDataResp.enhancedCV;
      setEnhancedData(enhanced);
      toast({
        title: "CV Enhanced!",
        description: "Preview the enhanced version or export it.",
      });
      return enhanced;
    } catch (error: any) {
      console.error('Enhancement error:', error);
      toast({
        title: "Enhancement Failed",
        description: error?.message || "Could not enhance CV. Using original.",
        variant: "destructive",
      });
      return cvData;
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleDownload = async () => {
    const needsEnhancement = enhanceEnabled && viewMode === 'enhanced' && !enhancedData;
    const dataToDownload = needsEnhancement ? await enhanceCV() : (viewMode === 'enhanced' ? enhancedData || cvData : cvData);

    try {
      // Ensure preview shows the chosen mode before printing
      if (viewMode === 'enhanced' && enhancedData == null && enhanceEnabled) {
        setEnhancedData(dataToDownload as typeof cvData);
      }
      await handlePrint();

      toast({
        title: 'PDF Ready',
        description: `Your ${viewMode === 'enhanced' ? 'enhanced ' : ''}CV is ready in the print dialog.`,
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: "Could not export CV. Please try again.",
        variant: "destructive",
      });
    }
  };

  const generateTextCV = (data: typeof cvData) => {
    let content = `${data.personalInfo.fullName}\n`;
    content += `${data.personalInfo.email} | ${data.personalInfo.phone}\n`;
    if (data.personalInfo.location) content += `${data.personalInfo.location}\n`;
    if (data.personalInfo.linkedin) content += `${data.personalInfo.linkedin}\n`;
    content += '\n';
    
    if (data.summary) {
      content += 'PROFESSIONAL SUMMARY\n';
      content += `${data.summary}\n\n`;
    }
    
    if (data.experience.length > 0) {
      content += 'WORK EXPERIENCE\n';
      data.experience.forEach(exp => {
        content += `${exp.jobTitle} at ${exp.company}\n`;
        content += `${exp.startDate} - ${exp.endDate || 'Present'}\n`;
        if (exp.description) content += `${exp.description}\n`;
        content += '\n';
      });
    }
    
    if (data.education.length > 0) {
      content += 'EDUCATION\n';
      data.education.forEach(edu => {
        content += `${edu.degree}\n`;
        content += `${edu.institution}\n`;
        if (edu.graduationDate) content += `${edu.graduationDate}\n`;
        content += '\n';
      });
    }
    
    if (data.skills.length > 0) {
      content += 'SKILLS\n';
      content += `${data.skills.join(', ')}\n\n`;
    }
    
    return content;
  };

  const currentData = viewMode === 'enhanced' ? (enhancedData || cvData) : cvData;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border shadow-soft no-print">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Templates
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">CV Builder</h1>
              <p className="text-sm text-muted-foreground">Template: {templateName}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
          {/* Form Section */}
          <Card className="bg-gradient-card no-print">
            <CardContent className="p-6 h-full overflow-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Fill in Your Details
              </h2>
              <CVForm data={cvData} onChange={setCvData} />
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card className="bg-gradient-card">
            <CardContent className="p-6 h-full overflow-auto">
              <div className="flex items-center justify-between mb-6 no-print">
                <h2 className="text-2xl font-bold text-foreground">
                  Preview
                </h2>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center flex-wrap gap-3">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="enhance-mode" 
                        checked={enhanceEnabled}
                        onCheckedChange={setEnhanceEnabled}
                      />
                      <Label htmlFor="enhance-mode" className="flex items-center gap-1 text-sm">
                        <Sparkles className="h-4 w-4" />
                        Enhance with AI
                      </Label>
                    </div>
                    {enhanceEnabled && (
                      <div className="flex items-center gap-1">
                        <Button 
                          variant={viewMode === 'original' ? 'secondary' : 'outline'} 
                          size="sm"
                          onClick={() => setViewMode('original')}
                          disabled={isEnhancing}
                        >
                          Original
                        </Button>
                        <Button 
                          variant={viewMode === 'enhanced' ? 'secondary' : 'outline'} 
                          size="sm"
                          onClick={async () => {
                            if (!enhancedData) await enhanceCV();
                            setViewMode('enhanced');
                          }}
                          disabled={isEnhancing}
                        >
                          {isEnhancing ? (
                            <span className="inline-flex items-center">
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Enhancing...
                            </span>
                          ) : (
                            'Enhanced'
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={async () => {
                        if (enhanceEnabled && viewMode === 'enhanced' && !enhancedData) {
                          await enhanceCV();
                        }
                        handleDownload();
                      }}
                      disabled={isEnhancing}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                  </div>
                </div>
              </div>
              {isEnhancing && (
                <div className="no-print mb-4">
                  <div className="h-1 w-full bg-muted rounded overflow-hidden">
                    <div className="h-full w-1/3 bg-primary/50 animate-pulse"></div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">Enhancing your CV...</p>
                </div>
              )}
              <div ref={previewRef} className="cv-preview print-area">
                <CVPreview data={currentData as any} templateId={templateId} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CVBuilder;
