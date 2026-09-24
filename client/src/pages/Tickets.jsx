import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Tickets() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        async function loadTickets() {
            const response = await fetch(
                "http://localhost:5000/api/tickets"
            );

            const data = await response.json();

            setTickets(data);
        }

        loadTickets();
    }, []);

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1>Tickets</h1>
                    <p>Manage and track your tickets here.</p>
                </div>

                <Link to="/tickets/create" className="primary-button">
                    Create Ticket
                </Link>
            </div>

            {tickets.length > 0 ? (
                <div className="ticket-list">
                    {tickets.map((ticket) => (
                        <div className="ticket-card" key={ticket._id}>
                            <div>
                                <h2>{ticket.title}</h2>
                                <p>{ticket.description}</p>
                            </div>

                            <div className="ticket-meta">
                                <span>Status: {ticket.status}</span>
                                <span>Priority: {ticket.priority}</span>
                            </div>

                            <Link
                                to={`/tickets/${ticket._id}`}
                                className="primary-button"
                            >
                                View Ticket
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <h2>No tickets yet</h2>
                    <p>Create your first ticket to get started.</p>
                </div>
            )}
        </div>
    );
}

export default Tickets;