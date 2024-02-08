import { shuffleAndSelect } from "./util.js";

const template = document.querySelector("#picture").content;
const photoTemplate = template.querySelector(".picture");
const pictureList = document.querySelector(".pictures");

const deleteThubnails = () => {
  const pictureList = document.querySelector(".pictures");
  if (pictureList.querySelectorAll("a.picture").length > 0) {
    for (let item of pictureList.querySelectorAll("a.picture")) {
      item.remove();
    }
  }
};

const showThumbnails = (data) => {
  deleteThubnails();
  showFilters();

  const picturesData = data;

  for (let item of picturesData) {
    const picture = photoTemplate.cloneNode(true);
    picture.querySelector(".picture__img").src = item.url;
    picture.querySelector(".picture__img").alt = item.description;
    picture.querySelector(".picture__comments").textContent =
      item.comments.length;
    picture.querySelector(".picture__likes").textContent = item.likes;

    pictureList.append(picture);
  }

  selectFilters(picturesData);
};

const showFilters = () => {
  const filters = document.querySelector(".img-filters");
  filters.classList.remove("img-filters--inactive");
};

const selectFilters = (array) => {
  const filters = document.querySelector(".img-filters");
  const filterButtons = filters.querySelectorAll(".img-filters__button");
  filterButtons.forEach((button) => {
    button.addEventListener("click", (evt) => {
      if (!evt.target.classList.contains("img-filters__button--active")) {
        filters
          .querySelector(".img-filters__button--active")
          .classList.remove("img-filters__button--active");
        evt.target.classList.add("img-filters__button--active");
      }

      const newArray = array.slice();

      switch (evt.target.id) {
        case "filter-discussed":
          return newArray.sort((a, b) => b.comments.length - a.comments.length);

        case "filter-random":
          return shuffleAndSelect(newArray, 10);

        default:
          return array;
      }
    });
  });
};

export { showThumbnails };
