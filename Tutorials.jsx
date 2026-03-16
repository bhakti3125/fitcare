import React, { useEffect, useState } from "react";
import { fetchTutorials } from "../api/tutorialApi";
import "../styles/Tutorials.css";

const Tutorials = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTutorials = async () => {
      try {
        const { data } = await fetchTutorials();
        setTutorials(data);
      } catch (error) {
        console.error("Error fetching tutorials:", error);
      } finally {
        setLoading(false);
      }
    };
    getTutorials();
  }, []);

  if (loading) return <p className="loading">Loading tutorials...</p>;

  return (
    <div className="tutorials-container">
      <h1>Fitness Tutorials</h1>
      {tutorials.length === 0 ? (
        <p>No tutorials available yet.</p>
      ) : (
        <div className="tutorials-grid">
          {tutorials.map((t) => (
            <div className="tutorial-card" key={t._id}>
              <h3>{t.title}</h3>
              <p>{t.description}</p>
              {t.videoUrl && (
                <iframe
                  width="100%"
                  height="200"
                  src={t.videoUrl}
                  title={t.title}
                  allowFullScreen
                ></iframe>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tutorials;