const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/todoApp.db');

const router = express.Router();

router.post('/',  (req, res) => {
   db.run(`INSERT INTO tasks (user_id, text, status) VALUES ($userId, $text, $status)`, {
      $userId: req.body.userId,
      $text: req.body.text,
      $status: 'normal',
   }, (err) => {
      if (err) {
         res.status(400).send('Error with data base operation');
      } else {
         res.status(201).json(req.body);
      }
   });
});

module.exports = router;
