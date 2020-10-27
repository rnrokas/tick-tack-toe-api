import express from 'express';
import Board from '../../models/Board.js';
import { validateMove, checkIfGameIsOver } from '../../utils/utils.js';
const router = express.Router();

//@route    Post action/board
//@desc     create a board
//@access   Public
router.post('/board', async (req, res) => {
  try {
    const board = new Board();
    await board.save();
    res.json(board);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

//@route    Get action/board/:id
//@desc     get board by id
//@access   Public
router.get('/board/:id', async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    res.json(board);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

//@route    Post action/move/:boardID
//@desc     add a move
//@access   Public
router.post('/move/:boardID', async (req, res) => {
  try {
    const { cellIndex } = req.body;
    let board = await Board.findById(req.params.boardID);
    // verify if move is valid
    const errors = validateMove(cellIndex, board);
    if (errors.length) {
      return res.status(400).json({ errors });
    }
    const newMove = {
      cellIndex,
      player: (board.moves.length % 2) + 1,
    };
    board.moves.push(newMove);
    board = checkIfGameIsOver(board);
    await board.save();
    res.json(board);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Board does not exist' }] });
    }
    return res.status(500).send('Server Error');
  }
});
export default router;
