const randomPosition = ({ x = 9, y = 9 } = {}) => ({
  x: Math.floor(Math.random() * x),
  y: Math.floor(Math.random() * y),
});

export default randomPosition;
