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
          </div>
        </div>
      </FormContainer>
    </FormBackground>
  );
}

export default OrderSent;
