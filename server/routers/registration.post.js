const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/todoApp.db');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const router = express.Router();

router.post('/', async (req, res) => {
   const hashPass = await bcrypt.hash(req.body.password, saltRounds);

   db.run(`INSERT INTO users (name,password) VALUES ($name, $password)`, {
      $name: req.body.name,
      $password: hashPass,
   }, (err) => {
      if (err) {
         res.status(400).send('Error with data base operation');
      } else {
         res.status(201).json(req.body);
      }
   });
});


module.exports = router;
