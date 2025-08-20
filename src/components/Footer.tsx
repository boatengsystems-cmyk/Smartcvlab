import { File, Facebook, Twitter, Youtube, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-primary rounded-lg">
                <File className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold">SmartCvLab</h3>
                <p className="text-xs text-background/70">Professional CVs & Cover Letters</p>
              </div>
            </div>
            <p className="text-background/80 leading-relaxed max-w-md">
              Create professional resumes and cover letters that get you hired. 
              Trusted by thousands of job seekers worldwide.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-background/80">
              <li><a href="#" className="hover:text-background transition-smooth">Templates</a></li>
              <li><a href="#" className="hover:text-background transition-smooth">Cover Letters</a></li>
              <li><a href="#" className="hover:text-background transition-smooth">Resume Examples</a></li>
              <li><a href="#" className="hover:text-background transition-smooth">Career Tips</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-background/80">
              <li><a href="#" className="hover:text-background transition-smooth">Help Center</a></li>
              <li><a href="tel:0702340759" className="hover:text-background transition-smooth">Contact: 0702340759</a></li>
              <li><a href="#" className="hover:text-background transition-smooth">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-background transition-smooth">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/60">&copy; 2024 SmartCvLab. All rights reserved.</p>
            
            <div className="flex items-center gap-4">
              <span className="text-background/60 text-sm">Follow us:</span>
              <div className="flex items-center gap-3">
                <a href="https://www.facebook.com/profile.php?id=100010531306648" target="_blank" rel="noopener noreferrer" className="p-2 bg-background/10 rounded-full hover:bg-background/20 transition-smooth">
                  <Facebook className="h-4 w-4 text-background" />
                </a>
                <a href="#" className="p-2 bg-background/10 rounded-full hover:bg-background/20 transition-smooth">
                  <Twitter className="h-4 w-4 text-background" />
                </a>
                <a href="https://www.youtube.com/@365boateng" target="_blank" rel="noopener noreferrer" className="p-2 bg-background/10 rounded-full hover:bg-background/20 transition-smooth">
                  <Youtube className="h-4 w-4 text-background" />
                </a>
                <a href="#" className="p-2 bg-background/10 rounded-full hover:bg-background/20 transition-smooth">
                  <Instagram className="h-4 w-4 text-background" />
                </a>
                <a href="https://www.tiktok.com/@litboiboateng?_t=ZM-8y1zViyeUQ2&_r=1" target="_blank" rel="noopener noreferrer" className="p-2 bg-background/10 rounded-full hover:bg-background/20 transition-smooth text-xs">
                  TT
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;