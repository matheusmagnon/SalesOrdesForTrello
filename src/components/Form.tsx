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
import logo from "../_assets/images/logo.png";

import * as constants from "../constants/constants";

import { FormTitle } from "./Form/FormTitle";
import OrderSent from "./OrderSent";
import PreviewImageUpload from "./PreviewImageUpload";

import styles from "./Form.module.css";

import { FormContainer } from "./Form/FormContainer";
import { FormBackground } from "./Form/FormBackground";
// import { TextField } from "./Form/Fields/Text";
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
import { Footer } from "./Footer";

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
      // window.open(url, "_blank");

      window.location.assign(url);

      setIsSalesOrderIsCompleted(true);
    });
  };

  if (isSalesOrderIsCompleted == true) {
    return <OrderSent resume={resumeOrderState} />;
  }

  const { obj } = useContext(SalesOrderContext);

  return (
    <OrderContext.Provider value={{ order }}>
      <header className="w-11 xl:w-20">
        <img src={logo} />
      </header>
      <FormBackground>
        <FormContainer>
          <FormTitle>
            {" "}
            Faça seu orçamento de BENTÔ CAKE (bolinho de 350g)
          </FormTitle>

          <img
            className="flex w-full rounded-lg"
            src={menuBento}
            alt="Cardápio - Bentô Cake"
          ></img>

          <form
            onSubmit={handleSubmit(submitOrder)}
            encType="multipart/form-data"
            name="PedidosBento"
            data-netlify="true"
          >
            <div className="bg-baseCard border border-grupButtonsBorder p-2 mt-2 rounded-lg xl:flex xl:flex-col xl:items-center">
              <h1 className="font-bold text-baseText text-xl">
                Informações - Bentô Cake
              </h1>
              <ul className="xl:flex xl:flex-wrap">
                <li className="xl:pr-4"> • cobertura de buttercream</li>
                <li className="xl:pr-4">
                  • acompanha talher de madeira e embalagem biodegradáveis
                </li>
                <li className="xl:pr-4"> • 1 camada de recheio</li>
                <li className="xl:pr-4"> • 2 camadas de massa</li>
                <li className="xl:pr-4"> • 10 cm de diâmetro</li>
                <li className="xl:pr-4"> • serve 2 fatias</li>
              </ul>
            </div>
            {/* 
              <GroupLabels>
                <h1 className="font-bold text-baseText text-xl">COBERTURA</h1>
                <p>
                  pensando na qualidade e experiência gustativa, trabalhamos
                  exclusivamente com a cobertura buttercream de merengue suíco
                </p>
              </GroupLabels> */}
            {/* </div> */}
            <GroupLabels>
              <span className="font-bold text-baseText text-xl">
                Selecione o sabor do seu bolo:
              </span>
              <br />
              <GroupOptions>
                <div>
                  <input
                    type="radio"
                    // name={props.nameField}
                    defaultValue="CHOCOLATUDO"
                    className="hidden peer"
                    id="CHOCOLATUDO"
                    // className="hidden"
                    // id={props.option}
                    // value={props.option}
                    // type="radio"
                    {...register("flavorInOrder")}
                  />
                  <label
                    className="inline-flex w-full flex-col p-1 bg-fuchsia-950 cursor-pointer rounded-xl drop-shadow-lg
        peer-checked:bg-fuchsia-900 shadow-sm peer-checked:shadow-fuchsia-950  hover:bg-fuchsia-900"
                    htmlFor="CHOCOLATUDO"
                  >
                    <div>
                      <div className="flex-col items-center justify-center">
                        <h3 className="text-xl font-bold text-baseInput text-center">
                          CHOCOLATUDO
                        </h3>
                        <p className="text-baseInput text-center">
                          massa amanteigada de cacau, recheio de brigadeiro
                          gourmet de chocolate meio amargo
                        </p>
                      </div>
                    </div>
                  </label>
                </div>

                {/* <Options
                  nameField="flavorInOrder"
                  option="CHOCOLATUDO"
                  optionDescribe="massa amanteigada de cacau, recheio de brigadeiro gourmet de chocolate meio amargo"
                /> */}

                <div>
                  <input
                    type="radio"
                    // name={props.nameField}
                    defaultValue="RED VELVET"
                    className="hidden peer"
                    id="RED VELVET"
                    // className="hidden"
                    // id={props.option}
                    // value={props.option}
                    // type="radio"
                    {...register("flavorInOrder")}
                  />
                  <label
                    className="inline-flex w-full flex-col p-1 bg-fuchsia-950 cursor-pointer rounded-xl drop-shadow-lg
        peer-checked:bg-fuchsia-900 shadow-sm peer-checked:shadow-fuchsia-950  hover:bg-fuchsia-900"
                    htmlFor="RED VELVET"
                  >
                    <div>
                      <div>{/* <Bank size={20} /> */}</div>
                      <div className="flex-col items-center justify-center">
                        <h3 className="text-xl font-bold text-baseInput text-center">
                          RED VELVET
                        </h3>
                        <p className="text-baseInput text-center">
                          massa fofinha e aveludada de tom vermelho, saborizada
                          com baunilha + cacau e recheio de cream cheese
                          frosting
                        </p>
                      </div>
                    </div>
                  </label>
                  {/* <p className={styles.errorMessage}>{errors.flavorInOrder?.message}</p> */}
                </div>

                {/* <Options
                  nameField="flavorInOrder"
                  option="RED VELVET"
                  optionDescribe="  massa fofinha e aveludada de tom vermelho, saborizada com baunilha + cacau e recheio de cream cheese frosting"
                /> */}

                <div>
                  <input
                    type="radio"
                    // name={props.nameField}
                    defaultValue="LEITE NINHO"
                    className="hidden peer"
                    id="LEITE NINHO"
                    // className="hidden"
                    // id={props.option}
                    // value={props.option}
                    // type="radio"
                    {...register("flavorInOrder")}
                  />
                  <label
                    className="inline-flex w-full flex-col p-1 bg-fuchsia-950 cursor-pointer rounded-xl drop-shadow-lg
        peer-checked:bg-fuchsia-900 shadow-sm peer-checked:shadow-fuchsia-950  hover:bg-fuchsia-900"
                    htmlFor="LEITE NINHO"
                  >
                    <div>
                      <div>{/* <Bank size={20} /> */}</div>
                      <div className="flex-col items-center justify-center">
                        <h3 className="text-xl font-bold text-baseInput text-center">
                          LEITE NINHO
                        </h3>
                        <p className="text-baseInput text-center">
                          massa amanteigada de baunilha e recheio de brigadeiro
                          cremoso de leite ninho
                        </p>
                      </div>
                    </div>
                  </label>
                  {/* <p className={styles.errorMessage}>{errors.flavorInOrder?.message}</p> */}
                </div>
                {/* <Options
                  nameField="flavorInOrder"
                  option="LEITE NINHO"
                  optionDescribe="massa amanteigada de baunilha e recheio de brigadeiro cremoso de leite ninho"
                /> */}
              </GroupOptions>
              <p className="text-red-500 text-sm">
                {errors.flavorInOrder?.message}
              </p>
            </GroupLabels>

            <GroupLabels>
              {/* <TextField
                nameField="cakeColor"
                placeholder="Digite a cor base do seu bolo"
                {...register("cakeColor")}
              /> */}
              <div className="xl:w-48">
                {/* <label> */}
                <input
                  type="text"
                  id="POST-name"
                  // defaultValue=""
                  // name={props.nameField}
                  // name="nameInOrder"
                  //   {...register("nameInOrder")}
                  placeholder="Digite a cor base do seu bolo"
                  {...register("cakeColor")}
                  // autoFocus
                  className="bg-baseInput  border border-baseButton  text-baseText  placeholder-baseLabel text-base xl:text-sm rounded-lg
                   focus:ring-yellow-300 focus:border-yellow-300 block w-full p-2"
                />
                {/* </label> */}
                <p className="text-red-500 text-sm">
                  {errors.cakeColor?.message}
                </p>
                {/* <p className={styles.errorMessage}>{errors.nameInOrder?.message}</p> */}
              </div>

              {/* <TextField
                nameField="phraseOnTheCake"
                placeholder="Digite a frase do bolinho (máximo 35 caracteres)"
                {...register("phraseOnTheCake")}
              /> */}

              <div className="xl:w-72">
                {/* <label> */}
                <input
                  type="text"
                  id="POST-name"
                  // defaultValue=""
                  // name={props.nameField}
                  // name="nameInOrder"
                  //   {...register("nameInOrder")}
                  placeholder="Digite a frase do bolo (máx. 35 caracteres)"
                  {...register("phraseOnTheCake")}
                  // autoFocus
                  className="bg-baseInput  border border-baseButton  text-baseText placeholder-baseLabel text-base xl:text-sm rounded-lg
                   focus:ring-yellow-300 focus:border-yellow-300 block w-full p-2 "
                />
                {/* </label> */}
                <p className="text-red-500 text-sm">
                  {errors.phraseOnTheCake?.message}
                </p>
              </div>
              {/*              
              <p className={styles.errorMessage}>
                {errors.phraseOnTheCake?.message}
              </p>  */}

              {/* <TextField
                nameField="cakePhraseColor"
                placeholder="Digite a cor da frase"
                {...register("cakePhraseColor")}
              /> */}
              <div className="xl:w-36">
                {/* <label> */}
                <input
                  type="text"
                  id="POST-name"
                  // defaultValue=""
                  // name={props.nameField}
                  // name="nameInOrder"
                  //   {...register("nameInOrder")}
                  placeholder="Digite a cor da frase"
                  {...register("cakePhraseColor")}
                  // autoFocus
                  className="bg-baseInput  border border-baseButton  text-baseText placeholder-baseLabel text-base xl:text-sm rounded-lg
                   focus:ring-yellow-300 focus:border-yellow-300 block w-full p-2"
                />
                <p className="text-red-500 text-sm">
                  {errors.cakePhraseColor?.message}
                </p>
                {/* </label> */}
              </div>

              {/* <p className={styles.errorMessage}>
                {errors.cakePhraseColor?.message}
              </p>  */}

              {/* <TextField
                nameField="drawingOnTheCake"
                placeholder="Se houver desenho descreva"
                {...register("drawingOnTheCake")}
              /> */}

              <div className="xl:w-64">
                {/* <label> */}
                <input
                  type="text"
                  id="POST-name"
                  // defaultValue=""
                  // name={props.nameField}
                  // name="nameInOrder"
                  //   {...register("nameInOrder")}
                  placeholder="Se houver desenho descreva detalhadamente"
                  {...register("drawingOnTheCake")}
                  // autoFocus
                  className="bg-baseInput  border border-baseButton  text-baseText placeholder-baseLabel text-sm rounded-lg
                   focus:ring-yellow-300 focus:border-yellow-300 block w-full p-2"
                />
                {/* </label> */}
              </div>
              <div className="w-full">
                {/* <label> */}
                <input
                  type="text"
                  id="POST-name"
                  // defaultValue=""
                  // name={props.nameField}
                  // name="nameInOrder"
                  //   {...register("nameInOrder")}
                  placeholder="Caso haja alguma observação descreva"
                  {...register("orderObservation")}
                  // autoFocus
                  className="bg-baseInput  border border-baseButton  text-baseText placeholder-baseLabel text-base xl:text-sm rounded-lg
                   focus:ring-yellow-300 focus:border-yellow-300 block w-full p-2"
                />
                {/* </label> */}
              </div>

              {/* <UploadImages /> */}
              <div className="xl:w-36">
                <label className="bg-fuchsia-950 p-2 text-white block rounded-xl cursor-pointer text-center duration-75">
                  Caso haja alguma imagem de inspiração anexe aqui
                  <input
                    className="hidden"
                    type="file"
                    multiple
                    accept="image/*"
                    // name="filesInOrder"
                    {...register("filesInOrder", {
                      onChange: (e) => {
                        getImagesToUpload(e);
                      },
                    })}
                  />
                </label>
                <div className="xl:w-96">
                  <div className="w-full flex flex-wrap space-x-4">
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
              </div>

              {/* <TextField
                nameField="orderObservation"
                placeholder="Caso haja alguma observação descreva"
                {...register("orderObservation")}
              /> */}

              <GroupLabels simple>
                <h2 className="font-bold text-baseText text-xl">
                  Precisa de Vela?
                </h2>
                <span className="text-sm">(sem custo adicional)</span>
                <GroupOptions simple>
                  {/* <SimpleOption
                    option="Sim"
                    {...register("candleInOrder")}
                    nameField="candleInOrder"
                  /> */}
                  <li>
                    <input
                      type="radio"
                      // name={props.nameField}
                      defaultValue="Sim"
                      className="hidden peer"
                      id="Sim"
                      {...register("candleInOrder")}
                    />

                    <label
                      className="inline-flex items-center justify-between p-2 text-white bg-fuchsia-950 border-gray-200 rounded-xl 
                      cursor-pointer peer-checked:bg-fuchsia-900 shadow-sm peer-checked:shadow-fuchsia-950  hover:bg-fuchsia-800"
                      htmlFor="Sim"
                    >
                      {" "}
                      Sim
                    </label>
                  </li>

                  {/* <SimpleOption
                    option="Não"
                    {...register("candleInOrder")}
                    nameField="candleInOrder"
                  /> */}

                  <li>
                    <input
                      type="radio"
                      // name={props.nameField}
                      defaultValue="Não"
                      className="hidden peer"
                      id="Não"
                      {...register("candleInOrder")}
                    />

                    <label
                      className="inline-flex items-center justify-between p-2 text-white bg-fuchsia-950 border-gray-200 rounded-xl 
                      cursor-pointer peer-checked:bg-fuchsia-900 shadow-sm peer-checked:shadow-fuchsia-950  hover:bg-fuchsia-800"
                      htmlFor="Não"
                    >
                      Não
                    </label>
                  </li>
                </GroupOptions>
                <p className="text-red-500 text-sm">
                  {errors.candleInOrder?.message}
                </p>
              </GroupLabels>
              <GroupLabels simple>
                <h2 className="font-bold text-xl">Retirada ou Entrega?</h2>
                <span className="text-sm">Consulte a taxa para entrega* </span>

                <GroupOptions simple>
                  <li>
                    <input
                      type="radio"
                      // name={props.nameField}
                      defaultValue="Entrega"
                      className="hidden peer"
                      id="Entrega"
                      // onClick={handleOption}
                      {...register("isWithdrawal", {
                        onChange: (e) => {
                          handleisWithdrawalChange(e);
                        },
                      })}
                      // name="candleInOrder"
                      // defaultValue={props.option}
                      // onChange={(e) => {
                      //   console.log(event?.target);
                      // }}
                    />

                    <label
                      className="inline-flex items-center justify-between p-2 text-white bg-fuchsia-950 border-gray-200 rounded-xl 
                      cursor-pointer peer-checked:bg-fuchsia-900 shadow-sm peer-checked:shadow-fuchsia-950  hover:bg-fuchsia-800"
                      htmlFor="Entrega"
                    >
                      Entrega
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      // name={props.nameField}
                      defaultValue="Retirada"
                      className="hidden peer"
                      id="Retirada"
                      // onClick={handleOption}
                      {...register("isWithdrawal", {
                        onChange: (e) => {
                          handleisWithdrawalChange(e);
                        },
                      })}
                      // name="candleInOrder"
                      // defaultValue={props.option}
                      // onChange={(e) => {
                      //   console.log(event?.target);
                      // }}
                    />

                    <label
                      className="inline-flex items-center justify-between p-2 text-white bg-fuchsia-950 border-gray-200 rounded-xl 
                      cursor-pointer peer-checked:bg-fuchsia-900 shadow-sm peer-checked:shadow-fuchsia-950  hover:bg-fuchsia-800"
                      htmlFor="Retirada"
                    >
                      Retirada
                    </label>
                  </li>
                  {/* <SimpleOption option="Entrega" nameField="isWithdrawal" /> */}
                  {/* <SimpleOption option="Retirada" nameField="isWithdrawal" /> */}
                </GroupOptions>
                <p className="text-red-500 text-sm">
                  {errors.isWithdrawal?.message}
                </p>
              </GroupLabels>

              {/* <DateField /> */}
              <div className="bg-baseInput  border border-baseButton  text-baseText placeholder-baseLabel text-sm rounded-lg p-2 flex-col">
                <div>
                  <strong className="text-xl">
                    Selecione a data e horário da {isWithdrawal}:
                  </strong>
                  {/* {isWithdrawal} */}
                </div>
                <div>
                  <span>Segunda à Sexta das 12:00 às 18:30</span>
                </div>
                <div>
                  <span>SÁBADO 10:00 às 12:00</span>
                </div>

                <input
                  className="bg-fuchsia-950 p-2  rounded-xl text-white"
                  type="datetime-local"
                  defaultValue={getDateNow()}
                  // name="dateTimeInOrder"
                  {...register("dateTimeInOrder", {
                    value: getDateNow(),
                  })}
                />
                <p className="text-red-500 ltext-sm">
                  {erroIsWithdrawalOrDelivery()}
                </p>
              </div>
            </GroupLabels>

            <GroupLabels>
              {/* <TextField
                placeholder="Digite seu nome completo"
                nameField="NameInOrder"
                isOptinal
              /> */}

              <div className="space-y-2">
                <strong className="text-baseText text-lg">Seus dados:</strong>
                <div className="w-72">
                  {/* <label> */}
                  <input
                    type="text"
                    id="POST-name"
                    // defaultValue=""
                    // name={props.nameField}
                    // name="nameInOrder"
                    //   {...register("nameInOrder")}
                    placeholder="Digite seu nome completo"
                    {...register("nameInOrder")}
                    // autoFocus
                    className="bg-baseInput  border border-baseButton  text-baseText placeholder-baseLabel text-base xl:text-sm rounded-lg
                   focus:ring-yellow-300 focus:border-yellow-300 block w-full p-2"
                  />
                  {/* </label> */}
                  <p className="text-red-500 text-sm">
                    {errors.nameInOrder?.message}
                  </p>
                </div>

                {/* <CelField placeholder="Digte seu número de celular(WhatsApp)" /> */}

                <div>
                  {/* <label> */}
                  <input
                    type="tel"
                    id="POST-celular"
                    // name="celInOrder"
                    {...register("celInOrder")}
                    placeholder="Digte seu número de celular(WhatsApp)"
                    className="bg-baseInput  border border-baseButton  text-baseText placeholder-baseLabel text-base xl:text-sm rounded-lg
                focus:ring-yellow-300 focus:border-yellow-300 block w-full p-2"
                  />
                  {/* </label> */}

                  <p className="text-red-500 text-sm">
                    {errors.celInOrder?.message}
                  </p>
                </div>
              </div>

              {isWithdrawal == "Entrega" && (
                <div>
                  <strong className="text-baseText text-lg">
                    Dados p/ entrega:
                  </strong>
                  {/* <TextField
                    placeholder="Digite o endereço para entrega"
                    nameField="deliveryAdress"
                  /> */}
                  <div className="xl:w-96 space-y-2">
                    <div>
                      {/* <label> */}
                      <input
                        type="text"
                        // id="POST-name"
                        // defaultValue=""
                        // name={props.nameField}
                        // name="nameInOrder"
                        {...register("deliveryAdress")}
                        placeholder="Digite o endereço para entrega"
                        // autoFocus
                        className="bg-baseInput  border border-baseButton  text-baseText placeholder-baseLabel text-base xl:text-sm rounded-lg
                   focus:ring-yellow-300 focus:border-yellow-300 block w-full p-2"
                      />
                      {/* </label> */}
                      {/* <p className={styles.errorMessage}>{errors.nameInOrder?.message}</p> */}
                    </div>
                    {/* <TextField
                    placeholder="Digite o nome da pessoa que irá receber o bolinho"
                    nameField="NameDelivery"
                  /> */}
                    <div>
                      {/* <label> */}
                      <input
                        type="text"
                        id="POST-name"
                        // defaultValue=""
                        // name={props.nameField}
                        // name="nameInOrder"
                        {...register("deliveryName")}
                        placeholder="Digite o nome da pessoa que irá receber o bentô"
                        // autoFocus
                        className="bg-baseInput  border border-baseButton  text-baseText placeholder-baseLabel text-sm rounded-lg
                   focus:ring-yellow-300 focus:border-yellow-300 block w-full p-2"
                      />
                      {/* </label> */}
                      {/* <p className={styles.errorMessage}>{errors.nameInOrder?.message}</p> */}
                    </div>
                    {/* <CelField placeholder="Digite o número de quem irá receber o bolinho" /> */}

                    <div>
                      {/* <label> */}
                      <input
                        type="text"
                        id="POST-name"
                        // defaultValue=""
                        // name={props.nameField}
                        // name="nameInOrder"
                        {...register("deliveryPhone")}
                        placeholder="Digite o número de quem irá receber o bolinho"
                        // autoFocus
                        className="bg-baseInput  border border-baseButton  text-baseText placeholder-baseLabel text-sm rounded-lg
                   focus:ring-yellow-300 focus:border-yellow-300 block w-full p-2"
                      />
                      {/* </label> */}
                      {/* <p className={styles.errorMessage}>{errors.nameInOrder?.message}</p> */}
                    </div>
                  </div>
                </div>
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
                {/* <Options
                  nameField="formOfPaymentInOrder"
                  option="PIX"
                  // icon="iconPix"
                /> */}
                <div>
                  <input
                    type="radio"
                    // name="PIX"
                    defaultValue="PIX"
                    className="hidden peer"
                    id="PIX"
                    // className="hidden"
                    // id={props.option}
                    // value={props.option}
                    // type="radio"
                    {...register("formOfPaymentInOrder")}
                  />
                  <label
                    className="inline-flex w-full flex-col p-2 bg-fuchsia-950 cursor-pointer rounded-xl drop-shadow-lg
        peer-checked:bg-fuchsia-900 shadow-sm peer-checked:shadow-fuchsia-950  hover:bg-fuchsia-900"
                    htmlFor="PIX"
                  >
                    <div>
                      <div>{/* <Bank size={20} /> */}</div>
                      <div className="flex-col items-center justify-center">
                        <h3 className="text-xl font-bold text-baseInput text-center">
                          PIX
                        </h3>
                        <p className="text-baseInput text-center">
                          (Iremos passar a chave pelo WhatsApp)
                        </p>
                      </div>
                    </div>
                  </label>
                  {/* <p className={styles.errorMessage}>{errors.flavorInOrder?.message}</p> */}
                </div>
                {/* <Options
                  nameField="formOfPaymentInOrder"
                  option="Cartão de Crédito"
                  optionDescribe="(+ taxa de 5%)"
                  // icon="iconCredt"
                /> */}
                <div>
                  <input
                    type="radio"
                    // name="PIX"
                    defaultValue="Cartão de Crédito"
                    className="hidden peer"
                    id="Cartão de Crédito"
                    // className="hidden"
                    // id={props.option}
                    // value={props.option}
                    // type="radio"
                    {...register("formOfPaymentInOrder")}
                  />
                  <label
                    className="inline-flex w-full flex-col p-2 bg-fuchsia-950 cursor-pointer rounded-xl drop-shadow-lg
        peer-checked:bg-fuchsia-900 shadow-sm peer-checked:shadow-fuchsia-950  hover:bg-fuchsia-900"
                    htmlFor="Cartão de Crédito"
                  >
                    <div>
                      <div>{/* <Bank size={20} /> */}</div>
                      <div className="flex-col items-center justify-center">
                        <h3 className="text-xl font-bold text-baseInput text-center">
                          Cartão de Crédito (por link)
                        </h3>
                        <p className="text-baseInput text-center">
                          (+ taxa de 5% )
                        </p>
                      </div>
                    </div>
                  </label>
                  {/* <p className={styles.errorMessage}>{errors.flavorInOrder?.message}</p> */}
                </div>
                {/* <Options
                  nameField="formOfPaymentInOrder"
                  option="TRANSFERÊNCIA BANCÁRIA"
                  optionDescribe="(BB e Caixa)"
                  // icon="iconTranf"
                /> */}

                <div>
                  <input
                    type="radio"
                    // name="PIX"
                    defaultValue="TRANSFERÊNCIA BANCÁRIA"
                    className="hidden peer"
                    id="TRANSFERÊNCIA BANCÁRIA"
                    // className="hidden"
                    // id={props.option}
                    // value={props.option}
                    // type="radio"
                    {...register("formOfPaymentInOrder")}
                  />
                  <label
                    className="inline-flex w-full flex-col p-2 bg-fuchsia-950 cursor-pointer rounded-xl drop-shadow-lg
        peer-checked:bg-fuchsia-900 shadow-sm peer-checked:shadow-fuchsia-950  hover:bg-fuchsia-900"
                    htmlFor="TRANSFERÊNCIA BANCÁRIA"
                  >
                    <div>
                      <div>{/* <Bank size={20} /> */}</div>
                      <div className="flex-col items-center justify-center">
                        <h3 className="text-xl font-bold text-baseInput text-center">
                          Transferência Bancária
                        </h3>
                        <p className="text-baseInput text-center">
                          (BB e Caixa)
                        </p>
                      </div>
                    </div>
                  </label>
                  <p className="text-red-500 text-sm pt-1">
                    {errors.formOfPaymentInOrder?.message}
                  </p>
                </div>
              </GroupOptions>
            </GroupLabels>
            <div className="bg-baseCard border border-grupButtonsBorder p-2 rounded-lg mt-2 xl:flex-col ">
              {/* <Checkbox
                content="Estou ciente que o pedido será concluido via WhatsApp"
                nameField="awareOfWhatsApp"
              /> */}
              <div>
                <label>
                  <input
                    className="accent-fuchsia-900 focus:accent-fuchsia-900"
                    type="checkbox"
                    id="accept"
                    //   value={true}
                    {...register("awareOfWhatsApp")}
                    // onChange={handleOnChange}
                  />
                  <span className="pl-1 text-end">
                    Estou ciente que o pedido será concluido via WhatsApp
                  </span>
                  {/* Estou ciente que o pedido será concluido via WhatsApp */}
                </label>
                <p className="text-red-500 text-sm pt-1">
                  {errors.awareOfWhatsApp?.message}
                </p>
              </div>

              {/* <Checkbox
                content="Confirmo que revisei todas as informações"
                nameField="termsAccepted"
              /> */}
              <div>
                <label>
                  <input
                    className="accent-fuchsia-900 focus:accent-fuchsia-900"
                    type="checkbox"
                    id="termsAccepted"
                    //   value={true}
                    {...register("termsAccepted")}
                    // onChange={handleOnChange}
                  />
                  <span className="pl-1 text-end">
                    Confirmo que revisei todas as informações
                  </span>
                  {/* Estou ciente que o pedido será concluido via WhatsApp */}
                </label>
                <p className="text-red-500 text-sm pt-1">
                  {errors.termsAccepted?.message}
                </p>
              </div>
            </div>

            {/* <Buttom /> */}
            <input
              // onClick={(e) => {
              //   console.log(e);
              // }}
              className="bg-fuchsia-950 rounded-md px-4 py-1 mt-3 text-xl text-white cursor-pointer"
              // className={styles.buttomSendOrder}
              type="submit"
              value="Enviar informações pelo WhatsApp"
            />
          </form>
          {/* </div> */}
        </FormContainer>
      </FormBackground>
      <Footer />
    </OrderContext.Provider>
  );
}
export default Form;
