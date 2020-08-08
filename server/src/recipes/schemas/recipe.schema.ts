import * as mongoose from 'mongoose';

export const RecipeSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  types: [
    {
      type: mongoose.ObjectId,
      ref: 'RecipeType',
    },
  ],
  create_date: {
    type: Date,
    default: Date.now,
  },
  update_date: {
    type: Date,
    default: Date.now,
  },
});
