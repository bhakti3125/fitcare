import React, { useState } from "react";
import { createBlog } from "../api/blogApi";

export default function AddBlog({ onCreated }) {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    published: true
  });

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createBlog(form);
      alert("Blog created");
      setForm({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        published: true
      });
      if (onCreated) onCreated(res.data); // update parent list
    } catch (err) {
      alert(
        "Error creating blog: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  // CSS-in-JS styles
  const styles = {
    wrapper: {
      background: "#f9f9f9",
      border: "1px solid #ddd",
      padding: "20px",
      borderRadius: "6px",
      marginBottom: "30px",
    },
    heading: {
      marginBottom: "15px",
      color: "#333",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    input: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "15px",
    },
    textarea: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "15px",
      resize: "vertical",
    },
    button: {
      background: "#007bff",
      color: "white",
      border: "none",
      padding: "10px 14px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "15px",
      transition: "background 0.2s",
    },
    buttonHover: {
      background: "#0056b3",
    },
  };

  return (
    <div style={styles.wrapper}>
      <h3 style={styles.heading}>Create Blog</h3>
      <form onSubmit={onSubmit} style={styles.form}>
        <input
          style={styles.input}
          name="title"
          placeholder="Title"
          onChange={onChange}
          value={form.title}
          required
        />
        <input
          style={styles.input}
          name="slug"
          placeholder="Slug (unique)"
          onChange={onChange}
          value={form.slug}
          required
        />
        <input
          style={styles.input}
          name="excerpt"
          placeholder="Excerpt"
          onChange={onChange}
          value={form.excerpt}
        />
        <textarea
          style={styles.textarea}
          name="content"
          placeholder="Content (HTML allowed)"
          onChange={onChange}
          value={form.content}
          rows={6}
        />
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) =>
            (e.currentTarget.style.background = "#0056b3")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.background = "#007bff")
          }
        >
          Create
        </button>
      </form>
    </div>
  );
}