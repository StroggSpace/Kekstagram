import {
  getRandomNumber,
  createPhotoDescription,
  createComments,
} from "./data-generate.js";

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

export { createPhotos };
