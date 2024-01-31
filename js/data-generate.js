import { getRandomNumber } from "./util.js";

//Генератор комментариев и имен

function createComments() {
  let allNames = ["Антон", "Виктор", "Дмитрий", "Евгений", "Женя", "Коля"];
  let allComments = [
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
      id: getRandomNumber(1, 1000),
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

export { getRandomNumber, createPhotoDescription, createComments };
