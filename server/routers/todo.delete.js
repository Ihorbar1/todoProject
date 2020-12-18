const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/todoApp.db');

const router = express.Router();

router.delete('/:id',  (req, res) => {
   db.run(`DELETE FROM tasks WHERE id = $id`, {
      $id: req.params.id,
   }, (err) => {
      if (err) {
         res.status(404).send('Error with data base operation');
      } else {
         res.status(201).json(req.body);
      }
   });
});

module.exports = router;
