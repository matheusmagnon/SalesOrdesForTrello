import { useForm, FormProvider } from "react-hook-form";
import { Fragment, useContext, useEffect, useRef, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import makeAPICall from "../../utils/makeAPICall";
import SendAttachment from "../../services/SendAttachment";
import postCustomFields from "../../services/postCustomFields";
import { DataOrder } from "../../types";
import createBodyCard from "../../services/createBodyCard";
import getId from "../../utils/getId";

import menuBento from "../../_assets/images/menuBento.png";
import logo from "../../_assets/images/logo.png";

import * as constants from "../../constants/constants";
import { validationScheme } from "../../services/validationsSchema";

import { FormTitle } from "./FormTitle";

import { FormContainer } from "./FormContainer";
import { FormBackground } from "./FormBackground";
import { TextField } from "./Fields/Text";
import { GroupLabels } from "./GroupLabels";
import { UploadImages } from "./Fields/UploadImages";
import { Option } from "./Fields/Option";
import { DateField } from "./Fields/Date";
import { SimpleOption } from "./Fields/SimpleOption";
import { GroupOptions } from "./GroupOptions";
import { Checkbox } from "./Fields/Checkbox";
import { Buttom } from "./Buttom";

import { Footer } from "../Footer/Footer";
import { About } from "./Fields/About/About";
import { Modal } from "../Modal/Modal";
import { OrderContext } from "../../context/SalesOrderContext";

import { createClient } from "@supabase/supabase-js";
import getDateNow from "../../utils/getDateNow";

interface ImagesLinksType {
  links: string[];
}

export function Form() {
  const flavorsRef = useRef<null | HTMLDivElement>(null);
  const [imageLinks, setImageLinks] = useState<{}>();

  const { urlTrelloPostCard } = constants;
  const validateOrder = yup.object().shape(validationScheme);

  const {
    isWithdrawal,
    isSalesOrderIsCompleted,
    setIsSalesOrderIsCompleted,
    imagesBento,
  } = useContext(OrderContext);

  const reactHookFormMethods = useForm<DataOrder>({
    resolver: yupResolver(validateOrder),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = reactHookFormMethods;

  console.log(imagesBento);

  const supabase = createClient(
    "https://wnsxretzoexjewupnzef.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Induc3hyZXR6b2V4amV3dXBuemVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA1ODgzMDUsImV4cCI6MjAwNjE2NDMwNX0.6kZf5xZZAZxk5vFUdV0hEP91TqpYmxHKNqbx8XPjnAk"
  );

  const imagelink = imagesBento.map((file) => {
    const sendToStorage = async () => {
      const { data, error } = await supabase.storage
        .from("imagesBentoCake")
        .upload(`bentos/${file.size}${file.name}`, file, {
          cacheControl: "3600",
          upsert: false,
        });
      return data;
    };
    sendToStorage();

    const { data: image_url } = supabase.storage
      .from("imagesBentoCake")
      .getPublicUrl(`bentos/${file.size}${file.name}`);

    const { publicUrl } = image_url;
    return publicUrl;
  });
  useEffect(() => {
    setImageLinks(imagelink);
  }, [imagesBento]);

  const submitOrder = (dataOrder: DataOrder) => {
    const dateInOrder = () => {
      const DateBento = new Date(dataOrder.dateTimeInOrder);

      let date = `${DateBento.getFullYear()}-${(DateBento.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${DateBento.getDate().toString().padStart(2, "0")}`;

      let time = `${DateBento.getHours()
        .toString()
        .padStart(2, "0")}:${DateBento.getMinutes()
        .toString()
        .padStart(2, "0")}`;

      return `${date}T${time}`;
    };

    const sendToSupabase = async () => {
      const supabase = createClient(
        "https://wnsxretzoexjewupnzef.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Induc3hyZXR6b2V4amV3dXBuemVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA1ODgzMDUsImV4cCI6MjAwNjE2NDMwNX0.6kZf5xZZAZxk5vFUdV0hEP91TqpYmxHKNqbx8XPjnAk"
      );
      const { data, error } = await supabase
        .from("Orders")
        .insert({
          // "id": 1,
          created_at: getDateNow(),
          customer_name: dataOrder.nameInOrder,
          customer_mobile: dataOrder.celInOrder,
          phrase_on_the_cake: dataOrder.phraseOnTheCake,
          drawing_on_the_cake: dataOrder.drawingOnTheCake,
          cake_phrase_color: dataOrder.cakePhraseColor,
          cake_color: dataOrder.cakeColor,
          is_withdrawal: dataOrder.isWithdrawal == "Retirada" ? true : false,
          order_observation: dataOrder.orderObservation,
          candleIn_order: dataOrder.candleInOrder == "Sim" ? true : false,
          flavor_in_order: dataOrder.flavorInOrder,
          form_of_paymentIn_order: dataOrder.formOfPaymentInOrder,
          files_in_order: imageLinks,
          date_time_in_order: dateInOrder(),
          delivery_adress: dataOrder.deliveryAdress,
          delivery_phone: dataOrder.deliveryPhone,
        })
        .select();
    };
    sendToSupabase().then((data) => {
      console.log(data);
    });
    async function CreateCard() {
      const response = await makeAPICall(
        urlTrelloPostCard,
        createBodyCard(dataOrder)
      );
      const idCard: number = await getId(response);
      SendAttachment(dataOrder.filesInOrder, idCard);
      postCustomFields(dataOrder, idCard);
    }
    CreateCard().then(() => {
      setIsSalesOrderIsCompleted(true);
      setTimeout(() => {
        let resumeOrder = createBodyCard(dataOrder).descWhatsApp;
        let url = `https://api.whatsapp.com/send?phone=5563991069649&text=Oie, segue meu pedido:%0A${resumeOrder}`;
        window.location.assign(url);
      }, 5000);
    });
  };

  // If erro in flavor scroll to field
  useEffect(() => {
    if (errors.flavorInOrder?.message) {
      flavorsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [errors]);

  return (
    <>
      <header className="w-11 xl:w-20">
        <img src={logo} />
      </header>
      <FormBackground>
        <FormContainer>
          <FormTitle>Solicite seu BENTÔ CAKE (bolinho de 350g)</FormTitle>

          {isSalesOrderIsCompleted && (
            <Modal
              titleDialog="Você está sendo redirecionado..."
              contentDialog="Seu WhatApp irá abrir com resumo da sua solicitação 🤞"
              isLoading
            />
          )}
          <img
            className="flex w-full rounded-lg"
            src={menuBento}
            alt="Cardápio - Bentô Cake"
          ></img>

          <FormProvider {...reactHookFormMethods}>
            <form
              onSubmit={handleSubmit(submitOrder)}
              encType="multipart/form-data"
              name="PedidosBento"
              data-netlify="true"
            >
              <About title="Informações - Bentô Cake" />

              <GroupLabels
                ref={flavorsRef}
                title="Selecione o sabor do seu bolo:"
              >
                <GroupOptions>
                  <Option
                    nameField="flavorInOrder"
                    option="CHOCOLATUDO"
                    optionDescribe="massa amanteigada de cacau, recheio de brigadeiro
                            gourmet de chocolate meio amargo"
                  />

                  <Option
                    nameField="flavorInOrder"
                    option="RED VELVET"
                    optionDescribe="massa fofinha e aveludada de tom vermelho,
                    saborizada com baunilha + cacau e recheio de cream
                    cheese frosting"
                  />

                  <Option
                    nameField="flavorInOrder"
                    option="LEITE NINHO"
                    optionDescribe="massa amanteigada de baunilha e recheio de
                    brigadeiro cremoso de leite ninho"
                  />
                </GroupOptions>
                {errors.flavorInOrder?.message && (
                  <p className="text-red-500 text-sm">
                    {errors.flavorInOrder?.message}
                  </p>
                )}
              </GroupLabels>

              <GroupLabels>
                <TextField
                  className="xl:w-48"
                  placeholder="Digite a cor base do seu bolo"
                  nameField="cakeColor"
                />

                <TextField
                  className="xl:w-72"
                  placeholder="Digite a frase do bolo (máx. 35 caracteres)"
                  nameField="phraseOnTheCake"
                />

                <TextField
                  className="xl:w-36"
                  placeholder="Digite a cor da frase"
                  nameField="cakePhraseColor"
                />

                <TextField
                  className="xl:w-60"
                  placeholder="Se houver desenho descreva detalhadamente"
                  nameField="drawingOnTheCake"
                />

                <TextField
                  className="w-full"
                  placeholder="Caso haja alguma observação descreva"
                  nameField="orderObservation"
                />

                <UploadImages />

                <GroupLabels
                  simple
                  title="Precisa de Vela?"
                  describe="(sem custo adicional)"
                >
                  <GroupOptions simple>
                    <SimpleOption nameField="candleInOrder" option="Sim" />
                    <SimpleOption nameField="candleInOrder" option="Não" />
                  </GroupOptions>
                  <p className="text-red-500 text-sm">
                    {errors.candleInOrder?.message}
                  </p>
                </GroupLabels>

                <GroupLabels
                  simple
                  title="Retirada ou Entrega?"
                  describe=" Consulte a taxa para entrega*"
                >
                  <GroupOptions simple>
                    <SimpleOption nameField="isWithdrawal" option="Retirada" />
                    <SimpleOption nameField="isWithdrawal" option="Entrega" />
                  </GroupOptions>
                  <p className="text-red-500 text-sm">
                    {errors.isWithdrawal?.message}
                  </p>
                </GroupLabels>

                <DateField />
              </GroupLabels>

              <GroupLabels>
                <div className="space-y-2">
                  <strong className="text-baseText text-lg">Seus dados:</strong>

                  <TextField
                    nameField="nameInOrder"
                    placeholder="Digite seu nome completo"
                    className="xl:w-80"
                  />

                  <TextField
                    nameField="celInOrder"
                    placeholder="Digte seu número de celular(WhatsApp)"
                    className="xl:w-80"
                  />
                </div>

                {isWithdrawal == "Entrega" && (
                  <div className="space-y-2 w-80">
                    <strong className="text-baseText text-lg">
                      Dados p/ entrega:
                    </strong>
                    <TextField
                      placeholder="Digite o endereço para entrega"
                      nameField="deliveryAdress"
                      // className="xl:w-96"
                    />
                    <TextField
                      nameField="deliveryName"
                      placeholder="Digite o nome da pessoa que irá receber o bentô"
                    />
                    <TextField
                      nameField="deliveryPhone"
                      placeholder="Digite o número de quem irá receber o bolinho"
                    />
                  </div>
                )}
              </GroupLabels>
              <GroupLabels
                title="Selecione o método de pagamento:"
                describe="Confirmamos seu pedido mediante pagamento antecipado 😊"
              >
                <GroupOptions>
                  <Option
                    nameField="formOfPaymentInOrder"
                    option="PIX"
                    optionDescribe="(Iremos passar a chave pelo WhatsApp)"
                  />
                  <Option
                    nameField="formOfPaymentInOrder"
                    option="Cartão de Crédito"
                    optionDescribe=" (+ taxa de 5% )"
                  />
                  <Option
                    nameField="formOfPaymentInOrder"
                    option="TRANSFERÊNCIA BANCÁRIA"
                    optionDescribe="(BB e Caixa)"
                  />

                  <p className="text-red-500 text-sm pt-1">
                    {errors.formOfPaymentInOrder?.message}
                  </p>
                </GroupOptions>
              </GroupLabels>
              <div className="bg-baseCard border border-grupButtonsBorder p-2 rounded-lg mt-2 xl:flex-col ">
                <Checkbox
                  content="Estou ciente que o pedido será concluido via WhatsApp"
                  nameField="awareOfWhatsApp"
                />

                <Checkbox
                  content="Confirmo que revisei todas as informações"
                  nameField="termsAccepted"
                />
              </div>

              <Buttom content="Enviar informações pelo WhatsApp" />
            </form>
          </FormProvider>
        </FormContainer>
      </FormBackground>
      {/* <Footer /> */}
    </>
  );
}
export default Form;
