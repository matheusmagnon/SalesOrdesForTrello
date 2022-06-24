const IdBoard = import.meta.env.VITE_ID_BOARD;
const IdListPedAberto = `624a047f2f06001532cef5e5`;
const apikeyTrello = import.meta.env.VITE_API_KEY;
const tokenTrello = import.meta.env.VITE_TOKEN;
const urlTrelloGetCustomField = `https://api.trello.com/1/boards/${IdBoard}/customFields?key=${apikeyTrello}&token=${tokenTrello}`;
const urlTrelloPostCard = `https://api.trello.com/1/cards?idList=${IdListPedAberto}&key=${apikeyTrello}&token=${tokenTrello}`;
// const urlTrelloSendAttachments = `https://api.trello.com/1/cards/${idCard}/attachments/?key=${apikeyTrello}&token=${tokenTrello}`;
import * as yup from 'yup';

const idCustomFields = {
  idCustomNome: '6266f3cf7a05075d51e5d87a',
  idCustomTel: '62844c42896c562dc00f4e72',
  idCustomCor: '6266f4bca4f27866da085132',
  idCustomVela: '6266f5496a22807bb41e25f3',
  idCustomSabor: '627bbedb3290697b9e6e0ddf',
  idCustomPagamento: '62845d1714150e5f18da882e',
};

const validationScheme = {
  nameInOrder: yup
    .string()
    .required('Campo obrigatório')
    .min(10, 'Por favor, escreva seu nome completo'),
  celInOrder: yup.string().required('Campo obrigatório'),
  phraseOnTheCake: yup
    .string()
    .required('Campo obrigatório')
    .max(52, 'A quantidade de caracteres excede o espaço no bolo'),
  cakePhraseColor: yup.string().required('Campo obrigatório'),
  cakeColor: yup.string().required('Campo obrigatório'),
  flavorInOrder: yup.string().required('Campo obrigatório').nullable(),
  candleInOrder: yup.string().required('Campo obrigatório').nullable(),
  formOfPaymentInOrder: yup.string().required('Campo obrigatório').nullable(),
  dateTimeInOrder: yup.date().required('TESES'),
};

export {
  IdBoard,
  IdListPedAberto,
  apikeyTrello,
  tokenTrello,
  urlTrelloGetCustomField,
  urlTrelloPostCard,
  idCustomFields,
  validationScheme,
};
