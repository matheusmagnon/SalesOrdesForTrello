import moment from "moment";

export default function Body(dataOrder){
    const dueDate = moment(dataOrder.dateTimeInOrder).format("DD/MM HH:mm");
    const CardBody = {
        name: `${dataOrder.nameInOrder} - CEL: ${dataOrder.celInOrder} DATA: ${dueDate}`,
        desc: `****RESUMO DO PEDIDO****
        Frase: ${dataOrder.phraseOnTheCake}
        Desenho: ${dataOrder.drawingOnTheCake}
        Cor da Frase: ${dataOrder.cakePhraseColor}
        Cor do bolo: ${dataOrder.cakeColor}
        Observação: ${dataOrder.orderObservation}
        PAGAMENTO: ${dataOrder.formOfPaymentInOrder}`,
        due: `${moment(dataOrder.dateTimeInOrder)}`,
      };
      return CardBody
    }