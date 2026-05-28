import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const demoTestimonials = [
  {
    _id: "1",
    name: "Ahmed Khan",
    position: "CEO",
    company: "TechStartup PK",
    message:
      "Sidra delivered an exceptional e-commerce platform. Her attention to detail, clean code, and communication were outstanding. Highly recommended!",
    rating: 5,
    avatar: "",
  },
  {
    _id: "2",
    name: "Sara Malik",
    position: "Product Manager",
    company: "Digital Agency",
    message:
      "Working with Sidra was a great experience. She understood our requirements perfectly and delivered the project on time with amazing quality.",
    rating: 5,
    avatar: "",
  },
  {
    _id: "3",
    name: "Usman Ali",
    position: "Founder",
    company: "E-Commerce Brand",
    message:
      "Sidra built our entire backend API from scratch. The code quality is excellent and the documentation is very clear. Will work again!",
    rating: 5,
    avatar: "",
  },
];

// Star rating component
const Stars = ({ rating }) => (
  <div className="flex gap-1 mb-4">
    {[1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className={star <= rating ? "text-yellow-400" : "text-gray-600"}
      >
        ★
      </span>
    ))}
  </div>
);

// Avatar placeholder
const Avatar = ({ name, avatar }) => {
  if (avatar) {
    return (
      <img
        src={avatar}
        alt={name}
        className="w-12 h-12 rounded-full object-cover"
      />
    );
  }
  return (
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
      {name.charAt(0)}
    </div>
  );
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(demoTestimonials);
  const [current, setCurrent] = useState(0);

  // API se fetch karo
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/testimonials`
        );
        if (res.data.data.length > 0) {
          setTestimonials(res.data.data);
        }
      } catch {
        console.log("Demo testimonials use ho rahe hain");
      }
    };
    fetchTestimonials();
  }, []);

  // Auto scroll
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="py-24 bg-gray-900">
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
            What People Say
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Client{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Testimonials
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        {/* Featured Testimonial — Big Card */}
        <div className="max-w-3xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 text-center"
            >
              {/* Quote icon */}
              <div className="text-5xl text-blue-500/30 font-serif mb-4">"</div>

              <Stars rating={testimonials[current].rating} />

              <p className="text-gray-300 text-lg leading-relaxed mb-8 italic">
                {testimonials[current].message}
              </p>

              <div className="flex items-center justify-center gap-4">
                <Avatar
                  name={testimonials[current].name}
                  avatar={testimonials[current].avatar}
                />
                <div className="text-left">
                  <div className="text-white font-bold">
                    {testimonials[current].name}
                  </div>
                  <div className="text-blue-400 text-sm">
                    {testimonials[current].position}
                    {testimonials[current].company &&
                      ` @ ${testimonials[current].company}`}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots navigation */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`transition-all duration-300 rounded-full ${
                  current === index
                    ? "w-8 h-2 bg-blue-500"
                    : "w-2 h-2 bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* All Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, borderColor: "rgba(59,130,246,0.5)" }}
              onClick={() => setCurrent(index)}
              className={`bg-gray-800/30 border rounded-xl p-5 cursor-pointer transition-all duration-300 ${
                current === index
                  ? "border-blue-500/50 bg-gray-800/70"
                  : "border-gray-700"
              }`}
            >
              <Stars rating={testimonial.rating} />
              <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                {testimonial.message}
              </p>
              <div className="flex items-center gap-3">
                <Avatar name={testimonial.name} avatar={testimonial.avatar} />
                <div>
                  <div className="text-white text-sm font-medium">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {testimonial.position}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;