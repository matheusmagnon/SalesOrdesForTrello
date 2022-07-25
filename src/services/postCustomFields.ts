import * as constants from '../constants/constants';
import { setDataOrderInCustomField } from './setDataOrderInCustomField';

import { DataOrder } from '../types';
const { cardFields, apikeyTrello, tokenTrello } = constants;

export default function postCustomFields(dataOrder: DataOrder, idCard: number) {
  try {
    const fieldCards = Object.values(cardFields);
    fieldCards.forEach(fieldCard => {
      const urlTrelloPUTCustomField = `https://api.trello.com/1/card/${idCard}/customField/${fieldCard}/item?key=${apikeyTrello}&token=${tokenTrello}`;

      const data = setDataOrderInCustomField(fieldCard, dataOrder);
      try {
        const sendData = async () => {
          const response = fetch(urlTrelloPUTCustomField, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
          const responseStatus: number = (await response).status;
          return responseStatus;
        };
        sendData();
      } catch (error) {
        console.error(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
