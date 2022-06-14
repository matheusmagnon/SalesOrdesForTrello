import * as constants from "../constants/constants";
// import getImage from "./ArraygetImage";
const { apikeyTrello, tokenTrello } = constants;

export default function SendAttachment(files, idCard) {

  const getFile = (files) => {
    // console.log(files.files)
      const arrayOfFiles = Object.values(files).map(file => {
        // console.log(file)
      var myRequest = new XMLHttpRequest();
      myRequest.onload = CreateAndSendForm(file);
    });
  };

  const CreateAndSendForm = (file) => {
    var formData = new FormData();
    formData.append("key", apikeyTrello);
    formData.append("token", tokenTrello);
    formData.append("file", file);
    var request = createRequest(idCard);
    request.send(formData);
  };

  const createRequest = function (idCard) {
    var request = new XMLHttpRequest();
    request.responseType = "json";
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        console.log(`Successfully uploaded`);
      }
    };
    request.open(
      "POST",
      `https://api.trello.com/1/cards/${idCard}/attachments/`
    );
    return request;
  };

  getFile(files);
}
