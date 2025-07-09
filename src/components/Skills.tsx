
import { Card } from "./ui/card";

const Skills = () => {
  const skillsData = {
    Languages: [
      { name: "HTML5", emoji: "🧡" },
      { name: "CSS3", emoji: "💙"},
      { name: "JavaScript", emoji: "🟨" },
      { name: "Python", emoji: "🐍"},
      { name: "TypeScript", emoji: "📘"},
    ],
    Frameworks: [
      { name: "Node.js", emoji: "🟢"},
      { name: "React", emoji: "⚛️"},
      { name: "Express", emoji: "🚀"},
      { name: "Next.js", emoji: "▲"},
      { name: "LangChain", emoji: "🦜"},
      { name: "CrewAI", emoji: "🚣"},
    ],
    Automations: [
      { name: "N8N", emoji: "⚡" },
      { name: "Zapier", emoji: "☀️"},
      { name: "Langflow", emoji: "🪢" },
    ],
    Databases: [
      { name: "MY-SQL", emoji: "🐟",},
      { name: "MongoDB", emoji: "☘️", },
      { name: "PostgreSQL", emoji: "🐘"},
    ],
    Tools: [
      { name: "Git", emoji: "📋"},
      { name: "GitHub", emoji: "🐙" },
      { name: "Docker", emoji: "🐳" },
      { name: "VS Code", emoji: "💻" },
    ],
  };

  return (
    <section id="skills" className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto space-y-8">
          {Object.entries(skillsData).map(([category, skills], categoryIndex) => (
            <div key={category} className="animate-slide-in-up" style={{ animationDelay: `${categoryIndex * 0.15}s` }}>
              <h3 className="text-xl font-semibold text-center mb-6 text-primary">
                {category}
              </h3>
              <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
                {skills.map((skill, index) => (
                  <Card
                    key={skill.name}
                    className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 w-20 h-20 sm:w-24 sm:h-24 animate-fade-in"
                    style={{ animationDelay: `${(categoryIndex * 0.15) + (index * 0.05)}s` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex flex-col items-center justify-center h-full p-2">
                      <div className="text-2xl sm:text-3xl mb-1 group-hover:scale-110 transition-transform duration-300">
                        {skill.emoji}
                      </div>
                      <h4 className="text-xs font-medium text-center leading-tight opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        {skill.name}
                      </h4>
                    </div>
                  </Card>
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
