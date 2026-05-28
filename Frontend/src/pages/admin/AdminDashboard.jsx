import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";

const AdminDashboard = () => {
  const { admin, token, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    projects: 0,
    blogs: 0,
    messages: 0,
    downloads: 0,
  });

  // Projects state
  const [projects, setProjects] = useState([]);
  const [projectForm, setProjectForm] = useState({
    title: "", description: "", techStack: "", category: "fullstack",
    liveUrl: "", githubUrl: "", featured: false,
  });

  // Blog state
  const [blogs, setBlogs] = useState([]);
  const [blogForm, setBlogForm] = useState({
    title: "", content: "", excerpt: "", tags: "", published: false,
  });

  // Messages state
  const [messages, setMessages] = useState([]);

  // Axios config with token
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  const fetchAll = async () => {
    try {
      const [projRes, blogRes, msgRes, dlRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/projects`),
        axios.get(`${import.meta.env.VITE_API_URL}/api/blogs/admin/all`, authHeaders),
        axios.get(`${import.meta.env.VITE_API_URL}/api/contact`, authHeaders),
        axios.get(`${import.meta.env.VITE_API_URL}/api/resume/stats`, authHeaders),
      ]);

      setProjects(projRes.data.data || []);
      setBlogs(blogRes.data.data || []);
      setMessages(msgRes.data.data || []);
      setStats({
        projects: projRes.data.count || 0,
        blogs: blogRes.data.count || 0,
        messages: msgRes.data.unread || 0,
        downloads: dlRes.data.data?.total || 0,
      });
    } catch {
      console.log("Data fetch error");
    }
  };

    useEffect(() => {
    fetchAll();
  }, []);



  // Project CRUD
  const handleAddProject = async () => {
    try {
      const data = {
        ...projectForm,
        techStack: projectForm.techStack.split(",").map((t) => t.trim()),
      };
      await axios.post(`${import.meta.env.VITE_API_URL}/api/projects`, data, authHeaders);
      toast.success("Project add ho gaya!");
      setProjectForm({ title: "", description: "", techStack: "", category: "fullstack", liveUrl: "", githubUrl: "", featured: false });
      fetchAll();
    } catch {
      toast.error("Project add nahi hua!");
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm("Delete karna chahte ho?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/projects/${id}`, authHeaders);
      toast.success("Project delete ho gaya!");
      fetchAll();
    } catch {
      toast.error("Delete nahi hua!");
    }
  };

  // Blog CRUD
  const handleAddBlog = async () => {
    try {
      const data = {
        ...blogForm,
        tags: blogForm.tags.split(",").map((t) => t.trim()),
      };
      await axios.post(`${import.meta.env.VITE_API_URL}/api/blogs`, data, authHeaders);
      toast.success("Blog add ho gaya!");
      setBlogForm({ title: "", content: "", excerpt: "", tags: "", published: false });
      fetchAll();
    } catch {
      toast.error("Blog add nahi hua!");
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!confirm("Delete karna chahte ho?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`, authHeaders);
      toast.success("Blog delete ho gaya!");
      fetchAll();
    } catch {
      toast.error("Delete nahi hua!");
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/api/contact/${id}/read`, {}, authHeaders);
      toast.success("Read mark ho gaya!");
      fetchAll();
    } catch {
      toast.error("Error aaya!");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin");
    toast.success("Logout ho gaye!");
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "projects", label: "Projects" },
    { id: "blogs", label: "Blogs" },
    { id: "messages", label: "Messages" },
  ];

  const statCards = [
    { label: "Total Projects", value: stats.projects, color: "blue" },
    { label: "Blog Posts", value: stats.blogs, color: "purple" },
    { label: "Unread Messages", value: stats.messages, color: "green" },
    { label: "Resume Downloads", value: stats.downloads, color: "amber" },
  ];

  return (
    <div className="min-h-screen bg-gray-950">

      {/* Topbar */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">SA</span>
          </div>
          <div>
            <h1 className="text-white font-bold">Admin Dashboard</h1>
            <p className="text-gray-400 text-xs">Welcome, {admin?.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="px-3 py-2 text-gray-400 hover:text-white text-sm transition-colors"
          >
            View Portfolio
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-gray-900 p-1 rounded-xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {statCards.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-gray-800/50 border border-gray-700 rounded-xl p-5"
                >
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-white font-bold mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveTab("projects")}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                >
                  Add Project
                </button>
                <button
                  onClick={() => setActiveTab("blogs")}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors"
                >
                  Write Blog
                </button>
                <button
                  onClick={() => setActiveTab("messages")}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
                >
                  View Messages
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === "projects" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Add Project Form */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-white font-bold mb-4">New Project Add Karo</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  placeholder="Project Title"
                  className="px-4 py-3 bg-gray-900 border border-gray-600 focus:border-blue-500 text-white rounded-xl outline-none"
                />
                <select
                  value={projectForm.category}
                  onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                  className="px-4 py-3 bg-gray-900 border border-gray-600 text-white rounded-xl outline-none"
                >
                  <option value="fullstack">Full Stack</option>
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                </select>
                <textarea
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Description"
                  rows={3}
                  className="px-4 py-3 bg-gray-900 border border-gray-600 focus:border-blue-500 text-white rounded-xl outline-none md:col-span-2"
                />
                <input
                  value={projectForm.techStack}
                  onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                  placeholder="Tech Stack (React, Node.js, MongoDB)"
                  className="px-4 py-3 bg-gray-900 border border-gray-600 focus:border-blue-500 text-white rounded-xl outline-none"
                />
                <input
                  value={projectForm.liveUrl}
                  onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                  placeholder="Live URL"
                  className="px-4 py-3 bg-gray-900 border border-gray-600 focus:border-blue-500 text-white rounded-xl outline-none"
                />
                <input
                  value={projectForm.githubUrl}
                  onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                  placeholder="GitHub URL"
                  className="px-4 py-3 bg-gray-900 border border-gray-600 focus:border-blue-500 text-white rounded-xl outline-none"
                />
                <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={projectForm.featured}
                    onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                    className="w-4 h-4 accent-blue-500"
                  />
                  Featured Project
                </label>
              </div>
              <button
                onClick={handleAddProject}
                className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
              >
                Project Add Karo
              </button>
            </div>

            {/* Projects List */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-white font-bold mb-4">
                All Projects ({projects.length})
              </h3>
              <div className="space-y-3">
                {projects.map((project) => (
                  <div
                    key={project._id}
                    className="flex items-center justify-between p-4 bg-gray-900 rounded-xl border border-gray-700"
                  >
                    <div>
                      <div className="text-white font-medium">{project.title}</div>
                      <div className="text-gray-400 text-xs mt-1">
                        {project.category} • {project.techStack?.join(", ")}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteProject(project._id)}
                      className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white text-xs rounded-lg transition-all"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                {projects.length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    Koi project nahi hai abhi
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* BLOGS TAB */}
        {activeTab === "blogs" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-white font-bold mb-4">New Blog Likho</h3>
              <div className="space-y-4">
                <input
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  placeholder="Blog Title"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 focus:border-blue-500 text-white rounded-xl outline-none"
                />
                <input
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  placeholder="Short Excerpt (summary)"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 focus:border-blue-500 text-white rounded-xl outline-none"
                />
                <textarea
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  placeholder="Blog content yahan likho..."
                  rows={8}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 focus:border-blue-500 text-white rounded-xl outline-none resize-none"
                />
                <input
                  value={blogForm.tags}
                  onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                  placeholder="Tags (React, Node.js, MongoDB)"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 focus:border-blue-500 text-white rounded-xl outline-none"
                />
                <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={blogForm.published}
                    onChange={(e) => setBlogForm({ ...blogForm, published: e.target.checked })}
                    className="w-4 h-4 accent-blue-500"
                  />
                  Publish karo (checked = public)
                </label>
                <button
                  onClick={handleAddBlog}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-colors"
                >
                  Blog Publish Karo
                </button>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-white font-bold mb-4">
                All Blogs ({blogs.length})
              </h3>
              <div className="space-y-3">
                {blogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="flex items-center justify-between p-4 bg-gray-900 rounded-xl border border-gray-700"
                  >
                    <div>
                      <div className="text-white font-medium">{blog.title}</div>
                      <div className="text-gray-400 text-xs mt-1">
                        {blog.published ? (
                          <span className="text-green-400">Published</span>
                        ) : (
                          <span className="text-yellow-400">Draft</span>
                        )}
                        {" • "}{blog.views} views
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteBlog(blog._id)}
                      className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white text-xs rounded-lg transition-all"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                {blogs.length === 0 && (
                  <p className="text-gray-500 text-center py-4">Koi blog nahi hai</p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === "messages" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-white font-bold mb-4">
                Contact Messages ({messages.length})
              </h3>
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`p-5 rounded-xl border transition-colors ${
                      msg.isRead
                        ? "bg-gray-900 border-gray-700"
                        : "bg-blue-950/20 border-blue-500/30"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-white font-medium">{msg.name}</div>
                        <div className="text-blue-400 text-xs">{msg.email}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!msg.isRead && (
                          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                            New
                          </span>
                        )}
                        <span className="text-gray-500 text-xs">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-gray-300 text-sm font-medium mb-2">
                      {msg.subject}
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">
                      {msg.message}
                    </p>
                    {!msg.isRead && (
                      <button
                        onClick={() => handleMarkRead(msg._id)}
                        className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs rounded-lg transition-colors"
                      >
                        Read Mark Karo
                      </button>
                    )}
                  </div>
                ))}
                {messages.length === 0 && (
                  <p className="text-gray-500 text-center py-8">
                    Koi message nahi hai abhi
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;