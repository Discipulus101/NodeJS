const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:32768/insta', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, function (err) {
    if (err) throw err;
    console.log('Successfully connected to database!');
});

const User = require('./models/user');

//create
app.post('/users', async (req, res) => {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.json(savedUser);
});

//read
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});
app.get('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});

//update
app.post('/update/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    const updateUser = await User.findByIdAndUpdate(user, 
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            avatar: req.body.avatar,
            email: req.body.email,
            bio: req.body.bio,
        },
        function(err, user) {
            if (err) throw err;
        });
    res.json(updateUser);
});

//delete
app.post('/delete/:id', (req, res) => {
    const user = req.params.id;
    User.findByIdAndRemove(user,
        function(err, user) {
            if (err) throw err;
        });
    res.send({status: 'success', deletedUser: user});
});

app.listen(8000, () => {
    console.log('Server has been started!');
});
