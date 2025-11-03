const Skills = () => {
  const skillsData = {
    "Programming Languages": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Python",
      "TypeScript",
      "SQL"
    ],
    "Frameworks & Libraries": [
      "React.js",
      "Node.js",
      "Express.js",
      "Next.js",
      "LangChain",
      "CrewAI",
      "Tailwind CSS"
    ],
    "Databases & Tools": [
      "MySQL",
      "MongoDB",
      "PostgreSQL",
      "Git/GitHub",
      "VS Code",
      "Docker",
      "Postman"
    ],
  };

  const techStack = [
    "React",
    "Node.js",
    "MongoDB",
    "Express",
    "JavaScript",
    "Python",
    "Git",
    "Tailwind"
  ];

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Skills & <span className="text-primary">Technologies</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Proficient in modern web technologies with a focus on full-stack development
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {Object.entries(skillsData).map(([category, skills], categoryIndex) => (
            <div 
              key={category} 
              className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-8 hover:border-primary/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <h3 className="text-xl font-semibold mb-6 text-primary">
                {category}
              </h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div 
                    key={skill}
                    className="text-foreground/90 hover:text-primary transition-colors duration-200 animate-slide-in-left"
                    style={{ animationDelay: `${(categoryIndex * 0.1) + (index * 0.05)}s` }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-3xl font-bold mb-8 text-primary">
            Tech Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
            {techStack.map((tech, index) => (
              <div 
                key={tech}
                className="relative group px-6 py-3 rounded-full border border-border/50 transition-all duration-300 hover:border-transparent animate-fade-in overflow-hidden"
                style={{ animationDelay: `${0.4 + (index * 0.05)}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative text-foreground/80 group-hover:text-foreground transition-colors duration-200 text-lg font-medium">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
