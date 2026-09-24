const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  priority: {
    type: String,
    default: "medium",
  },
  status: {
    type: String,
    default: "todo",
  },
  assignee: {
    type: String,
    default: "",
  },
  dueDate: {
    type: String,
    default: "",
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
});

module.exports = mongoose.model("Ticket", ticketSchema);