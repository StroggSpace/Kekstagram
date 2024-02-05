import { dataArray } from "./data.js";
//Для функции showBigPicture
const bigPicture = document.querySelector(".big-picture");
const closeButton = bigPicture.querySelector(".big-picture__cancel");

//Для функции showData
const bigPictureImg = bigPicture.querySelector(".big-picture__img img");
const likesCount = bigPicture.querySelector(".likes-count");
const description = bigPicture.querySelector(".social__caption");
const commentsList = bigPicture.querySelector(".social__comments");
const commentsLoader = bigPicture.querySelector(".comments-loader");

const showBigPicture = () => {
  bigPicture.classList.remove("hidden");
  document.body.classList.add("modal-open");
  commentsLoader.classList.remove("hidden");
};

closeButton.addEventListener("click", () => {
  bigPicture.classList.add("hidden");
  document.body.classList.remove("modal-open");
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !bigPicture.classList.contains("hidden")) {
    bigPicture.classList.add("hidden");
    document.body.classList.remove("modal-open");
  }
});

const deleteTemplateComments = () => {
  commentsList.innerHTML = "";
};

const showData = (item) => {
  bigPictureImg.src = item.querySelector(".picture__img").src;
  likesCount.textContent = item.querySelector(".picture__likes").textContent;
  description.textContent = item.querySelector(".picture__img").alt;

  deleteTemplateComments();
};

const addComments = (idPhoto) => {
  const photoItem = dataArray.find((item) => item.id == idPhoto);
  if (photoItem) {
    photoItem.comments.forEach((comment) => {
      const commentElement = document.createElement("li");
      commentElement.classList.add("social__comment");
      commentElement.innerHTML = `<img class="social__picture" src="${comment.avatar}" alt="Аватар комментатора фотографии" width="35" height="35">
        <p class="social__text">${comment.message}</p>`;
      commentsList.appendChild(commentElement);
      if (commentsList.children.length > 5) {
        commentElement.classList.add("hidden");
      }
    });
  }
};

const commentsCount = bigPicture.querySelector(".social__comment-count");

const showComments = () => {
  if (!commentsLoader.classList.contains("hidden")) {
    commentsCount.textContent = `5 из ${commentsList.children.length} комментариев`;
  }
};

commentsLoader.addEventListener("click", () => {
  commentsLoader.classList.add("hidden");
  commentsCount.textContent = `${commentsList.children.length} из ${commentsList.children.length} комментариев`;
  const comments = commentsList.querySelectorAll(".social__comment");
  comments.forEach((item) => {
    if (item.classList.contains("hidden")) {
      item.classList.remove("hidden");
    }
  });
});

export { showBigPicture, showData, addComments, showComments };
