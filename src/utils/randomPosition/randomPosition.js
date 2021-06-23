import random from 'lodash.random';

export const randomPosition = ({ x = 9, y = 9 } = {}) => ({
  x: random(0, x),
  y: random(0, y),
});
