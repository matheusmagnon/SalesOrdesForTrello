import moment from 'moment';

import * as constants from '../constants/constants';

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
}) {
  const dueDate = moment(dateTimeInOrder).format('DD/MM HH:mm');
  // const Labels = [`624a04802f06001532cefe52`];
  // const Entrega = `624a04802f06001532cefe43`;
  // const Retirada = `62a0c9dd4bed6367d6a3e17e`;

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
*Cor da Frase:* ${cakePhraseColor}
-----------------------------------
*Cor do bolo:* ${cakeColor}
-----------------------------------
*Observação:* ${orderObservation}
-----------------------------------
*Pagamento:* ${formOfPaymentInOrder}
-----------------------------------
*Data e Horário de ${isWithdrawal}: ${dueDate}*
-----------------------------------`,
    due: `${moment(dateTimeInOrder)}`,
    idLabels: Labels,
  };
  return CardBody;
}
