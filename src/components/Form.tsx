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

import { ContainerForm } from "./styled";
import { Main } from "./styled";
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

  return (
    <OrderContext.Provider value={{ order }}>
      <FormBackground>
        <FormContainer>
          <FormTitle> Pedido de BENTÔ CAKE (bolinho de 350g)</FormTitle>
          <div className="">
            <img src={menuBento} alt="Cardápio - Bentô Cake"></img>
          </div>
          <form
            onSubmit={handleSubmit(submitOrder)}
            encType="multipart/form-data"
            name="PedidosBento"
            data-netlify="true"
          >
            <GroupLabels>
              <span className="font-bold">Selecione o sabor do seu bolo:</span>
              <br />
              <GroupOptions>
                <Options
                  option="CHOCOLATUDO"
                  optionDescribe=" massa amanteigada de cacau, recheio de brigadeiro gourmet de chocolate meio amargo"
                />
                <Options
                  option="RED VELVET"
                  optionDescribe="  massa fofinha e aveludada de tom vermelho, saborizada com baunilha + cacau e recheio de cream cheese frosting"
                />
                <Options
                  option="LEITE NINHO"
                  optionDescribe="  massa amanteigada de baunilha e recheio de brigadeiro cremoso de leite ninho"
                />
              </GroupOptions>
            </GroupLabels>

            <GroupLabels>
              <TextField
                placeholder="Digite a cor base do seu bolo"
                {...register("cakeColor")}
              />

              {/* <p className={styles.errorMessage}>
                  {errors.cakeColor?.message}
                </p> */}

              <TextField
                placeholder="Digite a frase do bolinho (máximo 35 caracteres)"
                {...register("phraseOnTheCake")}
              />
              {/*              
              <p className={styles.errorMessage}>
                {errors.phraseOnTheCake?.message}
              </p>  */}

              <TextField
                placeholder="Digite a cor da frase"
                {...register("cakePhraseColor")}
              />

              {/* <p className={styles.errorMessage}>
                {errors.cakePhraseColor?.message}
              </p>  */}

              <TextField
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
                placeholder="Caso haja alguma observação descreva"
                {...register("orderObservation")}
              />
              <GroupLabels type="simple">
                <h2 className="font-bold ">Retirada Ou Entrega?</h2>
                <span className="text-sm">Consulte a taxa para entrega* </span>

                <GroupOptions type="simple">
                  <SimpleOption option="Entrega" />
                  <SimpleOption option="Retirada" />
                </GroupOptions>
              </GroupLabels>

              <DateField />
            </GroupLabels>
            <GroupLabels>
              <h2 className="font-bold mb-2">
                Aceita Vela? (custo adicional R$ 2):
              </h2>
              <GroupOptions type="simple">
                <SimpleOption option="Sim" {...register("candleInOrder")} />
                <SimpleOption option="Não" {...register("candleInOrder")} />
              </GroupOptions>
            </GroupLabels>

            <GroupLabels>
              <TextField placeholder="Digite seu nome completo" />
              <CelField placeholder="Número de celular(WhatsApp)" />
            </GroupLabels>

            {/* <div className={styles.fieldFlavor}>
              <strong>Selecione o sabor do seu bolo:</strong> <br />
              <div className={styles.flavorOptions}>
                <input
                  type="radio"
                  id="chocolatudo"
                  // name="flavorInOrder"
                  value="CHOCOLATUDO"
                  {...register("flavorInOrder")}
                />
                <label htmlFor="chocolatudo">
                  <h3>CHOCOLATUDO</h3>
                  <p>
                    massa amanteigada de cacau, recheio de brigadeiro gourmet de
                    chocolate meio amargo
                  </p>
                </label>
                <input
                  type="radio"
                  id="redVelvet"
                  // name="flavorInOrder"
                  value="RED VELVET"
                  {...register("flavorInOrder")}
                />
                <label htmlFor="redVelvet">
                  <h3>RED VELVET</h3>
                  <p>
                    massa fofinha e aveludada de tom vermelho, saborizada com
                    baunilha + cacau e recheio de cream cheese frosting
                  </p>
                </label>
                <input
                  type="radio"
                  id="leiteNinho"
                  // name="flavorInOrder"
                  value="LEITE NINHO"
                  {...register("flavorInOrder")}
                />
                <label htmlFor="leiteNinho">
                  <h3>LEITE NINHO</h3>
                  <p>
                    massa amanteigada de baunilha e recheio de brigadeiro
                    cremoso de leite ninho
                  </p>
                </label>
              </div>
              <p className={styles.errorMessage}>
                {errors.flavorInOrder?.message}
              </p>
            </div> */}

            <div className={styles.fieldIsWithdrawal}>
              <label className={styles.isWithdrawal}>
                <strong>Retirada ou Entrega:</strong>
              </label>
              <label>
                <input
                  type="radio"
                  // name="isWithdrawal"
                  value="Retirada"
                  // checked={isWithdrawal == 'Retirada'}
                  {...register("isWithdrawal", {
                    onChange: (e) => {
                      handleisWithdrawalChange(e);
                    },
                  })}
                />{" "}
                Retirada
              </label>
              <label>
                <input
                  type="radio"
                  // name="isWithdrawal"
                  value="Entrega"
                  {...register("isWithdrawal", {
                    onChange: (e) => {
                      handleisWithdrawalChange(e);
                    },
                  })}
                />{" "}
                Entrega (Consulte a taxa)
              </label>
              <p className={styles.errorMessage}>
                {errors.isWithdrawal?.message}
              </p>
            </div>
            {isWithdrawal == "Entrega" && (
              <div className={styles.fieldColorPhrase}>
                <label>
                  <strong>Endereço de Entrega:</strong>
                  <input
                    type="text"
                    // name="cakePhraseColor"
                    {...register("deliveryAdress")}
                    placeholder="Digite o endereço de entrega do Bentô Cake"
                    className={styles.inputFieldText}
                  />
                </label>
              </div>
            )}

            {/* <div className={styles.fieldCandle}>
              <label className="vela">
                <strong>Aceita vela? (custo adicional de 2 reais):</strong>
              </label>
              <label>
                <input
                  type="radio"
                  id="POST-velaSim"
                  // name="candleInOrder"
                  value="Sim"
                  {...register("candleInOrder")}
                />{" "}
                Sim
              </label>
              <label>
                <input
                  type="radio"
                  id="POST-velaNao"
                  // name="candleInOrder"
                  value="Não"
                  {...register("candleInOrder")}
                />{" "}
                Não
              </label>
              <p className={styles.errorMessage}>
                {errors.candleInOrder?.message}
              </p>
            </div> */}
            <div className={styles.fieldPayment}>
              <strong>Forma de Pagamento:</strong>
              <span>Confirmamos seu pedido mediante pagamento antecipado </span>

              <label>
                <input
                  type="radio"
                  id="PIX"
                  // name="formOfPaymentInOrder"
                  value="PIX"
                  {...register("formOfPaymentInOrder")}
                />{" "}
                PIX
              </label>
              <label>
                <input
                  type="radio"
                  id="CardCredit"
                  // name="formOfPaymentInOrder"
                  value="Cartão de Crédito"
                  {...register("formOfPaymentInOrder")}
                />{" "}
                Cartão de Crédito (+ taxa de 5%)
              </label>
              <label>
                <input
                  type="radio"
                  id="TransfBancaria"
                  // name="formOfPaymentInOrder"
                  value="TRANSFERÊNCIA"
                  {...register("formOfPaymentInOrder")}
                />{" "}
                TRANSFERÊNCIA BANCÁRIA (BB e CAIXA )
              </label>
              <p className={styles.errorMessage}>
                {errors.formOfPaymentInOrder?.message}
              </p>
            </div>

            <div className={styles.fieldAcceptance}>
              <label>
                <input
                  type="checkbox"
                  id="awareOfWhatsApp"
                  // value={true}
                  {...register("awareOfWhatsApp")}
                  // onChange={handleOnChange}
                />
                <span>
                  Estou ciente que o pedido será concluido via WhatsApp
                </span>
              </label>
              <p className={styles.errorMessage}>
                {errors.awareOfWhatsApp?.message}
              </p>

              <label>
                <input
                  type="checkbox"
                  id="accept"
                  // value={true}
                  {...register("termsAccepted")}
                  // onChange={handleOnChange}
                />
                <span>Confirmo que revisei todas as informações</span>
              </label>

              <p className={styles.errorMessage}>
                {errors.termsAccepted?.message}
              </p>
            </div>

            <input
              className={styles.buttomSendOrder}
              type="submit"
              value="Enviar Pedido pelo WhatsApp"
            />
          </form>
          {/* </div> */}
        </FormContainer>
      </FormBackground>
    </OrderContext.Provider>
  );
}
export default Form;
