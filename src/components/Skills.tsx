
const Skills = () => {
  const skillsData = {
    Languages: [
      { name: "JavaScript", emoji: "🟨", level: 92, slug: "javascript" },
      { name: "TypeScript", emoji: "📘", level: 90, slug: "typescript" },
      { name: "Python", emoji: "🐍", level: 88, slug: "python" },
      { name: "HTML5", emoji: "🧡", level: 95, slug: "html5" },
      { name: "CSS3", emoji: "💙", level: 90, slug: "css3" },
    ],
    Frameworks: [
      { name: "React", emoji: "⚛️", level: 95, slug: "react" },
      { name: "Next.js", emoji: "▲", level: 85, slug: "nextdotjs" },
      { name: "Express", emoji: "🚀", level: 80, slug: "express" },
      { name: "Node.js", emoji: "🟢", level: 85, slug: "nodedotjs" },
    ],
    Automations: [
      { name: "N8N", emoji: "⚡", level: 80, slug: "n8n" },
      { name: "LangChain", emoji: "🦜", level: 80, slug: "langchain" },
      { name: "CrewAI", emoji: "🚣", level: 80, slug: "" },
    ],
    Databases: [
      { name: "PostgreSQL", emoji: "🐘", level: 75, slug: "postgresql" },
      { name: "MY-SQL", emoji: "🐟", level: 75, slug: "mysql" },
      { name: "MongoDB", emoji: "☘️", level: 75, slug: "mongodb" },
    ],
    Tools: [
      { name: "AWS", emoji: "☁️", level: 70, slug: "amazon" },
      { name: "Docker", emoji: "🐳", level: 75, slug: "docker" },
      { name: "Git", emoji: "📋", level: 90, slug: "git" },
      { name: "GitHub", emoji: "🐙", level: 90, slug: "github" },
      { name: "VS Code", emoji: "💻", level: 95, slug: "" },
    ],
  };

  return (
    <section id="skills" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto space-y-12">
          {Object.entries(skillsData).map(([category, skills], categoryIndex) => (
            <div key={category} className="animate-slide-in-up" style={{ animationDelay: `${categoryIndex * 0.2}s` }}>
              <h3 className="text-2xl font-bold text-center mb-8 text-primary">
                {category}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className="bg-card border border-border rounded-lg p-4 card-hover flex flex-col items-center justify-center aspect-square animate-fade-in"
                    style={{ animationDelay: `${(categoryIndex * 0.2) + (index * 0.1)}s` }}
                  >
                    <div className="text-3xl mb-2">{skill.emoji}</div>
                    <h4 className="text-sm font-medium text-center">{skill.name}</h4>
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
