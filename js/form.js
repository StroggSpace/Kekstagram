const uploadForm = document.querySelector("#upload-select-image");
const uploadInput = document.querySelector(".img-upload__overlay");
const uploadCancel = document.querySelector("#upload-cancel");
const uploadImg = document.querySelector("#upload-file");
const scaleImg = document.querySelector(".scale__control--value");
const effectImg = document.querySelector(".effect-level__value");
const noEffect = document.querySelector("#effect-none");
const hashtagInput = document.querySelector(".text__hashtags");
const descriptionInput = document.querySelector(".text__description");

// Сброс настроект по дефолту

uploadImg.addEventListener("change", () => {
  uploadInput.classList.remove("hidden");
  document.body.classList.add("modal-open");
  scaleImg.value = "100%";
  effectImg.value = "";
  noEffect.checked = true;
  hashtagInput.value = "";
  descriptionInput.value = "";
});

// Открытие и закрытие окна редактирования

uploadCancel.addEventListener("click", () => {
  uploadInput.classList.add("hidden");
  document.body.classList.remove("modal-open");
  uploadImg.value = "";
});

const isTextFieldFocused = () =>
  document.activeElement === hashtagInput ||
  document.activeElement === descriptionInput;

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !isTextFieldFocused()) {
    uploadInput.classList.add("hidden");
    document.body.classList.remove("modal-open");
    uploadImg.value = "";
  }
});

// Валидация формы

const MAX_HASHTAG_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const UNVALID_SYMBOLS = /[^a-zA-Z0-9а-яА-ЯёЁ]/g;

const pristine = new Pristine(uploadForm, {
  classTo: "img-upload__element",
  errorTextParent: "img-upload__element",
  errorTextClass: "img-upload__error",
});

const startsWithHash = (string) => string[0] === "#";

const hasValidLength = (string) =>
  string.length >= MIN_HASHTAG_LENGTH && string.length <= MAX_HASHTAG_LENGTH;

const hasValidSymbols = (string) => !UNVALID_SYMBOLS.test(string.slice(1));

const isValidTag = (tag) =>
  startsWithHash(tag) && hasValidLength(tag) && hasValidSymbols(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(" ")
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  hashtagInput,
  validateTags,
  "Неправильно заполнены хэштеги"
);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

uploadForm.addEventListener("submit", onFormSubmit);
