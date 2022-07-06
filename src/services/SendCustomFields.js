import * as constants from "../constants/constants";

import makeAPICall from "./makeAPICall";
import { setDataOrderInCustomField } from "./setDataOrderInCustomField";
const { idCustomFields, apikeyTrello, tokenTrello } = constants;

export default function SendCustomFields(dataOrder, idCard) {
  
  try {
    Object.keys(idCustomFields).forEach((id) => {
      
      const urlTrelloPUTCustomField = 
      `https://api.trello.com/1/card/${idCard}/customField/${idCustomFields[id]}/item?key=${apikeyTrello}&token=${tokenTrello}`;
      
      const dataCustom = setDataOrderInCustomField(idCustomFields[id], dataOrder)
     
      makeAPICall(urlTrelloPUTCustomField,dataCustom, "PUT" )
  
    });
  } 
  catch (error) {
    console.log(error)
  }
}
