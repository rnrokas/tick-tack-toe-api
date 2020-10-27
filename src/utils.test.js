import { validateMove } from './utils/utils.js';

test('adds move to empty board', () => {
  expect(
    validateMove(0, {
      finished: false,
      draw: false,
      _id: '5f983a819be27c2d84089f95',
      moves: [],
      __v: 0,
    })
  ).toStrictEqual([]);
});

test('adds move with invalid cellindex to empty board', () => {
  expect(
    validateMove(9, {
      finished: false,
      draw: false,
      _id: '5f983a819be27c2d84089f95',
      moves: [],
      __v: 0,
    })
  ).toStrictEqual([{ msg: 'Cell index must be between 0 and 8' }]);
});
