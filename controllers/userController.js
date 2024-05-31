const { User, Thought } = require('../models')

module.exports =  {
  async getAllUser(req, res) {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async getOneUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json('No user found for that id.');
      }

      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async addUser(req, res) {
    try {
      if (!req.body.username || !req.body.email) {
        return res.status(400).json('Username and Email both required.');
      }
      const user = await User.create(req.body);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async addFriend(req, res) {
    try {
      const friend = await User.findOne({ _id: req.params.userId });
      if (!friend) {
        return res.status(404).json('No user found at userId for friend.');
      }
      
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId},
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      await User.findOneAndUpdate(
        { _id: req.params.friendId},
        { $addToSet: { friends: req.params.userId } },
        { runValidators: true, new: true }
      );
      
      if (!user) {
        return res.status(404).json('No user found for userId.');
      }
      
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async editUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      
      if (!user) {
        return res.status(404).json('No user found for that id.');
      }
      
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      
      if (!user) {
        return res.status(404).json('No user found for that id.')
      }
      
      if (user.thoughts.length){
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
      }
      if (user.friends.length) {
        await User.updateMany(
          { friends: req.params.userId },
          { $pull: { friends: req.params.userId } }
        );
      }
      
      return res.status(200).json('Successfully deleted user and asssociated thoughts.')
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async deleteFriend(req, res) {
    try {
      const friend = await User.findOne({ _id: req.params.userId });
      if (!friend) {
        return res.status(404).json('No user found at userId for friend.');
      }
      
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } }
      );
      
      if (!user) {
        return res.status(404).json('No user found for that id.');
      }
      if (user.friends.indexOf(req.params.friendId) === -1) {
        return res.status(404).json('Friend not on list for removal.');
      }
      
      return res.status(200).json('User removed from friend list.');
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}