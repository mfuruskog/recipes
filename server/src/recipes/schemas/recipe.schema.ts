import mongoose from 'mongoose';
const { Schema } = mongoose;

export const RecipeSchema = new Schema({
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
      type: Schema.Types.ObjectId,
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
