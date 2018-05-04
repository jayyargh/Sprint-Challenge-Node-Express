// modules
const express = require('express');

const db = require('../data/helpers/actionModel.js');

// router middleware
const router = express.Router();

// GET
router.get('/', (req, res) => {
  db
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res.status(500).json({
        error: 'Actions could not recovered.'
      });
    });
});

// GET by Id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db
    .get(id)
    .then(project => {
      res.status(200).json(project[0]);
    })
    .catch(error => {
      res.status(500).json({
        error: 'This action could not be found'
      });
    });
});

// POST
router.post('/', (req, res) => {
  const action = req.body;
  db
    .insert(action)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      res.status(500).json({
        error: 'Could not add the action.'
      });
    });
});

// DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let action;

  db
    .getProjectActions(id)
    .then(response => {
      action = { ...response[0] };

      db.remove(id).then(response => {
        res.status(200).json(action);
      });
    })
    .catch(error => {
      res.status(404).json({
        message: 'This action Id could not be recovered.'
      });
    });
});

// PUT
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;

  db
    .update(id, update)
    .then(count => {
      if (count > 0) {
        db.getProjectActions(id).then(updateActions => {
          res.status(200).json(updateActions[0]);
        });
      } else {
        res.status(400).json({
          message: 'The project with the specified ID does not exist.'
        });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
