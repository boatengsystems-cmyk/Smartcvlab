import { Button } from "@/components/ui/button";
import { File, Book } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-background border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <File className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">SmartCvLab</h1>
            <p className="text-xs text-muted-foreground">Professional CVs & Cover Letters</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#templates" className="text-foreground hover:text-primary transition-smooth">Templates</a>
          <a href="#features" className="text-foreground hover:text-primary transition-smooth">Features</a>
          <a href="/cover-letter" className="text-foreground hover:text-primary transition-smooth">Cover Letter</a>
          <a href="#pricing" className="text-foreground hover:text-primary transition-smooth">Pricing</a>
        </nav>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">Sign In</Button>
          <Button variant="hero" size="sm">Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;