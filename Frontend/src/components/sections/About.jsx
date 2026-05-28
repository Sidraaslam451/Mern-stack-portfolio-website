import { motion } from "framer-motion";

const About = () => {
  const stats = [
    { number: "10+", label: "Projects Completed" },
    { number: "1+", label: "Years Experience" },
    { number: "5+", label: "Happy Clients" },
    { number: "15+", label: "Technologies" },
  ];

  const info = [
    { label: "Name", value: "Sidra Aslam" },
    { label: "Location", value: "Karachi, Pakistan" },
    { label: "Email", value: "sidra@gmail.com" },
    { label: "Availability", value: "Open to Work ✅" },
  ];

  return (
    <section id="about" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-3">
            Who Am I
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Me</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Image + Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Image placeholder */}
            <div className="relative w-72 h-72 mx-auto lg:mx-0">
              {/* Rotating border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-2xl border-2 border-dashed border-blue-500/40"
              />
              {/* Image box */}
              <div className="absolute inset-4 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center overflow-hidden">
                {/* Apni photo yahan lagao — src mein path do */}
                {/* <img src="/your-photo.jpg" alt="Sidra" className="w-full h-full object-cover" /> */}
                <div className="text-center">
                  <div className="text-6xl font-bold text-white">SA</div>
                  <div className="text-blue-200 text-sm mt-2">Full Stack Dev</div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-4 -right-4 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 shadow-xl"
              >
                <div className="text-white font-bold text-sm">1+ Years</div>
                <div className="text-gray-400 text-xs">Experience</div>
              </motion.div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mt-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-center hover:border-blue-500/50 transition-colors"
                >
                  <div className="text-2xl font-bold text-blue-400">{stat.number}</div>
                  <div className="text-gray-400 text-xs mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              A passionate developer from{" "}
              <span className="text-blue-400">Karachi, Pakistan</span>
            </h3>

            <p className="text-gray-400 leading-relaxed mb-6">
              I'm a Full Stack Developer specializing in the MERN stack. I love
              building web applications that are not only functional but also
              beautiful and user-friendly. My goal is to write clean, efficient
              code that solves real problems.
            </p>

            <p className="text-gray-400 leading-relaxed mb-8">
              Currently available for freelance projects and full-time
              opportunities. I bring dedication, creativity, and technical
              expertise to every project I work on.
            </p>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {info.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                  <span className="text-gray-500 text-sm">{item.label}:</span>
                  <span className="text-white text-sm font-medium">{item.value}</span>
                </motion.div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/resume.pdf"
                download
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
              >
                Download CV
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.querySelector("#contact").scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3 border border-blue-500/50 hover:border-blue-400 text-blue-400 font-semibold rounded-xl transition-colors"
              >
                Contact Me
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;