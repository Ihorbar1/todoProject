const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/todoApp.db');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/', (req, res) => {
   new Promise((resolve, reject) => {
      db.each("SELECT * FROM users WHERE name = $name", {
         $name: req.body.name,
      }, (err, user) => {
         if (err) {
            res.status(404).json('no user');
            reject();
         } else {
            resolve(user);
         }
      });
   }).then((user) => {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
         if (err) {
            res.status(404).send(err.message);
         } else {
            result ? res.status(200).send({id: user.id, name: user.name}) : res.status(404).send('User is not found'); 
         } 
      });
   });
});

module.exports = router;
