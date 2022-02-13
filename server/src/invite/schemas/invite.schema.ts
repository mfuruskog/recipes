import mongoose from 'mongoose';
const { Schema } = mongoose;

export const InviteSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    select: false,
  },
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
});
