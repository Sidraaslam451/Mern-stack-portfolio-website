import { motion } from "framer-motion";

const footerLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com/sidraaslam" },
  { name: "LinkedIn", href: "https://linkedin.com/in/sidraaslam" },
  { name: "Email", href: "mailto:sidra@gmail.com" },
];

const Footer = () => {
  const scrollToSection = (href) => {
    const section = document.querySelector(href);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">SA</span>
              </div>
              <span className="text-white font-bold text-lg">
                Sidra<span className="text-blue-400">.</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Full Stack Developer specializing in MERN stack. Building modern
              web applications with clean code and great UX.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {footerLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-gray-400 hover:text-blue-400 text-sm transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="space-y-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-gray-400 hover:text-blue-400 text-sm transition-colors"
                ></a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            2025 Sidra Aslam. All rights reserved.
          </p>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-500 text-sm"
          >
            Built with React + Node.js + MongoDB
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;