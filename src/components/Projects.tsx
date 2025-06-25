import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Projects = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const projects = [
    {
      title: "Course Guider Agent",
      description: "A modern AI Chat Bot built with React, N8N integration for Agentic Workflow.",
      image: "/courseguideragent.jpg",
      tags: ["React", "N8N"],
      github: "https://github.com/dhanushperumalla/Course-Guider-Agent",
      live: "#"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates and team collaboration features.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
      tags: ["Vue.js", "Firebase", "Tailwind"],
      github: "#",
      live: "#"
    },
    {
      title: "AI Chat Interface",
      description: "Modern chat interface with AI integration, featuring real-time messaging and smart responses.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
      tags: ["Next.js", "OpenAI", "WebSocket"],
      github: "#",
      live: "#"
    },
    {
      title: "Portfolio Website",
      description: "Responsive portfolio website with smooth animations and modern design principles.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=400&fit=crop",
      tags: ["React", "Tailwind", "Framer Motion"],
      github: "#",
      live: "#"
    },
    {
      title: "Analytics Dashboard",
      description: "Data visualization dashboard with interactive charts and real-time analytics.",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop",
      tags: ["React", "D3.js", "Node.js"],
      github: "#",
      live: "#"
    },
    {
      title: "Mobile Banking App",
      description: "Secure mobile banking interface with modern UI/UX and advanced security features.",
      image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=600&h=400&fit=crop",
      tags: ["React Native", "Redux", "API"],
      github: "#",
      live: "#"
    }
  ];

  const handleLiveDemoClick = (liveLink: string) => {
    if (liveLink && liveLink !== "#") {
      window.open(liveLink, "_blank", "noopener,noreferrer");
    } else {
      setModalMessage("The project hasn't been deployed yet.");
      setShowModal(true);
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4" id="projects">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of projects that showcase my skills and passion for development
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className="bg-card border-border card-hover animate-slide-in-right overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-primary/20 text-primary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="gap-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="outline" size="sm" className="w-full">
                    View Code
                  </Button>
                </a>
                <Button size="sm" className="flex-1" onClick={() => handleLiveDemoClick(project.live)}>
                  Live Demo
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        {/* Modal Popup */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl p-6 shadow-2xl max-w-sm w-full text-center" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}>
              <p className="mb-4 text-lg text-gray-100">{modalMessage}</p>
              <Button onClick={() => setShowModal(false)} className="bg-primary text-white w-full">Close</Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;