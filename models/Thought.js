const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');
const { formatDate } = require('../utils/formatDate')

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate
    },
    username: {
      type: String,
      required: true
    },
    reactions: [Reaction]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    }
  }
);

thoughtSchema.virtual('reactionCount')
  .get(function() {
    return this.reactions.length
  })

  const Thought = model('Thought', thoughtSchema);

  module.exports = Thought