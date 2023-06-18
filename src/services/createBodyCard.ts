import moment from "moment";

import * as constants from "../constants/constants";
import { DataOrder } from "../types";

const { Labels, Entrega, Retirada } = constants;

export default function Body({
  nameInOrder,
  celInOrder,
  phraseOnTheCake,
  drawingOnTheCake,
  cakePhraseColor,
  cakeColor,
  isWithdrawal,
  orderObservation,
  formOfPaymentInOrder,
  dateTimeInOrder,
  candleInOrder,
  flavorInOrder,
  deliveryAdress,
}: DataOrder) {
  const dueDate = moment(dateTimeInOrder).format("DD/MM HH:mm");

  if (isWithdrawal == "Retirada") {
    Labels.push(Retirada);
  } else {
    Labels.push(Entrega);
  }

  if (deliveryAdress == undefined) {
    deliveryAdress = "Não Preenchido";
  }

  const CardBody = {
    name: `${nameInOrder} - CEL: ${celInOrder}`,
    desc: `**RESUMO DO PEDIDO**
-----------------------------------
*Frase:* ${phraseOnTheCake}
-----------------------------------
*Desenho:* ${drawingOnTheCake}
-----------------------------------
*Observação:* ${orderObservation}
-----------------------------------
*Endereço para entrega:* ${deliveryAdress}
-----------------------------------
*Cor da Frase:* ${cakePhraseColor}
-----------------------------------
*Cor do bolo:* ${cakeColor}
-----------------------------------
*Sabor do bolo:* ${flavorInOrder}
-----------------------------------
*Pagamento:* ${formOfPaymentInOrder}
-----------------------------------
*Data e Horário de ${isWithdrawal}: ${dueDate}*
-----------------------------------
*Aceita vela:* ${candleInOrder}
-----------------------------------
`,
    descWhatsApp: `*RESUMO DO PEDIDO*
    %0A*Frase:* ${phraseOnTheCake}
    %0A*Desenho:* ${drawingOnTheCake}
    %0A*Observação:* ${orderObservation}
    %0A*Endereço para entrega:* ${deliveryAdress}
    %0A*Cor da Frase:* ${cakePhraseColor}
    %0A*Cor do bolo:* ${cakeColor}
    %0A*Sabor do bolo:* ${flavorInOrder}
    %0A*Pagamento:* ${formOfPaymentInOrder}
    %0A*Data e Horário de ${isWithdrawal}: ${dueDate}*
    %0A*Aceita vela:* ${candleInOrder}
    %0A`,
    due: `${moment(dateTimeInOrder)}`,
    idLabels: Labels,
  };
  return CardBody;
}
