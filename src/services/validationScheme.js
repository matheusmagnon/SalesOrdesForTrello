import * as yup from 'yup';
import moment from 'moment';

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
    isWithdrawal: yup.string().required('Campo obrigatório').nullable(),
    candleInOrder: yup.string().required('Campo obrigatório').nullable(),
    formOfPaymentInOrder: yup.string().required('Campo obrigatório').nullable(),
    dateTimeInOrder: yup
      .date()
      .min(moment().add(10, 'm').toDate(), 'Selecione um horário válido de ')
      .required('Campo obrigatório'),
  };

  export default validationScheme;