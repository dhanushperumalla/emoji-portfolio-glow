const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 gradient-text"><a href="/" className="hover:underline focus:underline outline-none">Perumalla Venkata Naga Dhanush</a></h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Full-Stack & AI Developer passionate about creating innovative solutions with AI.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/dhanushperumalla" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/dhanushperumalla/" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                LinkedIn
              </a>
              <a href="https://x.com/Dhanush1234N" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                Twitter
              </a>
              <a href="https://www.instagram.com/dhanush__perumalla__/" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                Instagram
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-muted-foreground hover:text-primary transition-colors">Home</a></li>
              <li><a href="#skills" className="text-muted-foreground hover:text-primary transition-colors">Skills</a></li>
              <li><a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><span className="text-muted-foreground">Web Development</span></li>
              <li><span className="text-muted-foreground">Workflow Automation</span></li>
              <li><span className="text-muted-foreground">Agentic AI Solutions</span></li>
              <li><span className="text-muted-foreground">Machine Learning</span></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © {currentYear} Perumalla Venkata Naga Dhanush. All rights reserved. Built with ❤️ using React & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
