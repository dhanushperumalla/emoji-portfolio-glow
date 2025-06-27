
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Github, Code, Database, Cloud, GitBranch, Monitor } from "lucide-react";

const Skills = () => {
  const skills = [
    { name: "React", emoji: "⚛️", level: 95 },
    { name: "TypeScript", emoji: "📘", level: 90 },
    { name: "Node.js", emoji: "🟢", level: 85 },
    { name: "Python", emoji: "🐍", level: 88 },
    { name: "JavaScript", emoji: "🟨", level: 92 },
    { name: "HTML5", emoji: "🧡", level: 95 },
    { name: "CSS3", emoji: "💙", level: 90 },
    { name: "Next.js", emoji: "▲", level: 85 },
    { name: "Express", emoji: "🚀", level: 80 },
    { name: "N8N", emoji: "⚡", level: 80 },
    { name: "LangChain", emoji: "🦜", level: 80 },
    { name: "CrewAI", emoji: "🚣", level: 80 },
    { name: "PostgreSQL", emoji: "🐘", level: 75 },
    { name: "MY-SQL", emoji: "🐟", level: 75 },
    { name: "MongoDB", emoji: "☘️", level: 75 },
    { name: "AWS", emoji: "☁️", level: 70 },
    { name: "Docker", emoji: "🐳", level: 75 },
    { name: "Git", emoji: "📋", level: 90 },
    { name: "GitHub", emoji: "🐙", level: 90 },
    { name: "VS Code", emoji: "💻", level: 95 },
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          {/* Skills Grid - Left Side */}
          <div className="animate-slide-in-left">
            <div className="grid grid-cols-4 gap-3 max-w-md mx-auto lg:mx-0">
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

          {/* Orbiting Circles - Right Side */}
          <div className="flex justify-center animate-slide-in-right">
            <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-card px-8 pb-8 pt-4 h-[400px]">
              <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-center text-4xl font-semibold leading-none text-transparent">
                Skills
              </span>

              {/* Inner Circles */}
              <OrbitingCircles
                className="size-[40px] border-none bg-transparent"
                duration={20}
                delay={20}
                radius={80}
              >
                <Code className="size-6 text-blue-500" />
              </OrbitingCircles>
              <OrbitingCircles
                className="size-[40px] border-none bg-transparent"
                duration={20}
                delay={10}
                radius={80}
              >
                <Database className="size-6 text-green-500" />
              </OrbitingCircles>

              {/* Middle Circles */}
              <OrbitingCircles
                className="size-[45px] border-none bg-transparent"
                duration={25}
                delay={15}
                radius={130}
              >
                <Monitor className="size-7 text-purple-500" />
              </OrbitingCircles>
              <OrbitingCircles
                className="size-[45px] border-none bg-transparent"
                duration={25}
                delay={0}
                radius={130}
              >
                <Cloud className="size-7 text-orange-500" />
              </OrbitingCircles>

              {/* Outer Circles (reverse) */}
              <OrbitingCircles
                className="size-[50px] border-none bg-transparent"
                radius={180}
                duration={30}
                reverse
              >
                <Github className="size-8 text-gray-700 dark:text-gray-300" />
              </OrbitingCircles>
              <OrbitingCircles
                className="size-[50px] border-none bg-transparent"
                radius={180}
                duration={30}
                delay={20}
                reverse
              >
                <GitBranch className="size-8 text-red-500" />
              </OrbitingCircles>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
