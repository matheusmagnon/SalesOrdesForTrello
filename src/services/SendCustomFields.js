import * as constants from "../constants/constants";
const { idCustomFields, apikeyTrello, tokenTrello } = constants;

export default function SendCustomFields(dataOrder, idCard) {
  const dataCustom = { value: { text: `` } };
  try {
    Object.keys(idCustomFields).forEach((id) => {
      const urlTrelloPUTCustomField = `https://api.trello.com/1/card/${idCard}/customField/${idCustomFields[id]}/item?key=${apikeyTrello}&token=${tokenTrello}`;

      const setDataOrderInCustomField = () => {
        if (idCustomFields[id] == "6266f3cf7a05075d51e5d87a") {
          dataCustom.value.text = dataOrder.nameInOrder;
        }
        if (idCustomFields[id] == "62844c42896c562dc00f4e72") {
          dataCustom.value.text = dataOrder.celInOrder;
        }
        if (idCustomFields[id] == "6266f4bca4f27866da085132") {
          dataCustom.value.text = dataOrder.cakeColor;
        }
        if (idCustomFields[id] == "6266f5496a22807bb41e25f3") {
          dataCustom.value.text = dataOrder.candleInOrder;
        }
        if (idCustomFields[id] == "627bbedb3290697b9e6e0ddf") {
          dataCustom.value.text = dataOrder.flavorInOrder;
        }
        if (idCustomFields[id] == "62845d1714150e5f18da882e") {
          dataCustom.value.text = dataOrder.formOfPaymentInOrder;
        }

      };

      const sendData = () => {
        fetch(urlTrelloPUTCustomField, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataCustom),
        });
      };
      setDataOrderInCustomField();
      sendData();
    });
  } catch (error) {
    console.log(error)
  }
}
