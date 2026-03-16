import React, { useEffect, useState } from "react";
import { fetchBlog } from "../api/blogApi";
import { useParams } from "react-router-dom";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetchBlog(slug).then(res => setBlog(res.data)).catch(err => console.error(err));
  }, [slug]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>{blog.title}</h2>
      {blog.coverImage && <img src={blog.coverImage} alt={blog.title} style={{ maxWidth: "100%" }} />}
      <p><em>By {blog.author?.name} • {new Date(blog.createdAt).toLocaleDateString()}</em></p>
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
}