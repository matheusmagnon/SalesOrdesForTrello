import * as yup from "yup";

export default function OrderSchema() {
  const validade = yup.object().shape({
    nameInOrder: yup
      .string()
      .required("Campo obrigatório")
      .min(10, "Por favor, escreva seu nome completo"),
    celInOrder: yup.string().required("Campo obrigatório"),
    phraseOnTheCake: yup
      .string()
      .required("Campo obrigatório")
      .max(52, "A quantidade de caracteres excede o espaço no bolo"),
    cakePhraseColor: yup.string().required("Campo obrigatório"),
    cakeColor: yup.string().required("Campo obrigatório"),
    flavorInOrder: yup.string().required("Campo obrigatório").nullable(),
    // dateTimeInOrder: yup.string().required("Campo obrigatório").nullable()
    candleInOrder: yup.string().required("Campo obrigatório").nullable(),
    formOfPaymentInOrder: yup.string().required("Campo obrigatório").nullable(),
  });
  return validade;
}
