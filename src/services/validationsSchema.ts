import * as yup from "yup";
import moment from "moment";

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
    .max(35, "A quantidade de caracteres excede o espaço no bolo"),
  // .min(8, "Digite a frase que vai no Bolinho"),
  cakePhraseColor: yup.string(),
  cakeColor: yup.string().required("Todo bolo tem cor 🤪 escreva a cor do seu"),
  flavorInOrder: yup
    .string()
    .required("Clique em um sabor para seu bolinho 🤤")
    .nullable(),
  isWithdrawal: yup.string().required("Selecione uma opção").nullable(),
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

export { validationScheme };
