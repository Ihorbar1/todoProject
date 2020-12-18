const express = require('express');
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser');
const getTodos = require('./routers/todos.get');
const postTodo = require('./routers/todo.post');
const deleteTodo = require('./routers/todo.delete');
const updateTodo = require('./routers/todo.status.update');
const auth = require('./routers/auth');
const registration = require('./routers/registration.post');

const PORT = 4000;
const clientPath = path.join(__dirname, 'client');
const app = express();

app.use(cors());
app.use(express.static(clientPath));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/get-todos', getTodos);
app.use('/api/post-todo', postTodo);
app.use('/api/delete-todo', deleteTodo);
app.use('/api/update-todo', updateTodo);
app.use('/api/auth', auth);
app.use('/api/registration', registration);

app.listen(PORT, () => console.log(`server has been startet on port ${PORT}`));
