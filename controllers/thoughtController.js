const {User, Thought} = require('../models');

module.exports = {
    getThought(req, res) {
        Thought.find({})
            .then(thoughts => res.json(thoughts))
            .catch(err => res.status(500).json(err));
    },

    getSingleThought(req, res) {
        Thought.findById(req.params.thoughtId)
            .select('-__v')
            .then(thoughts => res.json(thoughts))
            .catch(err => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then(thoughts => res.json(thoughts))
            .catch(err => res.status(500).json(err));
    },

    updateThought(req, res) {
        Thought.findByIdAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then( thought => {
            if (!thought) {
                return res
                    .status(404)
                    .json({message: 'Thought not found'});
            }
            res.json(thought);
        })
    },

    deleteThought(req, res) {
        Thought.findByIdAndDelete(req.params.thoughtId)
        .then(thought => {
            if (!thought) {
                return res
                    .status(404)
                    .json({message: 'Thought not found'})
            }
            res.json({message: 'Thought deleted'});
        })
        .catch(err => res.status(500).json(err));
    },

    createReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        )
        .then(thought => {
            if (!thought) {
                return res
                    .status(404)
                    .json({message: 'No'});
            }
            res.json(thought);
        })
    },

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        )
        .then(thought => {
            if (!thought) {
                return res
                    .status(404)
                    .json({message: 'No'});
            }
            res.json(thought);
        })
    },
};