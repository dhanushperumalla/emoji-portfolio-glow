
const Skills = () => {
  const skills = [
    { name: "React", emoji: "⚛️", level: 95 },
    { name: "TypeScript", emoji: "📘", level: 90 },
    { name: "Node.js", emoji: "🟢", level: 85 },
    { name: "Python", emoji: "🐍", level: 88 },
    { name: "Design", emoji: "🎨", level: 82 },
    { name: "Cloud", emoji: "☁️", level: 80 },
  ];

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="bg-card border border-border rounded-xl p-6 card-hover animate-slide-in-left"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center space-y-4">
                <div className="text-4xl mb-2">{skill.emoji}</div>
                <h3 className="text-xl font-semibold">{skill.name}</h3>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="text-sm text-muted-foreground">{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
