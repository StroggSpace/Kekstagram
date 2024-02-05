import { dataArray } from "./data.js";
import {
  showBigPicture,
  showComments,
  showData,
  addComments,
} from "./big-picture.js";

const picturesData = dataArray;

const template = document.querySelector("#picture").content;
const photoTemplate = template.querySelector(".picture");
const pictureList = document.querySelector(".pictures");

for (let item of picturesData) {
  const picture = photoTemplate.cloneNode(true);
  picture.id = item.id;
  picture.querySelector(".picture__img").src = `photos/${item.id}.jpg`;
  picture.querySelector(".picture__img").alt = item.description;
  picture.querySelector(".picture__comments").textContent =
    item.comments.length;
  picture.querySelector(".picture__likes").textContent = item.likes;

  pictureList.append(picture);
}

const pictures = pictureList.querySelectorAll(".picture");

for (let item of pictures) {
  item.addEventListener("click", () => {
    showBigPicture();
    showData(item);
    addComments(item.id);
    showComments();
  });
}

console.log(dataArray);
