import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function loadProjects() {
      const response = await fetch("http://localhost:5000/api/projects");
      const data = await response.json();

      setProjects(data);
    }

    loadProjects();
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Projects</h1>
          <p>Manage your projects here.</p>
        </div>

        <Link to="/projects/create" className="primary-button">
          Create Project
        </Link>
      </div>

      {projects.length > 0 ? (
        <div className="project-list">
          {projects.map((project) => (
            <div className="project-card" key={project._id}>
              <h2>{project.name}</h2>

              <p>{project.description}</p>

              <Link
                to={`/projects/${project._id}`}
                className="primary-button"
              >
                View Project
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No projects yet</h2>
          <p>Create your first project to get started.</p>
        </div>
      )}
    </div>
  );
}

export default Projects;