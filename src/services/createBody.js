import moment from 'moment';

export default function Body(dataOrder) {
  const dueDate = moment(dataOrder.dateTimeInOrder).format('DD/MM HH:mm');
  const CardBody = {
    name: `${dataOrder.nameInOrder} - CEL: ${dataOrder.celInOrder}`,
    desc: `**RESUMO DO PEDIDO**
-----------------------------------
*Frase:* ${dataOrder.phraseOnTheCake}
-----------------------------------
*Desenho:* ${dataOrder.drawingOnTheCake}
-----------------------------------
*Cor da Frase:* ${dataOrder.cakePhraseColor}
-----------------------------------
*Cor do bolo:* ${dataOrder.cakeColor}
-----------------------------------
*Observação:* ${dataOrder.orderObservation}
-----------------------------------
*Pagamento:* ${dataOrder.formOfPaymentInOrder}
-----------------------------------
*Data e Horário de retirada: ${dueDate}*
-----------------------------------`,
    due: `${moment(dataOrder.dateTimeInOrder)}`,
    idLabels: `624a04802f06001532cefe52`,
  };
  return CardBody;
}
