import { getData, sendData } from "./connect.js";
import { showThumbnails } from "./thumbnails.js";
import { createBigPicture } from "./big-picture.js";
import { showModalSuccess, showModalFail, onFormSubmit } from "./form.js";

getData((thumbnails) => {
  showThumbnails(thumbnails);
  createBigPicture(thumbnails);
});

onFormSubmit(sendData, showModalSuccess, showModalFail);
