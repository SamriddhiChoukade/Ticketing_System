const express = require("express");
const Ticket = require("../models/Ticket");

const router = express.Router();

router.get("/", async (req, res) => {
    const tickets = await Ticket.find();
    res.json(tickets);
});

router.post("/", async (req, res) => {
    const ticket = new Ticket({
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status,
        assignee: req.body.assignee,
        dueDate: req.body.dueDate,
        projectId: req.body.projectId,
    });

    const savedTicket = await ticket.save();

    res.json(savedTicket);
});

router.get("/:id", async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        return res.status(404).json({
            message: "Ticket not found",
        });
    }

    res.json(ticket);
});

router.put("/:id", async (req, res) => {
    const updatedTicket = await Ticket.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            status: req.body.status,
            assignee: req.body.assignee,
            dueDate: req.body.dueDate,
        },
        { new: true }
    );

    if (!updatedTicket) {
        return res.status(404).json({
            message: "Ticket not found",
        });
    }

    res.json(updatedTicket);
});

router.get("/project/:projectId", async (req, res) => {
    const tickets = await Ticket.find({
        projectId: req.params.projectId,
    });

    res.json(tickets);
});

module.exports = router;