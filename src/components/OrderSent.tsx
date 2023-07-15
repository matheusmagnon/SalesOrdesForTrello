import { useState } from "react";

import styles from "./OrderSent.module.css";

import { ContainerForm } from "./styled";
import { Main } from "./styled";

// import { Target, WhatsappLogo } from "phosphor-react";

import Form from "./Form";
import { FormBackground } from "./Form/FormBackground";
import { FormContainer } from "./Form/FormContainer";

function OrderSent({ resume }: any) {
  const [orderIsCompleted, setOrderIsCompleted] = useState<boolean>(false);

  window.scrollTo(0, 0);

  if (orderIsCompleted == true) {
    return <Form />;
  }

  return (
    <FormBackground orderSent>
      <FormContainer onderSent>
        <div className={styles.OrderSent}>
          <p>Sua solicitação foi registrada com sucesso!</p>
          <p>Iremos enviar os dados para pagamento através do WhatsApp ❤</p>
          <p></p>
          <div className="px-4">
            <input
              type="submit"
              className="bg-fuchsia-950 rounded-md w-full py-1 mt-2 text-white cursor-pointer"
              value="Enviar Novo Pedido"
              onClick={() => {
                setOrderIsCompleted(true);
              }}
            />

            {/* <button */}
            {/* // className=" flex items-center gap-5  bg-green-700 rounded-md w-full px-4 py-1 mt-2 text-white cursor-pointer" */}
            {/* // onClick={() => { */}
            {/* // window.open( */}
            {/* // `https://api.whatsapp.com/send?phone=5563991069649&text=Oie, passando para avisar que fiz um pedido:%0A${resume}`, */}
            {/* // "_blank" */}
            {/* // ); */}
            {/* // }} */}
            {/* // type="button" */}
            {/* // > */}
            {/* <WhatsappLogo size={30} className="" /> */}
            {/* Sinalizar envio do pedido */}
            {/* </button> */}
          </div>
        </div>
      </FormContainer>
    </FormBackground>
  );
}

export default OrderSent;
