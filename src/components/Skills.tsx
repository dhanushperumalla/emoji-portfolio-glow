import OrbitingSkills from "@/components/ui/orbiting-skills";

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Skills & <span className="text-primary">Technologies</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Proficient in modern web technologies with a focus on full-stack development
          </p>
        </div>

        <OrbitingSkills />
      </div>
    </section>
  );
};

export default Skills;
