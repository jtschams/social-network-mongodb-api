const router = require('express').Router();
const { 
  getAllThought,
  getOneThought,
  addThought,
  addReaction,
  editThought,
  deleteThought,
  deleteReaction
 } = require('../controllers/thoughtController')

 // /api/thoughts
router.route('/')
  .get(getAllThought)
  .post(addThought)

// /api/routes/:thoughtId
router.route('/:thoughtId')
  .get(getOneThought)
  .put(editThought)
  .delete(deleteThought)

// /api/routes/:thoughtId/reactions
router.route('/:thoughtId/reactions')
.post(addReaction)

// /api/routes/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction)

  module.exports = router;