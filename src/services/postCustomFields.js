import * as constants from "../constants/constants";
import { setDataOrderInCustomField } from "./setDataOrderInCustomField";
// import makeAPICallPost from "./makeAPICall";
const { idCustomFields, apikeyTrello, tokenTrello } = constants;

export default function postCustomFields(dataOrder, idCard) {
  
  try {
    Object.keys(idCustomFields).forEach((id) => {
      
      const urlTrelloPUTCustomField = 
      `https://api.trello.com/1/card/${idCard}/customField/${idCustomFields[id]}/item?key=${apikeyTrello}&token=${tokenTrello}`;
      
      const dataCustom = setDataOrderInCustomField(idCustomFields[id], dataOrder)
      // console.log(dataCustom)
// console.log(dataCustom)
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
      
      // const response = makeAPICallPost(urlTrelloPUTCustomField, dataCustom);
      // const responseJ = response.json()
      // console.log(responseJ)
      
  
      // console.log(response)
    });
  } catch (error) {
    console.log(error)
  }
}
