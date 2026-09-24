import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateProject() {
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        if (!projectName.trim() || !description.trim()) {
            alert("Please enter project name and description.");
            return;
        }

        const response = await fetch("http://localhost:5000/api/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: projectName.trim(),
                description: description.trim(),
            }),
        });

        if (!response.ok) {
            alert("Failed to create project.");
            return;
        }

        navigate("/projects");
    }
    return (
        <div className="page-container">
            <h1>Create Project</h1>

            <form className="project-form" onSubmit={handleSubmit}>
                <label>Project Name</label>
                <input
                    type="text"
                    placeholder="Enter project name"
                    value={projectName}
                    onChange={(event) => setProjectName(event.target.value)}
                />

                <label>Description</label>
                <textarea
                    placeholder="Enter project description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />

                <button type="submit" className="primary-button">
                    Create Project
                </button>
            </form>
        </div>
    );
}

export default CreateProject;