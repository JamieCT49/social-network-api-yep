const {Schema, model} = require('mongoose');

thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String, required: true, minlength: 1, maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
);

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
});

const Thought = model('thoughts', thoughtSchema);

module.exports = Thought;