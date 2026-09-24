import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";

function ProjectDetails() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    async function loadProject() {
      const response = await fetch(
        `https://ticketing-system-lwpw.onrender.com/api/projects/${projectId}`
      );

      if (!response.ok) {
        setProject(null);
        return;
      }

      const data = await response.json();
      setProject(data);
    }

    loadProject();
  }, [projectId]);

  useEffect(() => {
    async function loadTickets() {
      const response = await fetch(
        `https://ticketing-system-lwpw.onrender.com/api/tickets/project/${projectId}`
      );

      const data = await response.json();

      setTickets(data);
    }

    loadTickets();
  }, [projectId]);

  if (!project) {
    return (
      <div className="page-container">
        <h1>Project not found</h1>
        <p>This project does not exist.</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <BackButton />

      <div className="page-header">
        <div>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
        </div>

        <Link to="/tickets/create" className="primary-button">
          Create Ticket
        </Link>
      </div>

      <div className="project-info">
        <div className="info-card">
          <h3>Tickets</h3>
          <p>{tickets.length}</p>
        </div>

        <div className="info-card">
          <h3>Members</h3>
          <p>0</p>
        </div>
      </div>

      <div className="project-status">
        <h2>Project Status</h2>

        <div className="status-columns">
          <div className="status-column">
            <h3>To Do</h3>

            {tickets.filter((ticket) => ticket.status === "todo").map((ticket) => (
              <div className="board-ticket" key={ticket._id}>
                <h4>{ticket.title}</h4>
                <p>{ticket.priority} Priority</p>
              </div>
            ))}
          </div>

          <div className="status-column">
            <h3>In Progress</h3>

            {tickets
              .filter((ticket) => ticket.status === "in-progress")
              .map((ticket) => (
                <div className="board-ticket" key={ticket._id}>
                  <h4>{ticket.title}</h4>
                  <p>{ticket.priority} Priority</p>
                </div>
              ))}
          </div>

          <div className="status-column">
            <h3>Done</h3>

            {tickets.filter((ticket) => ticket.status === "done").map((ticket) => (
              <div className="board-ticket" key={ticket._id}>
                <h4>{ticket.title}</h4>
                <p>{ticket.priority} Priority</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="project-tickets">
        <h2>Tickets</h2>

        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div className="project-ticket-card" key={ticket._id}>
              <div>
                <h3>{ticket.title}</h3>
                <p>Status: {ticket.status}</p>
                <p>Priority: {ticket.priority}</p>
              </div>

              <Link
                to={`/tickets/${ticket._id}`}
                className="primary-button"
              >
                View Ticket
              </Link>
            </div>
          ))
        ) : (
          <p>No tickets in this project yet.</p>
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;