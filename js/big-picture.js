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
  const picture = item.querySelector(".picture__img");
  const likes = item.querySelector(".picture__likes");
  bigPictureImg.src = picture.src;
  likesCount.textContent = likes.textContent;
  description.textContent = picture.alt;

  deleteTemplateComments();
};

const addComments = (item, array) => {
  for (let object of array) {
    if (item.src.includes(object.url)) {
      for (let comment of object.comments) {
        const commentElement = document.createElement("li");
        commentElement.classList.add("social__comment");
        commentElement.innerHTML = `<img class="social__picture" src="${comment.avatar}" alt="Аватар комментатора фотографии" width="35" height="35">
            <p class="social__text">${comment.message}</p>`;
        commentsList.appendChild(commentElement);
        if (commentsList.children.length > 5) {
          commentElement.classList.add("hidden");
        }
      }
    }
  }
};

const commentsCount = bigPicture.querySelector(".social__comment-count");

const showComments = () => {
  if (
    !commentsLoader.classList.contains("hidden") &&
    commentsList.children.length > 5
  ) {
    commentsCount.textContent = `5 из ${commentsList.children.length} комментариев`;
  } else {
    commentsCount.textContent = `${commentsList.children.length} из ${commentsList.children.length} комментариев`;
    commentsLoader.classList.add("hidden");
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

const createBigPicture = (array) => {
  const pictureList = document.querySelector(".pictures");

  pictureList.addEventListener("click", (event) => {
    const picture = event.target.closest(".picture");

    if (event.target.classList.contains("picture__img")) {
      showBigPicture();
      showData(picture);
      addComments(event.target, array);
      showComments();
    }
  });
};
export { createBigPicture };
