import { motion } from "framer-motion";

const skillsData = [
  {
    category: "Frontend",
    icon: "🎨",
    skills: [
      { name: "React.js", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "HTML & CSS", level: 95 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Framer Motion", level: 75 },
    ],
  },
  {
    category: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Node.js", level: 82 },
      { name: "Express.js", level: 80 },
      { name: "REST APIs", level: 85 },
      { name: "JWT Auth", level: 78 },
      { name: "Nodemailer", level: 70 },
    ],
  },
  {
    category: "Database",
    icon: "🗄️",
    skills: [
      { name: "MongoDB", level: 80 },
      { name: "Mongoose", level: 78 },
      { name: "Firebase", level: 65 },
    ],
  },
  {
    category: "Tools",
    icon: "🛠️",
    skills: [
      { name: "Git & GitHub", level: 85 },
      { name: "VS Code", level: 95 },
      { name: "Postman", level: 80 },
      { name: "Vercel", level: 82 },
      { name: "Cloudinary", level: 70 },
    ],
  },
];

// Skill bar component
const SkillBar = ({ name, level, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="mb-4"
    >
      <div className="flex justify-between mb-1">
        <span className="text-gray-300 text-sm font-medium">{name}</span>
        <span className="text-blue-400 text-sm font-mono">{level}%</span>
      </div>
      {/* Bar background */}
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        {/* Animated fill */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
        />
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-gray-950">
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
            What I Know
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Skills
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-xl mx-auto">
            Technologies and tools I use to bring ideas to life.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsData.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.2 }}
              whileHover={{ y: -4 }}
              className="bg-gray-800/50 border border-gray-700 hover:border-blue-500/50 rounded-2xl p-6 transition-colors duration-300"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-white font-bold text-lg">
                  {category.category}
                </h3>
              </div>

              {/* Skill Bars */}
              {category.skills.map((skill, skillIndex) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  index={skillIndex}
                />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Tech Icons Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm uppercase tracking-widest mb-8">
            Technologies I Work With
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "React", "Node.js", "Express", "MongoDB",
              "JavaScript", "TailwindCSS", "Git", "Vercel",
              "Postman", "Cloudinary", "JWT", "REST API",
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-4 py-2 bg-gray-800 border border-gray-700 hover:border-blue-500/50 text-gray-300 hover:text-blue-400 rounded-lg text-sm font-medium transition-all cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;