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
      live: "https://course-guider-agent.vercel.app/"
    },
    {
      title: "Log Classification",
      description: "AI-powered log classification system combining regex, machine learning, and LLMs for efficient and accurate log analysis.",
      image: "/LogClassification.png",
      tags: ["Logistic Regression", "Sentence Transformers", "Node.JS","React.JS"],
      github: "https://github.com/dhanushperumalla/LogClassification",
      live: "#"
    },
    {
      title: "Fraud Suraksha",
      description: "An AI-powered fraud detection assistant built using the Agentic RAG approach with Google’s Gemini, offering context-aware risk assessment for messages, people, and situations.",
      image: "/FraudSuraksha.png",
      tags: ["Python", "Streamlit", "Langchain","Agentic Rag"],
      github: "https://github.com/dhanushperumalla/Fraud-Suraksha",
      live: "#"
    },
    {
      title: "AI Social Media Post Generator",
      description: "Built a modern AI-powered web app using Next.js and Nebius AI to generate social media posts across platforms with support for custom tones, responsive UI, and post management features.",
      image: "/PostGenrator.png",
      tags: ["Next.js", "Nebius AI", "Hugging Face","TypeScript","Shadcn/ui"],
      github: "https://github.com/dhanushperumalla/AI-Post-Generator",
      live: "https://ai-post-generator-ecru.vercel.app/"

    },
    {
      title: "Student Marks Predection",
      description: "Developed a Flask-based Student Exam Performance Predictor using ML algorithms and text vectorization techniques (Bag of Words, TF-IDF), achieving 80% accuracy in forecasting student scores through real-time inputs.",
      image: "/studentsmarkspredection.png",
      tags: ["Python", "Flask", "TF-IDF"],
      github: "https://github.com/dhanushperumalla/ML-Project",
      live: "#"
    },
    {
      title: "Sketch-Solve",
      description: "Sketch-Solve is a real-time hand gesture recognition system that interprets mathematical equations drawn in the air using OpenCV, providing instant AI-powered feedback and solutions.",
      image: "/SketchSolve.png",
      tags: ["Python", "OpenCV", "LangChain"],
      github: "https://github.com/dhanushperumalla/Sketch-Solve",
      live: "#"
    },
    {
      title: "IPL Win Predection",
      description: "Built an IPL Win Probability Predictor using Logistic Regression and Streamlit, delivering real-time match outcome predictions based on historical data (2008–2019) and current match parameters like teams, score, and overs.",
      image: "/IPLWInPredictor.png",
      tags: ["Python", "Streamlit", "Logistic Regression"],
      github: "https://github.com/dhanushperumalla/IPL-Win-Probability-Predictor",
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