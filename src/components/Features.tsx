import { Card, CardContent } from "@/components/ui/card";
import { Book, File } from "lucide-react";

const features = [
  {
    icon: File,
    title: "Professional Templates",
    description: "20+ ATS-friendly templates designed by career experts and hiring managers."
  },
  {
    icon: Book,
    title: "AI Cover Letters", 
    description: "Generate personalized cover letters using AI based on your resume and job description."
  },
  {
    icon: File,
    title: "Multiple Formats",
    description: "Download your resume in PDF and DOCX formats for maximum compatibility."
  },
  {
    icon: Book,
    title: "Easy Editing",
    description: "Intuitive form-based editing with real-time preview and instant updates."
  },
  {
    icon: File,
    title: "ATS Optimized",
    description: "All templates are optimized for Applicant Tracking Systems used by employers."
  },
  {
    icon: Book,
    title: "Expert Tips",
    description: "Built-in guidance and tips from career counselors and industry professionals."
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-background" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Everything You Need to Get Hired
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help you create professional documents that get results.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center group hover:shadow-medium transition-smooth bg-gradient-card">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-lg mb-6 group-hover:shadow-glow transition-smooth">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;