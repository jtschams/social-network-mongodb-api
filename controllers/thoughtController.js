const { User, Thought, Reaction } = require('../models');

module.exports = {
  async getAllThought(req, res) {
    try {
      const thoughts = await Thought.find();
      return res.status(200).json(thoughts);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async getOneThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json('No thought found for that id.');
      }

      return res.status(200).json(thought)
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async addThought(req, res) {
    try {
      if (!req.body.thoughtText || !req.body.userId) {
        return res.status(400).json('Thought text and user ID required.');
      }
      const user = await User.findOne({ _id: req.body.userId });
      if (!user) {
        return res.status(404).json('No user found for Id.');
      }
      
      const thought = await Thought.create({
        thoughtText: req.body.thoughtText,
        username: user.username
      });
      await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } }
      );
      return res.status(200).json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async addReaction(req, res) {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      if (!user) {
        return res.status(404).json('No user found for Id.');
      }
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: {
          reactionBody: req.body.reactionBody,
          username: user.username
        } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json('No thought found for that id.');
      }
      return res.status(200).json(thought)
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async editThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      
      if (!thought) {
        return res.status(404).json('No thought found for that id.');
      }
      return res.status(200).json(thought)
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json('No thought found for that id.');
      }
      
      await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } }
      );
      
      return res.status(200).json('Successfully deleted thought.')
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } }
      );
      
      if (!thought) {
        return res.status(404).json('No thought found for that id.');
      }
      return res.status(200).json('Successfully deleted reaction.')
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}