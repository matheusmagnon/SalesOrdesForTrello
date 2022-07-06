import * as constants from "../constants/constants";

import makeAPICall from "./makeAPICall";
import { setDataOrderInCustomField } from "./setDataOrderInCustomField";
const { idCustomFields, apikeyTrello, tokenTrello } = constants;

export default function SendCustomFields(dataOrder, idCard) {
  console.log('custom')
  
  try {
    Object.keys(idCustomFields).forEach((id) => {
      
      const urlTrelloPUTCustomField = 
      `https://api.trello.com/1/card/${idCard}/customField/${idCustomFields[id]}/item?key=${apikeyTrello}&token=${tokenTrello}`;
      
      const dataCustom = setDataOrderInCustomField(idCustomFields[id], dataOrder)
     
      const sendData = () => {
        fetch(urlTrelloPUTCustomField, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataCustom),
        });
      };
      
      sendData();
      // makeAPICall(urlTrelloPUTCustomField,dataCustom, "PUT" )
  
    });
  } 
  catch (error) {
    console.log(error)
  }
}
