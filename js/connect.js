const getData = (onSuccess) => {
  fetch("https://25.javascript.htmlacademy.pro/kekstagram/data")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((thumbnails) => {
      onSuccess(thumbnails);
    })
    .catch((err) => {
      console.log(err);
    });
};

const sendData = (onSuccess, onFail, data) => {
  fetch("https://25.javascript.htmlacademy.pro/kekstagram", {
    method: "POST",
    body: data,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Произошла ошибка загрузки");
      }
      onSuccess();
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
