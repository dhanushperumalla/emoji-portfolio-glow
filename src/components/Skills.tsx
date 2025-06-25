
import { IconCloud } from "@/components/ui/interactive-icon-cloud";

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
    { name: "PostgreSQL", emoji: "🐘", level: 75, slug: "postgresql" },
    { name: "AWS", emoji: "☁️", level: 70, slug: "amazonaws" },
    { name: "Docker", emoji: "🐳", level: 75, slug: "docker" },
    { name: "Git", emoji: "📋", level: 90, slug: "git" },
    { name: "GitHub", emoji: "🐙", level: 90, slug: "github" },
    { name: "VS Code", emoji: "💻", level: 95, slug: "visualstudiocode" },
    { name: "Figma", emoji: "🎨", level: 80, slug: "figma" }
  ];

  const iconSlugs = skills.map(skill => skill.slug);

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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          {/* Skills List - Left Side */}
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="bg-card border border-border rounded-xl p-4 card-hover animate-slide-in-left"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{skill.emoji}</span>
                    <h3 className="text-lg font-semibold">{skill.name}</h3>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-muted-foreground min-w-[3rem]">{skill.level}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Icon Cloud - Right Side */}
          <div className="flex justify-center animate-slide-in-right">
            <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-card px-8 pb-8 pt-4">
              <IconCloud iconSlugs={iconSlugs} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
