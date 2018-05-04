const express = require('express');

const db = require('../data/helpers/projectModel.js');

const router = express.Router();

// only cares about urls beginning with /api/projects
// GET projects works
router.get('/', (req, res) => {
  db
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json({
        error: 'Projects could not be found'
      });
    });
});

// GET by Id project works
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db
    .getProjectActions(id)
    .then(project => {
      res.json(project[0]);
    })
    .catch(error => {
      res.status(404).json({
        error: 'Project could not be found'
      });
    });
});

// POST project wprks
router.post('/', (req, res) => {
  const project = req.body;
  db
    .insert(project)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      res.status(500).json({
        error: 'Could not add project to database.'
      });
    });
});

// DELETE projects
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let project;

  db
    .getProjectActions(id)
    .then(response => {
      project = { ...response[0] };

      db.remove(id).then(response => {
        res.status(500).json(project);
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'This call could not be completed as dialed.'
      });
    });
});

// PUT projects
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;

  db
    .update(id, update)
    .then(count => {
      if (count > 0) {
        db.getProjectActions(id).then(updateProjects => {
          res.status(200).json(updateProjects[0]);
        });
      } else {
        res.status(400).json({
          message: 'Could not find the ID'
        });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
