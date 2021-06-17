const randomPosition = ({ x = 9, y = 9 } = {}) => ({
  x: Math.floor(Math.random() * x) + 1,
  y: Math.floor(Math.random() * y) + 1,
});

export default randomPosition;
