import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTutorial } from "../api/tutorialApi";
export default function TutorialDetail() {
  const { slug } = useParams();   
  const [tutorial, setTutorial] = useState(null);

  useEffect(() => {
    if (slug) {
      fetchTutorial(slug)
        .then(res => setTutorial(res.data))
        .catch(err => console.error("Error fetching tutorial:", err));
    }
  }, [slug]);

  if (!tutorial) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>{tutorial.title}</h2>
      <p><em>{tutorial.description}</em></p>

      {tutorial.videoUrl && (
      <div style={{ margin: "20px 0" }}>
        <iframe
          width="560"
          height="315"
          src={tutorial.videoUrl.replace("watch?v=", "embed/")}
          title={tutorial.title}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    )}

      <div dangerouslySetInnerHTML={{ __html: tutorial.content }} />
    </div>
  );
}