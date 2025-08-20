import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CVUploadProps {
  onCVParsed: (cvData: any) => void;
}

const CVUpload = ({ onCVParsed }: CVUploadProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const handleProcessCV = async () => {
    if (!uploadedFile) return;

    setIsProcessing(true);
    try {
      // Convert file to base64
      const fileBase64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = (reader.result as string).split(',')[1];
          resolve(base64);
        };
        reader.readAsDataURL(uploadedFile);
      });

      const { data, error } = await supabase.functions.invoke('process-cv', {
        body: {
          fileName: uploadedFile.name,
          fileContent: fileBase64,
          fileType: uploadedFile.type
        }
      });

      if (error) throw error;

      onCVParsed(data.cvData);
      toast({
        title: "CV Processed Successfully!",
        description: "Your CV has been analyzed and information extracted."
      });
    } catch (error) {
      console.error('Error processing CV:', error);
      toast({
        title: "Processing Failed",
        description: "There was an error processing your CV. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  return (
    <Card className="bg-gradient-card">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Your CV
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!uploadedFile ? (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50 hover:bg-primary/5'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            {isDragActive ? (
              <p className="text-primary">Drop your CV here...</p>
            ) : (
              <div>
                <p className="text-foreground font-medium">
                  Drag & drop your CV here, or click to select
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Supports PDF, DOC, DOCX, and TXT files (max 10MB)
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg border">
              <FileText className="h-8 w-8 text-primary" />
              <div className="flex-1">
                <p className="font-medium text-foreground">{uploadedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                onClick={removeFile}
                variant="ghost"
                size="sm"
                disabled={isProcessing}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <Button
              onClick={handleProcessCV}
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing CV...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  Process CV & Extract Info
                </>
              )}
            </Button>
          </div>
        )}
        
        <p className="text-xs text-muted-foreground">
          Your CV will be analyzed to extract relevant information for personalized cover letter generation.
        </p>
      </CardContent>
    </Card>
  );
};

export default CVUpload;