import { StackedCerts } from "./ui/glass-cards";

const Certifications = () => {
  const certifications = [
    {
      title: "Python Programming",
      provider: "EDX",
      image: "/python.png",
      issued: "July 15, 2024",
      certificationNo: "d5ded6b498db4ef3a01f359c98bd964b",
      description: "CS50P: CS50's Introduction to Programming with Python, a course of study offered by HarvardX, an online learning initiative of Harvard University.",
      color: "rgba(59, 130, 246, 0.8)",
    },
    {
      title: "Prompt Engineering and Advanced ChatGPT",
      provider: "EDX",
      image: "/Prompt.png",
      issued: "June 29, 2024",
      certificationNo: "b1d362a5cb0c414182665cfd90a1ae4a",
      description: "ChatGPT102: Prompt Engineering and Advanced ChatGPT, a course of study offered by edX.",
      color: "rgba(168, 85, 247, 0.8)",
    },
    {
      title: "Certified System Administrator",
      provider: "ServiceNow",
      image: "/ServiceNow-CSA-Certificate.png",
      issued: "April 13, 2025",
      certificationNo: "27011068",
      description: "System administration and configuration expertise",
      color: "rgba(34, 197, 94, 0.8)",
    },
    {
      title: "Certified Application Developer",
      provider: "ServiceNow",
      image: "/ServiceNow-CAD-Certificate.png",
      issued: "July 15, 2025",
      certificationNo: "27318452",
      description: "Application development and customization skills",
      color: "rgba(249, 115, 22, 0.8)",
    },
  ];

  return (
    <section id="certifications" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional certifications that validate my expertise and commitment to excellence
          </p>
        </div>
      </div>
      <StackedCerts certifications={certifications} />
    </section>
  );
};

export default Certifications;
