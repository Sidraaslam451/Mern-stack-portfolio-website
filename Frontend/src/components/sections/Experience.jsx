import { motion } from "framer-motion";

const experiences = [
  {
    id: 1,
    type: "work",
    title: "Full Stack Developer",
    company: "Freelance",
    location: "Remote",
    duration: "2024 — Present",
    description:
      "Building full stack web applications for clients using MERN stack. Delivered multiple projects including e-commerce platforms, portfolio websites, and REST APIs.",
    skills: ["React", "Node.js", "MongoDB", "Express", "TailwindCSS"],
    icon: "💼",
  },
  {
    id: 2,
    type: "education",
    title: "BS Computer Science",
    company: "University of Karachi",
    location: "Karachi, Pakistan",
    duration: "2022 — Present",
    description:
      "Studying Computer Science with focus on software engineering, data structures, algorithms, and web development.",
    skills: ["DSA", "OOP", "Web Dev", "Databases"],
    icon: "🎓",
  },
  {
    id: 3,
    type: "work",
    title: "Frontend Developer",
    company: "Personal Projects",
    location: "Karachi, Pakistan",
    duration: "2023 — 2024",
    description:
      "Developed multiple React applications with modern UI/UX, animations using Framer Motion, and responsive designs.",
    skills: ["React", "CSS", "JavaScript", "Figma"],
    icon: "💻",
  },
];

const TimelineItem = ({ exp, index, isLeft }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`relative flex items-start gap-8 mb-12 ${
        isLeft ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {/* Content Card */}
      <div className="flex-1">
        <motion.div
          whileHover={{ y: -4, borderColor: "rgba(59,130,246,0.5)" }}
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 transition-all duration-300"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-white font-bold text-lg">{exp.title}</h3>
              <p className="text-blue-400 font-medium text-sm mt-1">
                {exp.company}
              </p>
            </div>
            <span className="text-2xl">{exp.icon}</span>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-4 mb-4">
            <span className="flex items-center gap-1 text-gray-500 text-xs">
              📅 {exp.duration}
            </span>
            <span className="flex items-center gap-1 text-gray-500 text-xs">
              📍 {exp.location}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                exp.type === "work"
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
              }`}
            >
              {exp.type === "work" ? "Work" : "Education"}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {exp.description}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {exp.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 bg-gray-700/50 text-blue-400 text-xs rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Center dot — desktop only */}
      <div className="hidden lg:flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 + 0.3 }}
          className="w-4 h-4 rounded-full bg-blue-500 border-4 border-gray-950 z-10"
        />
      </div>

      {/* Empty space for alternating layout */}
      <div className="flex-1 hidden lg:block" />
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-gray-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-3">
            My Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Experience &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Education
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent -translate-x-1/2" />

          {/* Items */}
          {experiences.map((exp, index) => (
            <TimelineItem
              key={exp.id}
              exp={exp}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;