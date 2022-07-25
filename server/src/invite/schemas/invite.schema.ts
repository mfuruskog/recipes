import mongoose from 'mongoose';
import { InviteStatus } from '../interfaces/invite.interface';
const { Schema } = mongoose;

export const InviteSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: InviteStatus,
    default: InviteStatus.new,
  },
});
