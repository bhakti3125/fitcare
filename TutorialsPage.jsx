import React, { useEffect, useState } from "react";
import { fetchTutorials } from "../api/tutorialApi";
import { Link } from "react-router-dom";

export default function TutorialsPage() {
  const [tutorials, setTutorials] = useState([]);

  useEffect(() => {
    fetchTutorials().then(res => setTutorials(res.data)).catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>Tutorials</h2>
      {tutorials.length === 0 ? <p>No tutorials yet.</p> : (
        <ul>
          {tutorials.map(t => (
            <li key={t._id}>
              <Link to={`/tutorials/${t.slug}`}>{t.title}</Link>
              <div><small>By: {t.author?.name || "Unknown"} • {new Date(t.createdAt).toLocaleDateString()}</small></div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}