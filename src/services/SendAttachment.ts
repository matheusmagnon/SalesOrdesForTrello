import { string } from "yup";
import * as constants from "../constants/constants";
const { apikeyTrello, tokenTrello } = constants;

export default function SendAttachment(files: [], idCard: number) {
  try {
    const getFile = (files: []) => {
      Object.values(files).map(file => {
        CreateAndSendForm(file);
      });
    };

    const CreateAndSendForm = (file: FileList) => {
      var formData = new FormData();
      formData.append("key", apikeyTrello);
      formData.append("token", tokenTrello);
      console.log(file)
      formData.append("file", file);
      var request = createRequest(idCard);
      request.send(formData);
    };

    const createRequest = function (idCard: number) {
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
  catch (error) {
    console.log(error)
  }

}
