import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import ProjectDetails from "../pages/ProjectDetails";
import Tickets from "../pages/Tickets";
import TicketDetails from "../pages/TicketDetails";
import CreateProject from "../pages/CreateProject";
import CreateTicket from "../pages/CreateTicket";
import EditTicket from "../pages/EditTicket";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/create" element={<CreateProject />} />
      <Route path="/projects/:projectId" element={<ProjectDetails />} />
      <Route path="/tickets" element={<Tickets />} />
      <Route path="/tickets/create" element={<CreateTicket />} />
      <Route path="/tickets/:ticketId/edit" element={<EditTicket />} />
      <Route path="/tickets/:ticketId" element={<TicketDetails />} />
      
    </Routes>
  );
}

export default AppRoutes;