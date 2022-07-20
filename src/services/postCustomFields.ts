import * as constants from "../constants/constants";
import { setDataOrderInCustomField } from "./setDataOrderInCustomField";

import { DataOrder } from "../types";
// import makeAPICallPost from "./makeAPICall";
const { cardFields, apikeyTrello, tokenTrello } = constants;

export default function postCustomFields(dataOrder: DataOrder, idCard: number) {

  try {
    const fieldCards = Object.values(cardFields)
    fieldCards.forEach((fieldCard) => {
      const urlTrelloPUTCustomField =
        `https://api.trello.com/1/card/${idCard}/customField/${fieldCard}/item?key=${apikeyTrello}&token=${tokenTrello}`;

      const data = setDataOrderInCustomField(fieldCard, dataOrder)

      const sendData = () => {
        fetch(urlTrelloPUTCustomField, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      };
      sendData();
    });
  }
  catch (error) {
    console.log(error)
  }
}

