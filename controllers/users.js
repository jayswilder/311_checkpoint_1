const users = require('../data/index')
const sampleUser = require('../data/sampleUser')


const listUsers = (req, res) => {
    return res.json(users);
}

const showUser = (req, res) => {
    let isValidUser = users.some(users => users.id == Number(req.params.id));
    if (isValidUser == true) {
        res.json(users.filter(users => users.id == Number(req.params.id)));
    } else {
        res.status(404).json({ msg: `User ${req.params.id} does not exist` })
    }
}

// Using Postman, if you submit an empty body, it will add the SampleUser information with ID incrementing by 1 each time.
const createUser = (req, res) => {
    sampleUser.id = users.length + 1;
    users.push(sampleUser);
    res.json(users);
};

const updateUser = (req, res) => {
    let isValidUser = users.find(user => user.id == Number(req.params.id));
    if (isValidUser) {
        users.forEach(user => {
            if (user.id == Number(req.params.id)) {
                user.name = sampleUser.name;
                return res.json(user);
            }
        })
    } else {
        res.status(400).json({ msg: `No user with the id of ${req.params.id}.` });
    }
}

const removeUser = (req, res) => {
    let isValidUser = users.some(users => users.id == Number(req.params.id));
    if (isValidUser) {
        let user = users.find(i => i.id == req.params.id);
        user.isActive = false;
        res.send(`User has been set to deleted. (Set to inactive.)`);
    } else {
        res.status(404).json({ msg: `User ${req.params.id} does not exist.` })
    }
}

module.exports = { listUsers, showUser, createUser, updateUser, removeUser }