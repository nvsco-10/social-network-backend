const { Schema, model } = require('mongoose');

// Schema to create Thought model
const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        // TO DO - get method to format timestamp on query
        get: formatDate
      },
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        // TO DO - get method to format timestamp on query
        get: formatDate
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [reactionSchema],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );

function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US')
}

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;