import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";


function TicketDetails() {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    async function loadTicket() {
      const response = await fetch(
        `http://localhost:5000/api/tickets/${ticketId}`
      );

      if (!response.ok) {
        setTicket(null);
        return;
      }

      const data = await response.json();
      setTicket(data);
    }

    loadTicket();
  }, [ticketId]);

  if (!ticket) {
    return (
      <div className="page-container">
        <h1>Ticket not found</h1>
        <p>This ticket does not exist.</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <BackButton />
      <div className="page-header">
        <div>
          <h1>{ticket.title}</h1>
          <p>{ticket.description}</p>
        </div>

        <button
          className="primary-button"
          onClick={() => navigate(`/tickets/${ticketId}/edit`)}
        >
          Edit Ticket
        </button>
      </div>

      <div className="ticket-details">
        <div className="detail-card">
          <h3>Status</h3>
          <p>{ticket.status}</p>
        </div>

        <div className="detail-card">
          <h3>Priority</h3>
          <p>{ticket.priority}</p>
        </div>

        <div className="detail-card">
          <h3>Assignee</h3>
          <p>{ticket.assignee || "Not assigned"}</p>
        </div>
      </div>

      <div className="description-card">
        <h2>Description</h2>
        <p>{ticket.description}</p>
      </div>
    </div>
  );
}

export default TicketDetails;