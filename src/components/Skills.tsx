
const Skills = () => {
  const skills = [
    { name: "React", emoji: "⚛️", level: 95, slug: "react" },
    { name: "TypeScript", emoji: "📘", level: 90, slug: "typescript" },
    { name: "Node.js", emoji: "🟢", level: 85, slug: "nodedotjs" },
    { name: "Python", emoji: "🐍", level: 88, slug: "python" },
    { name: "JavaScript", emoji: "🟨", level: 92, slug: "javascript" },
    { name: "HTML5", emoji: "🧡", level: 95, slug: "html5" },
    { name: "CSS3", emoji: "💙", level: 90, slug: "css3" },
    { name: "Next.js", emoji: "▲", level: 85, slug: "nextdotjs" },
    { name: "Express", emoji: "🚀", level: 80, slug: "express" },
    { name: "N8N", emoji: "⚡", level: 80, slug: "n8n" },
    { name: "LangChain", emoji: "🦜", level: 80, slug: "langchain" },
    { name: "CrewAI", emoji: "🚣", level: 80, slug: "" },
    { name: "PostgreSQL", emoji: "🐘", level: 75, slug: "postgresql" },
    { name: "MY-SQL", emoji: "🐟", level: 75, slug: "mysql" },
    { name: "MongoDB", emoji: "☘️", level: 75, slug: "mongodb" },
    { name: "AWS", emoji: "☁️", level: 70, slug: "amazon" },
    { name: "Docker", emoji: "🐳", level: 75, slug: "docker" },
    { name: "Git", emoji: "📋", level: 90, slug: "git" },
    { name: "GitHub", emoji: "🐙", level: 90, slug: "github" },
    { name: "VS Code", emoji: "💻", level: 95, slug: "" },
  ];

  const iconSlugs = skills
  .map(skill => skill.slug)
  .filter(slug => slug !== "");


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
        
        <div className="max-w-6xl mx-auto">
          {/* Skills Grid - Single Column */}
          <div className="animate-slide-in-up">
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4 max-w-5xl mx-auto">
              {skills.slice(0, 20).map((skill, index) => (
                <div
                  key={skill.name}
                  className="bg-card border border-border rounded-lg p-3 card-hover flex flex-col items-center justify-center aspect-square animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-2xl mb-1">{skill.emoji}</div>
                  <h3 className="text-xs font-medium text-center">{skill.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
