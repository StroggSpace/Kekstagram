import { dataArray } from "./data.js";
//Для функции showBigPicture
const bigPicture = document.querySelector(".big-picture");
const closeButton = bigPicture.querySelector(".big-picture__cancel");

//Для функции showData
const bigPictureImg = bigPicture.querySelector(".big-picture__img img");
const likesCount = bigPicture.querySelector(".likes-count");
const commentsCount = bigPicture.querySelector(".comments-count");
const description = bigPicture.querySelector(".social__caption");
const commentsList = bigPicture.querySelector(".social__comments");

const showBigPicture = () => {
  bigPicture.classList.remove("hidden");
  document.body.classList.add("modal-open");
};

closeButton.addEventListener("click", () => {
  bigPicture.classList.add("hidden");
  document.body.classList.remove("modal-open");
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    bigPicture.classList.add("hidden");
    document.body.classList.remove("modal-open");
  }
});

const deliteTemplateComments = () => {
  commentsList.innerHTML = "";
};

const showData = (item) => {
  bigPictureImg.src = item.querySelector(".picture__img").src;
  likesCount.textContent = item.querySelector(".picture__likes").textContent;
  commentsCount.textContent =
    item.querySelector(".picture__comments").textContent;
  description.textContent = item.querySelector(".picture__img").alt;

  deliteTemplateComments();
};

const showComments = (idPhoto) => {
  console.log("idPhoto:", idPhoto);
  console.log("dataArray:", dataArray);
  const photoItem = dataArray.find((item) => item.id == idPhoto);
  if (photoItem) {
    photoItem.comments.forEach((comment) => {
      const commentElement = document.createElement("li");
      commentElement.classList.add("social__comment");
      commentElement.innerHTML = `<img class="social__picture" src="${comment.avatar}" alt="Аватар комментатора фотографии" width="35" height="35">
        <p class="social__text">${comment.message}</p>`;
      commentsList.appendChild(commentElement);
    });
  }
};

export { showBigPicture, showData, showComments };
