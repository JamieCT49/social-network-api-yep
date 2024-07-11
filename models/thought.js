const {Schema, model, Types} = require('mongoose');

reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String, required: true, maxlength: 280,
        },
        username: {
            type: String, required: true,
        },
        createdAt: {
            type: Date, default: Date.now,
            get: timestamp => new Date(timestamp).toLocaleDateString()
        },
    },
    {
    toJSON: {
        getters: true,
    },
    id: false,
    }
);

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