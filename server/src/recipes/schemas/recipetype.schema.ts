import * as mongoose from 'mongoose';

export const RecipeTypeSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  emoji: {
    type: String,
    required: true,
  },
});
