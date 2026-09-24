const express = require("express");
const Project = require("../models/Project");

const router = express.Router();

router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

router.post("/", async (req, res) => {
  const project = new Project({
    name: req.body.name,
    description: req.body.description,
  });

  const savedProject = await project.save();

  res.json(savedProject);
});

// Get one project by ID
router.get("/:id", async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  res.json(project);
});

module.exports = router;