import * as yup from "yup";
import moment from "moment";

const IdBoard = import.meta.env.VITE_ID_BOARD;
const IdListPedAberto = `624a047f2f06001532cef5e5`;

const apikeyTrello = import.meta.env.VITE_API_KEY;
const tokenTrello = import.meta.env.VITE_TOKEN;

const urlTrelloGetCustomField = `https://api.trello.com/1/boards/${IdBoard}/customFields?key=${apikeyTrello}&token=${tokenTrello}`;
const urlTrelloPostCard = `https://api.trello.com/1/cards?idList=${IdListPedAberto}&key=${apikeyTrello}&token=${tokenTrello}`;

const Labels = [`624a04802f06001532cefe52`];
const Entrega = `624a04802f06001532cefe43`;
const Retirada = `62a0c9dd4bed6367d6a3e17e`;

const cardFields = {
  idCustomNome: "6266f3cf7a05075d51e5d87a",
  idCustomTel: "62844c42896c562dc00f4e72",
  idCustomCor: "6266f4bca4f27866da085132",
  idCustomVela: "6266f5496a22807bb41e25f3",
  idCustomSabor: "627bbedb3290697b9e6e0ddf",
  idCustomPagamento: "62845d1714150e5f18da882e",
};

const validationScheme = {
  nameInOrder: yup
    .string()
    .required("Precisamos saber quem você é 😊")
    .min(10, "Por favor, escreva seu nome completo"),
  celInOrder: yup
    .string()
    .required("Vamos precisar conversar com você sobre o bolinho😄"),
  phraseOnTheCake: yup
    .string()
    .required('Caso não tenha frase no seu bolinho digite "sem frase" 🤣')
    .max(52, "A quantidade de caracteres excede o espaço no bolo")
    .min(8, "Digite a frase que vai no Bolinho"),
  cakePhraseColor: yup.string(),
  cakeColor: yup.string().required("Todo bolo tem cor 🤪 escreva a cor do seu"),
  flavorInOrder: yup
    .string()
    .required("Clique em um sabor para seu bolinho 🤤")
    .nullable(),
  isWithdrawal: yup
    .string()
    .required("Selecione se é retiarda ou entrega")
    .nullable(),
  candleInOrder: yup.string().required("Campo obrigatório").nullable(),
  formOfPaymentInOrder: yup
    .string()
    .required("Com será a forma de pagamento 😅")
    .nullable(),
  dateTimeInOrder: yup
    .date()
    .min(
      moment().add(10, "m").toDate(),
      "Prazo muito curto, altere o horário de "
    )
    .required("Campo obrigatório"),
  awareOfWhatsApp: yup.bool().oneOf([true], "Campo obrigatório"),
  termsAccepted: yup
    .bool()
    .oneOf([true], "Você precisa aceitar para continuar seu pedido 😉"),
};

export {
  IdBoard,
  IdListPedAberto,
  apikeyTrello,
  tokenTrello,
  urlTrelloGetCustomField,
  urlTrelloPostCard,
  cardFields,
  validationScheme,
  Labels,
  Entrega,
  Retirada,
};
