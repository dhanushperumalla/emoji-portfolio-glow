import { ShootingStars } from "@/components/ui/shooting-stars";

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

  return (
    <section id="skills" className="py-20 bg-black relative overflow-hidden">
      {/* Shooting Stars Background */}
      <ShootingStars
        starColor="hsl(var(--primary))"
        trailColor="hsl(var(--primary) / 0.5)"
        minSpeed={15}
        maxSpeed={35}
        minDelay={1000}
        maxDelay={3000}
      />
      <ShootingStars
        starColor="hsl(var(--primary) / 0.7)"
        trailColor="hsl(var(--primary) / 0.3)"
        minSpeed={10}
        maxSpeed={25}
        minDelay={2000}
        maxDelay={4000}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Skills & <span className="text-primary">Technologies</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Proficient in modern web technologies with a focus on full-stack development
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
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
      </div>
    </section>
  );
};

export default Skills;