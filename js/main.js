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

//Комментарии и имена

let allNames = ["Антон", "Виктор", "Дмитрий", "Евгений", "Женя", "Коля"];
let allComments = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!",
];

//Генератор комментариев и имен

function createComments() {
  const comments = [];
  for (let i = 0; i < 10; i++) {
    comments.push({
      id: getRandomNumber(1, 100000),
      avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
      message: allComments[getRandomNumber(0, allComments.length - 1)],
      name: allNames[getRandomNumber(0, allNames.length - 1)],
    });
  }
  return comments;
}

//Генератор описания фотографий
let photoDescriptions = [
  "Тестим новую камеру!",
  "Замечательные фотки!",
  "Очень красивые фотки!",
  "Супер красивые фотки!",
  "Красивые фотки!",
];
function createPhotoDescription() {
  return photoDescriptions[getRandomNumber(0, photoDescriptions.length - 1)];
}

//Генератор фотографий

function createPhotos() {
  const photos = [];
  for (let i = 0; i < 25; i++) {
    photos.push({
      id: getRandomNumber(1, 25),
      url: `photos/${getRandomNumber(1, 25)}.jpg`,
      description: createPhotoDescription(),
      likes: getRandomNumber(15, 200),
      comments: createComments(),
    });
  }
  return photos;
}

console.log(createPhotos());
