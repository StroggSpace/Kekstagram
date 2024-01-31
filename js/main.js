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

//Проверка длины строки

function validateLength(string, maxLength) {
  return string.length <= maxLength;
}
