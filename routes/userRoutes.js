const router = require('express').Router();
const {
  getAllUser,
  getOneUser,
  addUser,
  addFriend,
  editUser,
  deleteUser,
  deleteFriend
} = require('../controllers/userController');

router.route('/')
  .get(getAllUser)
  .post(addUser)

router.route('/:userId')
  .get(getOneUser)
  .put(editUser)
  .delete(deleteUser)

router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend)

  module.exports = router;