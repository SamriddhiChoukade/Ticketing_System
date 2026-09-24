import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function CreateTicket() {
    const [title, setTitle] = useState("");
    const [projects, setProjects] = useState([]);
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");
    const [status, setStatus] = useState("todo");
    const [assignee, setAssignee] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [projectId, setProjectId] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        async function loadProjects() {
            const response = await fetch(
                "http://localhost:5000/api/projects"
            );

            const data = await response.json();

            setProjects(data);
        }

        loadProjects();
    }, []);


    async function handleSubmit(event) {
        event.preventDefault();

        if (!projectId || !title.trim() || !description.trim()) {
            alert("Please select a project and enter ticket title and description.");
            return;
        }

        const response = await fetch(
            "http://localhost:5000/api/tickets",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title.trim(),
                    description: description.trim(),
                    priority,
                    status,
                    assignee,
                    dueDate,
                    projectId,
                }),
            }
        );

        if (!response.ok) {
            alert("Failed to create ticket.");
            return;
        }

        navigate("/tickets");
    }


    return (
        <div className="page-container">
            <BackButton />

            <h1>Create Ticket</h1>

            <form className="project-form" onSubmit={handleSubmit}>

                <label>Project</label>

                <select
                    value={projectId}
                    onChange={(event) => setProjectId(event.target.value)}
                >
                    <option value="">Select Project</option>

                    {projects.map((project) => (
                        <option key={project._id} value={project._id}>
                            {project.name}
                        </option>
                    ))}
                </select>

                <label>Ticket Title</label>

                <input
                    type="text"
                    placeholder="Enter ticket title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />

                <label>Description</label>
                <textarea
                    placeholder="Enter ticket description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                ></textarea>

                <label>Priority</label>
                <select
                    value={priority}
                    onChange={(event) => setPriority(event.target.value)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <label>Status</label>
                <select
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                </select>

                <label>Assignee</label>
                <select
                    value={assignee}
                    onChange={(event) => setAssignee(event.target.value)}
                >
                    <option value="">Select Assignee</option>
                    <option value="user1">User 1</option>
                    <option value="user2">User 2</option>
                </select>

                <label>Due Date</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(event) => setDueDate(event.target.value)}
                />

                <button type="submit" className="primary-button">
                    Create Ticket
                </button>
            </form>
        </div>
    );

}
export default CreateTicket;