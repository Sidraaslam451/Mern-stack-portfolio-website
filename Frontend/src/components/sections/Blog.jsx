import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const demoBlogs = [
  {
    _id: "1",
    title: "How I Built My MERN Stack Portfolio",
    excerpt: "A complete guide on building a full stack portfolio with React, Node.js, Express and MongoDB from scratch.",
    tags: ["MERN", "React", "Portfolio"],
    readTime: 5,
    views: 120,
    createdAt: "2025-05-01",
    slug: "mern-stack-portfolio",
  },
  {
    _id: "2",
    title: "JWT Authentication in Node.js",
    excerpt: "Learn how to implement secure JWT authentication in your Express backend with bcrypt password hashing.",
    tags: ["Node.js", "JWT", "Security"],
    readTime: 7,
    views: 89,
    createdAt: "2025-04-15",
    slug: "jwt-authentication-nodejs",
  },
  {
    _id: "3",
    title: "TailwindCSS Tips and Tricks",
    excerpt: "Top 10 TailwindCSS tricks that will make your UI development faster and your designs more beautiful.",
    tags: ["TailwindCSS", "CSS", "Frontend"],
    readTime: 4,
    views: 200,
    createdAt: "2025-03-20",
    slug: "tailwindcss-tips-tricks",
  },
  {
    _id: "4",
    title: "MongoDB Aggregation Pipeline Explained",
    excerpt: "Deep dive into MongoDB aggregation pipeline with real world examples and use cases for backend developers.",
    tags: ["MongoDB", "Database", "Backend"],
    readTime: 8,
    views: 65,
    createdAt: "2025-02-10",
    slug: "mongodb-aggregation-pipeline",
  },
  {
    _id: "5",
    title: "Framer Motion Animations in React",
    excerpt: "Master Framer Motion library to create stunning animations and page transitions in your React applications.",
    tags: ["React", "Animation", "Frontend"],
    readTime: 6,
    views: 150,
    createdAt: "2025-01-25",
    slug: "framer-motion-react",
  },
  {
    _id: "6",
    title: "Deploying MERN Stack on Vercel",
    excerpt: "Step by step guide to deploy your full stack MERN application on Vercel for free with custom domain setup.",
    tags: ["Vercel", "Deployment", "MERN"],
    readTime: 5,
    views: 310,
    createdAt: "2024-12-15",
    slug: "deploy-mern-vercel",
  },
];

const allTags = ["All", ...new Set(demoBlogs.flatMap((b) => b.tags))];

const BlogCard = ({ blog, index }) => {
  const date = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="bg-gray-800/50 border border-gray-700 hover:border-blue-500/50 rounded-2xl p-6 group transition-all duration-300 cursor-pointer"
    >
      <div className="flex flex-wrap gap-2 mb-4">
        {blog.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-md border border-blue-500/20"
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="text-white font-bold text-lg mb-3 group-hover:text-blue-400 transition-colors leading-snug">
        {blog.title}
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
        {blog.excerpt}
      </p>

      <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-700 pt-4">
        <div className="flex items-center gap-4">
          <span>{date}</span>
          <span>{blog.readTime} min read</span>
        </div>
        <span>{blog.views} views</span>
      </div>

      <div className="mt-4 text-blue-400 text-sm font-medium">
        Read More →
      </div>
    </motion.article>
  );
};

const Blog = () => {
  const [blogs, setBlogs] = useState(demoBlogs);
  const [activeTag, setActiveTag] = useState("All");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/blogs`
        );
        if (res.data.data && res.data.data.length > 0) {
          setBlogs(res.data.data);
        }
      } catch {
        console.log("Demo blogs use ho rahe hain");
      }
    };
    fetchBlogs();
  }, []);

  const filtered =
    activeTag === "All"
      ? blogs
      : blogs.filter((b) => b.tags.includes(activeTag));

  return (
    <section id="blog" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-3">
            My Thoughts
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Latest{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Blog Posts
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-xl mx-auto">
            I write about web development, tips, and my experiences as a developer.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {allTags.slice(0, 8).map((tag) => (
            <motion.button
              key={tag}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTag === tag
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "bg-gray-800 text-gray-400 hover:text-white border border-gray-700 hover:border-blue-500/50"
              }`}
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filtered.map((blog, index) => (
              <BlogCard key={blog._id} blog={blog} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-blue-500/50 text-white font-medium rounded-xl transition-all"
          >
            View All Posts →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;