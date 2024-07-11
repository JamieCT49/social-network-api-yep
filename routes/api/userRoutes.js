const router = require('express').Router();

const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

// /users
router.route('/').get(getUser).post(createUser);
// /users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
// /users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
