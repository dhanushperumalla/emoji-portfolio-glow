import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, Award } from "lucide-react";

const Certifications = () => {
  const certifications = [
    {
      title: "Python Programming", 
      provider: "EDX",
      image: "/python.png",
      issued: "July 15, 2024",
      certificationNo: "d5ded6b498db4ef3a01f359c98bd964b",
      description: "CS50P: CS50's Introduction to Programming with Python, a course of study offered by HarvardX, an online learning initiative of Harvard University."
    },
    {
      title: "Prompt Engineering and Advanced ChatGPT", 
      provider: "EDX",
      image: "/Prompt.png",
      issued: "June 29, 2024",
      certificationNo: "b1d362a5cb0c414182665cfd90a1ae4a",
      description: "ChatGPT102: Prompt Engineering and Advanced ChatGPT, a course of study offered by edX, an online learning initiative of edX."
    },
    {
      title: "Certified System Administrator",
      provider: "ServiceNow",
      image: "/ServiceNow-CSA-Certificate.png",
      issued: "April 13, 2025",
      certificationNo: "27011068",
      description: "System administration and configuration expertise"
    },
    {
      title: "Certified Application Developer", 
      provider: "ServiceNow",
      image: "/ServiceNow-CAD-Certificate.png",
      issued: "July 15, 2025",
      certificationNo: "27318452",
      description: "Application development and customization skills"
    },
    
  ];

  return (
    <section id="certifications" className="py-16 bg-gradient-to-br from-secondary/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional certifications that validate my expertise and commitment to excellence
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <Card
              key={cert.certificationNo}
              className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/10 animate-slide-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Award className="h-6 w-6 text-primary" />
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {cert.provider}
                    </Badge>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                  {cert.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 text-sm">
                  {cert.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Issued: {cert.issued}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Certificate No: {cert.certificationNo}
                  </div>
                </div>
                
                <div className="mt-6 p-3 bg-muted/30 rounded-lg border border-border/50">
                  <img 
                    src={cert.image} 
                    alt={`${cert.title} Certificate`}
                    className="w-full h-auto rounded opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;