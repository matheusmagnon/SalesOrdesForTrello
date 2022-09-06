import moment from 'moment';

import * as constants from '../constants/constants';
import { DataOrder } from '../types';

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
}: DataOrder) {
  const dueDate = moment(dateTimeInOrder).format('DD/MM HH:mm');

  if (isWithdrawal == 'Retirada') {
    Labels.push(Retirada);
  } else {
    Labels.push(Entrega);
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
    due: `${moment(dateTimeInOrder)}`,
    idLabels: Labels,
  };
  return CardBody;
}
