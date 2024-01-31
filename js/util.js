//Генератор псевдослучайных чисел в диапазоне от min до max

function getRandomNumber(min, max) {
  if (min < 0 || max < 0 || isNaN(min) || isNaN(max)) {
    return "Пожалуйста, введите допустимые положительные целые числа для min и max";
  }

  min = min > max ? [max, (max = min)][0] : min;
  max = max < min ? [min, (min = max)][0] : max;

  let result = Math.round(min - 0.5 + Math.random() * (max - min + 1));
  result = result < min ? min : result > max ? max : result;

  return result;
}

// const unique25 = Array.from({ length: 25 }, (_, i) => i + 1);
// const unique1000 = Array.from({ length: 1000 }, (_, i) => i + 1); как сделать без повторов?

//Проверка длины строки

function validateLength(string, maxLength) {
  return string.length <= maxLength;
}

export { getRandomNumber, validateLength };
