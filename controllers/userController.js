const {User} = require('../models');

module.exports = {
    getUser(req, res) {
        User.find({})
            .then(user => res.json(user))
            .catch(err => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        User.findById(req.params.userId)
            .then(user => res.json(user))
            .catch(err => res.status(500).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
            .then(user => res.json(user))
            .catch(err => res.status(500).json(err));
    },

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