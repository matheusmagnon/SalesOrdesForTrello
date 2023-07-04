import { useForm } from "react-hook-form";
import { ChangeEvent, createContext, useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";

import getDateNow from "../services/getDateNow";
import makeAPICall from "../services/makeAPICall";
import SendAttachment from "../services/SendAttachment";
import postCustomFields from "../services/postCustomFields";
import { DataOrder } from "../types";
import createBodyCard from "../services/createBodyCard";
import getId from "../services/getId";

import menuBento from "../_assets/images/menuBento.png";

import * as constants from "../constants/constants";

import { FormTitle } from "./Form/FormTitle";
import OrderSent from "./OrderSent";
import PreviewImageUpload from "./PreviewImageUpload";

import styles from "./Form.module.css";

import { FormContainer } from "./Form/FormContainer";
import { FormBackground } from "./Form/FormBackground";
import { TextField } from "./Form/Fields/Text";
import { CelField } from "./Form/Fields/Cel";
import { GroupLabels } from "./Form/GroupLabels";
import { UploadImages } from "./Form/Fields/UploadImages";
import { Options } from "./Form/Fields/Options";
import { DateField } from "./Form/Fields/Date";
import { SimpleOption } from "./Form/Fields/SimpleOption";
import { GroupOptions } from "./Form/GroupOptions";
import { Checkbox } from "./Form/Fields/Checkbox";
import { Buttom } from "./Form/Buttom";

import SalesOrderContext from "../context/SalesOrderContext";

type Images = {
  name: string;
  size: number;
  URLpreview: string;
};

interface OrderContextType {
  order: any;
}

export const OrderContext = createContext({} as OrderContextType);

export function Form() {
  const { order } = useContext(OrderContext);

  const [images, setImage] = useState<Images[]>([]);
  const [isSalesOrderIsCompleted, setIsSalesOrderIsCompleted] = useState(false);
  const [isWithdrawal, setIsWithdrawal] = useState("Retirada");
  const [resumeOrderState, setResumeOrderState] = useState("");
  const { urlTrelloPostCard, validationScheme } = constants;

  const handleisWithdrawalChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsWithdrawal(event.target.value);
  };

  const getImagesToUpload = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;

    const imagesPreview = Array.from(target.files as FileList);

    interface File {
      name: string;
      size: number;
    }

    const images = imagesPreview.map((file) => {
      const { name, size }: File = file;
      return { name, size, URLpreview: URL.createObjectURL(file) };
    });
    setImage(images);
  };

  function erroIsWithdrawalOrDelivery() {
    if (errors.dateTimeInOrder?.message) {
      return errors.dateTimeInOrder?.message + `${isWithdrawal}`;
    }
  }
  const validateOrder = yup.object().shape(validationScheme);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataOrder>({
    resolver: yupResolver(validateOrder),
  });

  const submitOrder = (dataOrder: DataOrder) => {
    async function CreateCard() {
      const response = await makeAPICall(
        urlTrelloPostCard,
        createBodyCard(dataOrder)
      );

      const idCard: number = await getId(response);
      SendAttachment(dataOrder.filesInOrder, idCard);
      postCustomFields(dataOrder, idCard);
      setResumeOrderState(createBodyCard(dataOrder).descWhatsApp);
    }
    CreateCard().then(() => {
      let resumeOrder = createBodyCard(dataOrder).descWhatsApp;
      let url = `https://api.whatsapp.com/send?phone=5563991069649&text=Oie, segue meu pedido:%0A${resumeOrder}`;
      window.open(url, "_blank");
      setIsSalesOrderIsCompleted(true);
    });
  };

  if (isSalesOrderIsCompleted == true) {
    return <OrderSent resume={resumeOrderState} />;
  }

  const { obj } = useContext(SalesOrderContext);

  return (
    <OrderContext.Provider value={{ order }}>
      <FormBackground>
        <FormContainer>
          <FormTitle> Pedido de BENTÔ CAKE (bolinho de 350g)</FormTitle>
          {/* {obj} */}
          <div className="">
            <img src={menuBento} alt="Cardápio - Bentô Cake"></img>
          </div>
          <form
            onSubmit={handleSubmit(submitOrder)}
            encType="multipart/form-data"
            name="PedidosBento"
            data-netlify="true"
          >
            <h1 className="font-bold text-baseText text-xl">
              A partir de R$ 50,00
            </h1>
            <ul>
              <li> • acompanha garfo e embalagem biodegradáveis</li>
              <li> • 1 camada de recheio</li>
              <li> • 7 cm de altura</li>
              <li> • 2 camadas de massa</li>
              <li> • serve 2 fatias</li>
            </ul>
            <GroupLabels>
              <span className="font-bold text-baseText text-xl">
                Selecione o sabor do seu bolo:
              </span>
              <br />
              <GroupOptions>
                <Options
                  nameField="flavorInOrder"
                  option="CHOCOLATUDO"
                  optionDescribe=" massa amanteigada de cacau, recheio de brigadeiro gourmet de chocolate meio amargo"
                />
                <Options
                  nameField="flavorInOrder"
                  option="RED VELVET"
                  optionDescribe="  massa fofinha e aveludada de tom vermelho, saborizada com baunilha + cacau e recheio de cream cheese frosting"
                />
                <Options
                  nameField="flavorInOrder"
                  option="LEITE NINHO"
                  optionDescribe="  massa amanteigada de baunilha e recheio de brigadeiro cremoso de leite ninho"
                />
              </GroupOptions>
            </GroupLabels>

            <GroupLabels>
              <TextField
                nameField="cakeColor"
                placeholder="Digite a cor base do seu bolo"
                {...register("cakeColor")}
              />

              {/* <p className={styles.errorMessage}>
                  {errors.cakeColor?.message}
                </p> */}

              <TextField
                nameField="phraseOnTheCake"
                placeholder="Digite a frase do bolinho (máximo 35 caracteres)"
                {...register("phraseOnTheCake")}
              />
              {/*              
              <p className={styles.errorMessage}>
                {errors.phraseOnTheCake?.message}
              </p>  */}

              <TextField
                nameField="cakePhraseColor"
                placeholder="Digite a cor da frase"
                {...register("cakePhraseColor")}
              />

              {/* <p className={styles.errorMessage}>
                {errors.cakePhraseColor?.message}
              </p>  */}

              <TextField
                nameField="drawingOnTheCake"
                placeholder="Se houver desenho descreva"
                {...register("drawingOnTheCake")}
              />

              <UploadImages />

              <div className={styles.fieldUpload}>
                <div className={styles.previewImages}>
                  {images.map((image) => {
                    return (
                      <PreviewImageUpload
                        key={uuidv4()}
                        name={image.name}
                        URLpreview={image.URLpreview}
                      />
                    );
                  })}
                </div>
              </div>
              <TextField
                nameField="orderObservation"
                placeholder="Caso haja alguma observação descreva"
                {...register("orderObservation")}
              />
              <GroupLabels type="simple">
                <h2 className="font-bold text-baseText text-xl">
                  Aceita Vela?:
                </h2>
                <span className="text-sm">(custo adicional R$ 2)</span>
                <GroupOptions type="simple">
                  <SimpleOption
                    option="Sim"
                    {...register("candleInOrder")}
                    nameField="candleInOrder"
                  />
                  <SimpleOption
                    option="Não"
                    {...register("candleInOrder")}
                    nameField="candleInOrder"
                  />
                </GroupOptions>
              </GroupLabels>
              <GroupLabels type="simple">
                <h2 className="font-bold text-xl">Retirada ou Entrega?</h2>
                <span className="text-sm">Consulte a taxa para entrega* </span>

                <GroupOptions type="simple">
                  <SimpleOption option="Entrega" nameField="isWithdrawal" />
                  <SimpleOption option="Retirada" nameField="isWithdrawal" />
                </GroupOptions>
              </GroupLabels>

              <DateField />
            </GroupLabels>

            <GroupLabels>
              <strong className="text-baseText text-lg">Seus dados:</strong>
              <TextField
                placeholder="Digite seu nome completo"
                nameField="NameInOrder"
                isOptinal
              />
              <CelField placeholder="Digte seu número de celular(WhatsApp)" />

              {isWithdrawal == "Entrega" && (
                <GroupLabels type="simple">
                  <strong className="text-baseText text-lg">
                    Dados p/ entrega:
                  </strong>
                  <TextField
                    placeholder="Digite o endereço para entrega"
                    nameField="deliveryAdress"
                  />
                  <TextField
                    placeholder="Digite o nome da pessoa que irá receber o bolinho"
                    nameField="NameDelivery"
                  />
                  <CelField placeholder="Digite o número de quem irá receber o bolinho" />
                </GroupLabels>
              )}
            </GroupLabels>
            <GroupLabels>
              <strong className=" text-baseText text-lg">
                Selecione o método de pagamento:
              </strong>
              <br />
              <span className="text-xs">
                Confirmamos seu pedido mediante pagamento antecipado 😊
              </span>
              <GroupOptions>
                <Options
                  nameField="formOfPaymentInOrder"
                  option="PIX"
                  // icon="iconPix"
                />
                <Options
                  nameField="formOfPaymentInOrder"
                  option="Cartão de Crédito"
                  optionDescribe="(+ taxa de 5%)"
                  // icon="iconCredt"
                />
                <Options
                  nameField="formOfPaymentInOrder"
                  option="TRANSFERÊNCIA BANCÁRIA"
                  optionDescribe="(BB e Caixa)"
                  // icon="iconTranf"
                />
              </GroupOptions>
            </GroupLabels>
            <GroupLabels>
              <Checkbox
                content="Estou ciente que o pedido será concluido via WhatsApp"
                nameField="awareOfWhatsApp"
              />
              <Checkbox
                content="Confirmo que revisei todas as informações"
                nameField="termsAccepted"
              />
            </GroupLabels>

            <Buttom />
          </form>
          {/* </div> */}
        </FormContainer>
      </FormBackground>
    </OrderContext.Provider>
  );
}
export default Form;
