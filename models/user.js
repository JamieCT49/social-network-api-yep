const {Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String, unique: true, required: true, trim: true,
        },
        email: {
            type: String, unique: true, required: true, 
            // I found this on stackoverflow 
            // Mongoose - validate email syntax
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please fill a valid email address',
            ],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;