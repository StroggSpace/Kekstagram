import { getRandomNumber } from "./util.js";

//Генератор ID

function generateArrayId(array, min, max) {
  while (array.length < max - min + 1) {
    let randomNum = getRandomNumber(min, max);
    if (!array.includes(randomNum)) {
      array.push(randomNum);
    }
  }

  return array;
}

//Генератор комментариев и имен

function createComments() {
  const arrayId = [];
  generateArrayId(arrayId, 1, 100);
  const allNames = ["Антон", "Виктор", "Дмитрий", "Евгений", "Женя", "Коля"];
  const allComments = [
    "Всё отлично!",
    "В целом всё неплохо. Но не всё.",
    "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
    "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
    "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
    "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!",
  ];
  const comments = [];
  for (let i = 0; i < 10; i++) {
    comments.push({
      id: arrayId[i],
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
  "Я там был!",
  "Как вам фото?!",
  "Я заблудился! Помогите пожалуйста!",
  "Вот это я понимаю - размах!",
];
function createPhotoDescription() {
  return photoDescriptions[getRandomNumber(0, photoDescriptions.length - 1)];
}

//Генератор фотографий

function createPhotos() {
  const photos = [];
  const arrayId = [];
  generateArrayId(arrayId, 1, 25);

  for (let i = 0; i < 25; i++) {
    photos.push({
      id: arrayId[i],
      url: `photos/${arrayId[i]}.jpg`,
      description: createPhotoDescription(),
      likes: getRandomNumber(15, 200),
      comments: createComments(),
    });
  }
  return photos;
}

const dataArray = createPhotos();

export {
  getRandomNumber,
  generateArrayId,
  createPhotoDescription,
  createComments,
  createPhotos,
  dataArray,
};
