import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const VideoTutorial = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            How to Use Our CV Builder
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch our step-by-step tutorial to learn how to create a professional CV in minutes.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video bg-muted rounded-xl border border-border shadow-medium overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-card">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-4 shadow-glow">
                  <Play className="h-8 w-8 text-primary-foreground ml-1" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Video Tutorial Coming Soon
                </h3>
                <p className="text-muted-foreground mb-6">
                  We're preparing an easy-to-follow tutorial to help you get started.
                </p>
                <Button variant="outline">
                  Get Notified When Available
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoTutorial;