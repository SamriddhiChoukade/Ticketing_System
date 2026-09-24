import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    async function loadData() {
      const projectsResponse = await fetch(
        "https://ticketing-system-lwpw.onrender.com/api/projects"
      );

      const ticketsResponse = await fetch(
        "https://ticketing-system-lwpw.onrender.com/api/tickets"
      );

      const projectsData = await projectsResponse.json();
      const ticketsData = await ticketsResponse.json();

      setProjects(projectsData);
      setTickets(ticketsData);
    }

    loadData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h2>Projects</h2>
          <p>{projects.length}</p>
          <Link to="/projects">View Projects</Link>
        </div>

        <div className="dashboard-card">
          <h2>Open Tickets</h2>
          <p>
            {tickets.filter((ticket) => ticket.status !== "done").length}
          </p>
          <Link to="/tickets">View Tickets</Link>
        </div>

        <div className="dashboard-card">
          <h2>Completed Tickets</h2>
          <p>
            {tickets.filter((ticket) => ticket.status === "done").length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;