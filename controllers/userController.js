const {User} = require('../models');

module.exports = {
    // Finds all users
    getUser(req, res) {
        User.find({})
            .then(user => res.json(user))
            .catch(err => res.status(500).json(err));
    },
    // Finds specific user
    getSingleUser(req, res) {
        User.findById(req.params.userId)
            .then(user => res.json(user))
            .catch(err => res.status(500).json(err));
    },
    // Creates new user
    createUser(req, res) {
        User.create(req.body)
            .then(user => res.json(user))
            .catch(err => res.status(500).json(err));
    },
    // Changes existing user
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then(user => {
            if (!user) {
                return res
                    .status(404)
                    .json({message: 'User not found'});
            }
            res.json(user);
        })
    },
    // Deletes a user
    deleteUser(req, res) {
        User.findByIdAndDelete(req.params.userId)
        .then(user => {
            if (!user) {
                return res
                    .status(404)
                    .json({message: 'User not found'});
            }
            res.json({message: 'User deleted'});
        })
        .catch(err => res.status(500).json(err));
    },
    // Add a friend to the user
    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
            {runValidators: true, new: true},
        )
        .then(user => {
            if (!user) {
                return res
                    .status(404)
                    .json({message: 'User not found'})
            }
            res.json(user);
        })
    },
    // Deletes a friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {new: true},
        )
        .then(user =>{
            if (!user) {
                return res
                    .status(404)
                    .json({message: 'User not found'})
            }
            res.json(user);
        })
    },
};