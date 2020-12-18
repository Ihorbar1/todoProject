const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/todoApp.db');

const router = express.Router();

router.get('/:id', (req, res) => {
   db.all("SELECT * FROM tasks WHERE user_id = $id",{$id: req.params.id}, (err, todos) => {
      if (err) {
         res.status(400).send('Error with data base operation');
      } else {
         res.status(200).json(todos);
      }
   });   
});

module.exports = router;