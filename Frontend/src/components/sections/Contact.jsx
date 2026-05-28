import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const contactInfo = [
  { label: "Email", value: "sidra@gmail.com", href: "mailto:sidra@gmail.com" },
  { label: "Location", value: "Karachi, Pakistan", href: null },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/sidraaslam",
    href: "https://linkedin.com/in/sidraaslam",
  },
  {
    label: "GitHub",
    value: "github.com/sidraaslam",
    href: "https://github.com/sidraaslam",
  },
];

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, data);
      toast.success("Message bhej diya! Jald reply milega!");
      reset();
    } catch {
      toast.error("Message nahi bheja! Dobara try karo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-3">
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Me
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-xl mx-auto">
            Have a project in mind or want to work together? Feel free to reach
            out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              Lets work together!
            </h3>
            <p className="text-gray-400 leading-relaxed mb-10">
              I am currently available for freelance projects and full-time
              opportunities. Whether you have a question or just want to say hi,
              my inbox is always open!
            </p>

            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-4 bg-gray-800/50 border border-gray-700 hover:border-blue-500/50 rounded-xl transition-all duration-300"
                >
                  <div>
                    <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                      {item.label}
                    </div>
                    <a>
                      ( href={item.href}
                      target="_blank" rel="noreferrer" className="text-white
                      hover:text-blue-400 transition-colors font-medium"
                      {item.value}
                    </a>
                    ) : (
                    <div className="text-white font-medium">{item.value}</div>)
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8">
              <h3 className="text-white font-bold text-xl mb-6">
                Send a Message
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">
                    Your Name
                  </label>
                  <input
                    {...register("name", { required: "Naam zaroori hai!" })}
                    placeholder="Ahmed Khan"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-600 focus:border-blue-500 text-white rounded-xl outline-none transition-colors placeholder-gray-600"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-2 block">
                    Email Address
                  </label>
                  <input
                    {...register("email", {
                      required: "Email zaroori hai!",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Valid email daalo!",
                      },
                    })}
                    placeholder="ahmed@gmail.com"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-600 focus:border-blue-500 text-white rounded-xl outline-none transition-colors placeholder-gray-600"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-2 block">
                    Subject
                  </label>
                  <input
                    {...register("subject", {
                      required: "Subject zaroori hai!",
                    })}
                    placeholder="Project Discussion"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-600 focus:border-blue-500 text-white rounded-xl outline-none transition-colors placeholder-gray-600"
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-2 block">
                    Message
                  </label>
                  <textarea
                    {...register("message", {
                      required: "Message zaroori hai!",
                      minLength: {
                        value: 10,
                        message: "Message kam se kam 10 characters ka ho!",
                      },
                    })}
                    placeholder="Apna message yahan likho..."
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-600 focus:border-blue-500 text-white rounded-xl outline-none transition-colors placeholder-gray-600 resize-none"
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit(onSubmit)}
                  disabled={submitting}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Bhej raha hun...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;