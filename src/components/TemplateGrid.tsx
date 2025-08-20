import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import TemplateSketch from "./TemplateSketch";

const templates = [
  {
    id: 1,
    name: "Modern Professional",
    category: "Modern",
    color: "blue",
    preview: "/api/placeholder/300/400"
  },
  {
    id: 2,
    name: "Classic Executive",
    category: "Classic",
    color: "gray",
    preview: "/api/placeholder/300/400"
  },
  {
    id: 3,
    name: "Creative Designer",
    category: "Creative",
    color: "purple",
    preview: "/api/placeholder/300/400"
  },
  {
    id: 4,
    name: "Tech Minimalist",
    category: "Tech",
    color: "green",
    preview: "/api/placeholder/300/400"
  },
  {
    id: 5,
    name: "Corporate Standard",
    category: "Corporate",
    color: "navy",
    preview: "/api/placeholder/300/400"
  },
  {
    id: 6,
    name: "Academic Scholar",
    category: "Academic",
    color: "burgundy",
    preview: "/api/placeholder/300/400"
  }
];

const TemplateGrid = () => {
  return (
    <section className="py-20 bg-muted/30" id="templates">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Choose Your Perfect Template
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional templates designed by career experts. Pick one that matches your industry and personal style.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {templates.map((template) => (
            <Card key={template.id} className="group cursor-pointer hover:shadow-medium transition-smooth bg-gradient-card">
              <CardContent className="p-0">
                <div className="aspect-[3/4] bg-white rounded-t-lg overflow-hidden border">
                  <TemplateSketch templateId={template.id} />
                </div>
              </CardContent>
              <CardFooter className="p-6">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground">{template.name}</h3>
                    <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                      {template.category}
                    </span>
                  </div>
                  <Button 
                    className="w-full" 
                    variant="professional"
                    onClick={() => window.location.href = `/cv-builder?template=${template.id}&name=${encodeURIComponent(template.name)}`}
                  >
                    Use This Template
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="hero" size="lg">
            View All Templates
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TemplateGrid;