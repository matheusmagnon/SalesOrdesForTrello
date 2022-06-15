// import * as dotenv from 'dotenv/config';
import { useState } from "react";
import { useForm } from "react-hook-form";
import "../components/Form.css";
import moment from "moment";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as constants from "../constants/constants";
import SendAndAttachment from "../services/SendAttachment";
import SendCustomFields from "../services/SendCustomFields";
import getDateNow from "../services/getDateNow";
import * as OrderSchema from "../services/validateOrder";

export function Form() {
  const [images, setImage] = useState([]);

  const showPreview = (event) => {
    console.log("ok");
    const imagesPreview = Array.from(event.target.files);
    console.log(imagesPreview[0]);
    const images = imagesPreview.map((file) => {
      const { name, size } = file;
      return { name, size, URLpreview: URL.createObjectURL(file) };
    });
    setImage(images);
  };

  const {
    IdBoard,
    IdListPedAberto,
    apikeyTrello,
    tokenTrello,
    urlTrelloPostCard,
  } = constants;

  const validateOrder = yup.object().shape({
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validateOrder) });

  const submitOrder = (dataOrder) => {
    console.log(dataOrder.filesInOrder);

    const dueDate = moment(dataOrder.dateTimeInOrder).format("DD/MM HH:mm");

    // const createCard = () => {};

    const CardBody = {
      name: `${dataOrder.nameInOrder} - CEL: ${dataOrder.celInOrder} - DATA: ${dueDate}`,
      desc: `**********RESUMO DO PEDIDO**********
      Frase: ${dataOrder.phraseOnTheCake}
      Desenho: ${dataOrder.drawingOnTheCake}
      Cor da Frase: ${dataOrder.cakePhraseColor}
      Cor do bolo: ${dataOrder.cakeColor}
      Observação: ${dataOrder.orderObservation}
      PAGAMENTO: ${dataOrder.formOfPaymentInOrder}`,
      due: `${moment(dataOrder.dateTimeInOrder)}`,
      idLabels: `624a04802f06001532cefe52`,
    };

    async function CreateCard() {
     const  response = await  fetch(urlTrelloPostCard, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(CardBody),
      })
        console.log(`Response: ${response.status} ${response.statusText}`)
        const responseJson = await response.json()
        const idCard = responseJson.id
          SendCustomFields(dataOrder, idCard);
          SendAndAttachment(dataOrder.filesInOrder, idCard);
  
    }
    CreateCard()
  };

  return (
    <main>
      <div className="container">
        <h1>
          Pedido de BENTÔ CAKE <br /> (bolinho de 350g)
        </h1>
        <div className="formBody">
          <form
            onSubmit={handleSubmit(submitOrder)}
            encType="multipart/form-data"
          >
            <div className="field">
              <label>
                <strong>Nome Completo:</strong>
              </label>
              <input
                type="text"
                id="POST-name"
                name="nameInOrder"
                {...register("nameInOrder")}
                placeholder="Informe seu nome completo"
                autoFocus
                className="inputFieldText "
              />
              <p className="errorMessage">{errors.nameInOrder?.message}</p>
            </div>

            <div className="field">
              <label>
                <strong>Número de celular(WhatsApp):</strong>
              </label>
              <br />
              <input
                type="tel"
                id="POST-celular"
                name="celInOrder"
                {...register("celInOrder")}
                placeholder="Informe seu WhatsApp"
                className="inputFieldText"
              />
              <p className="errorMessage">{errors.celInOrder?.message}</p>
            </div>

            <div className="field">
              <label>
                <strong>
                  Frase no bolinho (máximo 50 caracteres com desenho):
                </strong>
              </label>
              <br />
              <input
                type="tel"
                id="POST-celular"
                name="phraseOnTheCake"
                {...register("phraseOnTheCake")}
                placeholder="Informe a frase que vai no bolinho"
                className="inputFieldText"
              />
              <p className="errorMessage">{errors.phraseOnTheCake?.message}</p>
            </div>
            <div className="field">
              <label>
                <strong>Cor da Frase:</strong>
              </label>
              <br />
              <input
                type="text"
                name="cakePhraseColor"
                {...register("cakePhraseColor")}
                placeholder="Informe a cor da frase"
                className="inputFieldText"
              />
              <p className="errorMessage">{errors.cakePhraseColor?.message}</p>
            </div>
            <div className="field">
              <label>
                <strong>Se houver desenho descreva abaixo:</strong>
              </label>
              <br />
              <input
                type="tel"
                id="POST-celular"
                name="drawingOnTheCake"
                {...register("drawingOnTheCake")}
                placeholder="Desenho em cima do bolinho"
                className="inputFieldText"
              />
            </div>

            <div className="fieldUpload">
              <div>
                <label htmlFor="POST-file" className="ButtomUploadFile">
                  Caso haja alguma imagem de inspiração anexe aqui:
                </label>
                <input
                  type="file"
                  id="POST-file"
                  multiple
                  accept="image/*"
                  name="filesInOrder"
                  {...register("filesInOrder", {
                    onChange: (e) => {
                      showPreview(e);
                    },
                  })}
                />
              </div>
              <div className="fieldPreview">
                {images.map((images) => {
                  return (
                    <div>
                      <div>
                        <span>{images.name}</span>
                      </div>
                      <img src={images.URLpreview} key={images.name} />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="field">
              <label>
                <strong>Caso haja alguma observação escreva abaixo:</strong>
              </label>
              <br />
              <input
                type="tel"
                id="POST-celular"
                name="orderObservation"
                {...register("orderObservation")}
                placeholder="Desenho em cima do bolinho"
                className="inputFieldText"
              />
            </div>
            <div className="field">
              <label>
                <strong>Cor do bolo (base):</strong>
              </label>
              <br />
              <input
                type="text"
                id="POST-corBase"
                name="cakeColor"
                {...register("cakeColor")}
                placeholder="Cor do seu bolinho"
                className="inputFieldText "
              />
              <p className="errorMessage">{errors.cakeColor?.message}</p>
              <br />
            </div>

            <div className="fieldSabor">
              <span>
                {" "}
                <strong>Escolha um Sabor:</strong>{" "}
              </span>
              <br />
              <input
                type="radio"
                id="POST-saborChoc"
                name="flavorInOrder"
                value="CHOCOLATUDO"
                {...register("flavorInOrder")}
              />
              <label>CHOCOLATUDO</label>
              <br />

              <input
                type="radio"
                id="POST-saborRed"
                name="flavorInOrder"
                value="RED VELVET"
                {...register("flavorInOrder")}
              />
              <label>RED VELVET</label>
              <br />

              <input
                type="radio"
                id="POST-saborRedAmor"
                name="flavorInOrder"
                value="AMOR PERFEITO"
                {...register("flavorInOrder")}
              />
              <label>AMOR PERFEITO</label>
              <br />
            </div>
            <p className="errorMessage">{errors.flavorInOrder?.message}</p>

            <div className="fieldDataRetirada">
              <span>
                Data e horário da retirada: <br />
                <strong>TERÇA à SÁBADO das 12:00 às 18:30</strong> <br />
                <strong>SÁBADO 12:00 às 16:00</strong>{" "}
              </span>
              <br />
              <div>
                <label>
                  {" "}
                  <strong> Data e Horário: </strong>
                </label>
              </div>
              <input
                type="datetime-local"
                name="dateTimeInOrder"
                id="inputDateNow"
                {...register("dateTimeInOrder", {
                  value: getDateNow(),
                  // "2022-06-14T12:32"
                })}
              />
            </div>

            <div className="fieldVela">
              <label className="vela">
                <strong>Aceita vela? (custo adicional de 2 reais):</strong>
              </label>
              <br />

              <input
                type="radio"
                id="POST-velaSim"
                name="candleInOrder"
                value="Sim"
                {...register("candleInOrder")}
              />
              <label>Sim</label>
              <br />

              <input
                type="radio"
                id="POST-velaNao"
                name="candleInOrder"
                value="Não"
                {...register("candleInOrder")}
              />
              <label>Não</label>
              <br />
            </div>
            <p className="errorMessage">{errors.candleInOrder?.message}</p>
            <div className="fieldPagamento">
              <label className="pagamento">
                <strong>Foma de Pagamento:</strong>
              </label>
              <br />

              <input
                type="radio"
                id="PIX"
                name="formOfPaymentInOrder"
                value="PIX"
                {...register("formOfPaymentInOrder")}
              />
              <label>PIX</label>
              <br />

              <input
                type="radio"
                id="CardCredit"
                name="formOfPaymentInOrder"
                value="Cartão de Crédito"
                {...register("formOfPaymentInOrder")}
              />
              <label>Cartão de Crédito (+ taxa de 5%)</label>
              <br />

              <input
                type="radio"
                id="TransfBancaria"
                name="formOfPaymentInOrder"
                value="TRANSFERÊNCIA"
                {...register("formOfPaymentInOrder")}
              />
              <label>TRANSFERÊNCIA BANCÁRIA (BB e CAIXA)</label>
              <br />
              <p className="errorMessage">
                {errors.formOfPaymentInOrder?.message}
              </p>

              <input
                className="botaoSendPost"
                type="submit"
                value="Enviar Pedido"
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

//   function App() {
//     const makeAPICall = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/', {mode:'cors'});
//         const data = await response.json();
//         console.log({ data })
//       }
//       catch (e) {
//         console.log(e)
//       }
//     }
