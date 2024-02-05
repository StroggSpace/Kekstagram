const uploadForm = document.querySelector("#upload-select-image");
const uploadInput = uploadForm.querySelector(".img-upload__overlay");
const uploadCancel = uploadForm.querySelector("#upload-cancel");
const uploadImg = uploadForm.querySelector("#upload-file");
const scaleImg = uploadForm.querySelector(".scale__control--value");
const effectImg = uploadForm.querySelector(".effect-level__value");
const noEffect = uploadForm.querySelector("#effect-none");
const hashtagInput = uploadForm.querySelector(".text__hashtags");
const descriptionInput = uploadForm.querySelector(".text__description");

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
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

uploadForm.addEventListener("submit", onFormSubmit);

// Масштабирование изображения
const imgUploadPreviw = uploadForm.querySelector(".img-upload__preview img");
const scaleControl = uploadForm.querySelector(".img-upload__scale");
const scaleButtonMinus = uploadForm.querySelector(".scale__control--smaller");
const scaleButtonPlus = uploadForm.querySelector(".scale__control--bigger");

const onScaleChange = () => {
  switch (scaleImg.value) {
    case "25%":
      imgUploadPreviw.style.transform = `scale(${scaleImg.value})`;
      break;
    case "50%":
      imgUploadPreviw.style.transform = `scale(${scaleImg.value})`;
      break;
    case "75%":
      imgUploadPreviw.style.transform = `scale(${scaleImg.value})`;
      break;
    default:
      imgUploadPreviw.style.transform = `scale(${scaleImg.value})`;
      break;
  }
};

scaleControl.addEventListener("click", (evt) => {
  if (evt.target === scaleButtonMinus && scaleImg.value !== "25%") {
    scaleImg.value = `${Number(scaleImg.value.slice(0, -1)) - 25}%`;
    onScaleChange();
  } else if (evt.target === scaleButtonPlus && scaleImg.value !== "100%") {
    scaleImg.value = `${Number(scaleImg.value.slice(0, -1)) + 25}%`;
    onScaleChange();
  }
});

// Эффекты и слайдер
const effectBar = uploadForm.querySelector(".img-upload__effect-level");
const effectSlider = uploadForm.querySelector(".effect-level__slider");
const effectLvl = uploadForm.querySelector(".effect-level__value");
const effectList = uploadForm.querySelector(".effects__list");
const effectInput = effectList.querySelectorAll(".effects__radio");
let filterName;
let unit;

effectSlider.classList.add("hidden");

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: "lower",
});

effectSlider.noUiSlider.on("update", () => {
  effectLvl.value = effectSlider.noUiSlider.get();
  imgUploadPreviw.style.filter = `${filterName}(${effectLvl.value}${unit})`;
});

const getEffectLvlValue = (name, symbol) => {
  filterName = name;
  unit = symbol;
};

const onEffectChange = (item) => {
  if (item.value === "none") {
    effectBar.classList.add("hidden");
  } else {
    effectBar.classList.remove("hidden");
  }

  switch (item.value) {
    case "chrome":
      effectSlider.classList.remove("hidden");
      imgUploadPreviw.className = `effects__preview--${item.value}`;
      getEffectLvlValue("grayscale", "");
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
        connect: "lower",
      });

      break;

    case "sepia":
      effectSlider.classList.remove("hidden");
      imgUploadPreviw.className = `effects__preview--${item.value}`;
      getEffectLvlValue("sepia", "");
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
        connect: "lower",
      });

      break;

    case "marvin":
      effectSlider.classList.remove("hidden");
      imgUploadPreviw.className = `effects__preview--${item.value}`;
      getEffectLvlValue("invert", "%");
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
        connect: "lower",
      });

      break;

    case "phobos":
      effectSlider.classList.remove("hidden");
      imgUploadPreviw.className = `effects__preview--${item.value}`;
      getEffectLvlValue("blur", "px");
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
        connect: "lower",
      });

      break;

    case "heat":
      effectSlider.classList.remove("hidden");
      imgUploadPreviw.className = `effects__preview--${item.value}`;
      getEffectLvlValue("brightness", "");
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
        connect: "lower",
      });

      break;

    default:
      imgUploadPreviw.className = "";
      effectSlider.classList.add("hidden");
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
        connect: "lower",
      });
      imgUploadPreviw.style.filter = "";
      break;
  }
};

effectInput.forEach((radio) => {
  radio.addEventListener("change", () => {
    onEffectChange(radio);
  });
});
