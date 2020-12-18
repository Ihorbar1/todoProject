const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/todoApp.db');

const router = express.Router();

router.patch('/:id',  (req, res) => {
   db.run(`UPDATE tasks SET status = $status WHERE id = $id`, {
      $id: req.params.id,
      $status: req.body.status
   }, (err) => {
      if (err) {
         res.status(400).send('Error with data base operation');
      } else {
         res.status(201).json(req.body);
      }
   });
});

module.exports = router;
