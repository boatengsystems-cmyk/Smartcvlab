import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TemplateGrid from "@/components/TemplateGrid";
import Features from "@/components/Features";
import VideoTutorial from "@/components/VideoTutorial";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TemplateGrid />
      <Features />
      <VideoTutorial />
      <Footer />
    </div>
  );
};

export default Index;
