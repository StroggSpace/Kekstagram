import { getData, sendData } from "./connect.js";
import { selectFilters } from "./thumbnails.js";
import { createBigPicture } from "./big-picture.js";
import { showModalSuccess, showModalFail, onFormSubmit } from "./form.js";

getData((thumbnails) => {
  selectFilters(thumbnails);
  createBigPicture(thumbnails);
});

onFormSubmit(sendData, showModalSuccess, showModalFail);
