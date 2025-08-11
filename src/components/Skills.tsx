
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
    <section id="skills" className="py-24 bg-gradient-to-br from-background via-secondary/5 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
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
                    className="group relative overflow-hidden bg-card/80 backdrop-blur-lg border-border/30 hover:border-primary/50 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-primary/20 w-24 h-24 sm:w-28 sm:h-28 animate-fade-in rounded-2xl card-hover"
                    style={{ animationDelay: `${(categoryIndex * 0.15) + (index * 0.05)}s` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary-glow/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                    <div className="relative flex flex-col items-center justify-center h-full p-3">
                      <div className="text-3xl sm:text-4xl mb-2 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 filter drop-shadow-lg">
                        {skill.emoji}
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-center leading-tight opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all duration-500 tracking-wide">
                        {skill.name}
                      </h4>
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-primary-glow/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
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
