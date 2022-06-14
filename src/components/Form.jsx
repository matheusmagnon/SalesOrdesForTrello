// import * as dotenv from 'dotenv/config';
import { useState } from "react";
import { useForm } from "react-hook-form";
import "../components/Form.css";
import moment from "moment";
import * as constants from "../constants/constants";
import SendAndAttachment from "../services/SendAttachment";
import SendCustomFields from "../services/SendCustomFields";
// import getImageArray from "../services/getImageArray";
// import showPreview from "../services/showPreview";
// import getSate from "../services/showPreview";

export function Form() {

// const defaultTime = ()=>{
//   const datetimeLocalInput = document.getElementById('dataTimeLocal');
//   console.log(datetimeLocalInput)
// }
// defaultTime()
 




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

  const {
    register,
    handleSubmit,
    formState: { erros },
  } = useForm();

  const submitOrder = (dataOrder) => {
    console.log(dataOrder.filesInOrder);
    const dueDate = moment(dataOrder.dateTimeInOrder).format("DD/MM HH:mm");
    const CardBody = {
      name: `${dataOrder.nameInOrder} - CEL: ${dataOrder.celInOrder} - DATA: ${dueDate}`,
      desc: `**********RESUMO DO PEDIDO**********
      Frase: Frase padrão para bolos
      Desenho: Flork com chapéu de aniversário e bolinho na mão
      Cor da Frase: Preta
      Cor do bolo: ${dataOrder.colorBaseInOrder}
      Observação: Granulado colorido
      PAGAMENTO: ${dataOrder.formOfPaymentInOrder}`,
      due: `${moment(dataOrder.dateTimeInOrder)}`,
      idLabels: `624a04802f06001532cefe52`,
    };

    fetch(urlTrelloPostCard, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(CardBody),
    })
      .then((response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        return response.json();
      })

      .then((jsonBody) => {
        const idCard = jsonBody.id;
        const body = jsonBody;

        SendCustomFields(dataOrder, idCard);
        SendAndAttachment(dataOrder.filesInOrder, idCard);
      })
      .catch((err) => console.error(err));
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
              <label>Nome Completo:</label>
              <br />
              <input
                type="text"
                id="POST-name"
                name="nameInOrder"
                {...register("nameInOrder")}
                placeholder="Informe seu nome completo"
                required
                autoFocus
                className="inputFieldText "
              />
              <br />
            </div>

            <div className="field">
              <label>Número de celular(WhatsApp):</label>
              <br />
              <input
                type="tel"
                id="POST-celular"
                name="celInOrder"
                {...register("celInOrder")}
                placeholder="Informe seu WhatsApp"
                required
                className="inputFieldText"
              />
              <br />
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
                      <img src={images.URLpreview} key={images.size} />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="field">
              <label>Cor do bolo (base):</label>
              <br />
              <input
                type="text"
                id="POST-corBase"
                name="colorBaseInOrder"
                {...register("colorBaseInOrder")}
                placeholder="Cor do seu bolinho"
                required
                className="inputFieldText "
              />
              <br />
            </div>

            <div className="fieldSabor">
              <span> Escolha um Sabor: </span>
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
                id="dataTimeLocal"              
                {...register("dateTimeInOrder",{
                  value: "02-04T12:32:20.51"
                })
                }
              />
            </div>

            <div className="fieldVela">
              <label className="vela">
                Aceita vela? (custo adicional de 2 reais):
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
            <div className="fieldPagamento">
              <label className="pagamento">Foma de Pagamento:</label>
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
