import mongoose from 'mongoose';

const BoardSchema = new mongoose.Schema({
  moves: [
    {
      cellIndex: {
        type: Number,
        required: true,
      },
      player: {
        type: Number,
        required: true,
      },
    },
  ],
  finished: {
    type: Boolean,
    default: false,
  },
  draw: {
    type: Boolean,
    default: false,
  },
  winner: {
    type: String,
    required: false,
  },
});

const Board = mongoose.model('board', BoardSchema);
export default Board;
