import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";

function EditTicket() {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("todo");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    async function loadTicket() {
      const response = await fetch(
        `https://ticketing-system-lwpw.onrender.com/api/tickets/${ticketId}`
      );

      if (!response.ok) {
        return;
      }

      const ticket = await response.json();

      setTitle(ticket.title);
      setDescription(ticket.description);
      setPriority(ticket.priority);
      setStatus(ticket.status);
      setAssignee(ticket.assignee || "");
      setDueDate(ticket.dueDate || "");
    }

    loadTicket();
  }, [ticketId]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please enter ticket title and description.");
      return;
    }

    const response = await fetch(
      `https://ticketing-system-lwpw.onrender.com/api/tickets/${ticketId}`,
      {
        method: "PUT",
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
        }),
      }
    );

    if (!response.ok) {
      alert("Failed to update ticket.");
      return;
    }

    navigate(`/tickets/${ticketId}`);
  }

  return (
    <div className="page-container">
      <BackButton />

      <h1>Edit Ticket</h1>

      <form className="project-form" onSubmit={handleSubmit}>
        <label>Ticket Title</label>

        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label>Description</label>

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

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
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditTicket;