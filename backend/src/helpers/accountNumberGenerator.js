const numberGenerator = () => {
  const min = 10000;
  const max = 99999;
  const number = Math.floor(Math.random() * (max - min + 1)) + min;
  return number;
};

module.exports = { numberGenerator };
