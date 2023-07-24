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

export {
  IdBoard,
  IdListPedAberto,
  apikeyTrello,
  tokenTrello,
  urlTrelloGetCustomField,
  urlTrelloPostCard,
  cardFields,
  Labels,
  Entrega,
  Retirada,
};
