import React, { useEffect, useState } from "react";
import { fetchBlogs } from "../api/blogApi";
import { Link } from "react-router-dom";
import AddBlog from "./AddBlog";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);

  const handleBlogCreated = (newBlog) => {
    setBlogs(prev => [newBlog, ...prev]); // prepend new blog
  };

  useEffect(() => {
    fetchBlogs().then(res => setBlogs(res.data)).catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>Articles & Blog</h2>

      <AddBlog onCreated={handleBlogCreated} />
      {blogs.map(b => (
        <div key={b._id} className="blog-card">
          <h3><Link to={`/blogs/${b.slug}`}>{b.title}</Link></h3>
          <p>{b.excerpt}</p>
          <small>
            By {b.author?.name || "Unknown"} • {new Date(b.createdAt).toLocaleDateString()}
          </small>
        </div>
      ))}

      {blogs.map(b => (
        <div key={b._id} style={{ marginBottom: 20 }}>
          <h3><Link to={`/blogs/${b.slug}`}>{b.title}</Link></h3>
          <p>{b.excerpt}</p>
          <small>By {b.author?.name || "Unknown"} • {new Date(b.createdAt).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
}