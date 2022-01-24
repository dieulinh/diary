import mongoose from 'mongoose';
const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.ObjectId,
    ref: User
  }
});

export default mongoose.model('note', NoteSchema);