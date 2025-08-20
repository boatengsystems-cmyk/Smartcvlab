import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="py-20 bg-gradient-hero text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Create Your Perfect
                <span className="block bg-gradient-to-r from-white to-primary-light bg-clip-text text-transparent">
                  Resume & Cover Letter
                </span>
              </h1>
              <p className="text-xl text-primary-foreground/80 leading-relaxed">
                Professional templates, AI-powered cover letters, and instant downloads. 
                Build your career documents in minutes, not hours.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" className="bg-white text-primary hover:bg-white/90">
                <a href="#templates">Start Building Now</a>
              </Button>
              <Button variant="professional" size="xl" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                <a href="/cover-letter">AI Cover Letter</a>
              </Button>
            </div>
            
            <div className="flex items-center gap-8 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Free Templates</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>AI Cover Letters</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>PDF & DOCX Export</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 rounded-2xl transform rotate-3"></div>
            <img 
              src={heroImage} 
              alt="Professional resume builder interface"
              className="w-full h-auto rounded-2xl shadow-strong"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;