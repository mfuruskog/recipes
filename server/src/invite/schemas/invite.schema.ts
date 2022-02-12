import mongoose from 'mongoose';
const { Schema } = mongoose;

export const InviteSchema = new Schema({
  user_id: {
    type: String,
  },
  receiver: {
    type: String,
    required: true,
  },
});
