const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const Todo = db.Todo;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Todo.find().select();
}

async function getById(id) {
    return await Todo.findById(id).select();
}

async function create(todoParam) {
    // validate
    if (!await User.findById(todoParam.userId)) {
        throw 'User not found';
    }

    const todo = new Todo(todoParam);

    // save todo
    await todo.save();
}

async function update(id, todoParam) {
    const todo = await Todo.findById(id);

    // validate
    if (!todo) throw 'Todo not found';

    // copy todoParam properties to todo
    Object.assign(todo, todoParam);

    await todo.save();
}

async function _delete(id) {
    await Todo.findByIdAndRemove(id);
}