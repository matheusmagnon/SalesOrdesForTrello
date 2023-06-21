import { useState } from "react";

import styles from "./OrderSent.module.css";

import { ContainerForm } from "../Form/ContainerForm";
import { Wrapper } from "../Wrapper";

import { WhatsappLogo } from "phosphor-react";

import Form from "../Form/Form";

function OrderSent({ resume }: any) {
  const [orderIsCompleted, setOrderIsCompleted] = useState<boolean>(false);

  window.scrollTo(0, 0);

  if (orderIsCompleted == true) {
    return <Form />;
  }

  return (
    <Wrapper state={true}>
      <ContainerForm>
        <div className={styles.OrderSent}>
          <p>Sua solicitação foi registrada com sucesso!</p>
          <p>Iremos enviar os dados para pagamento através do WhatsApp ❤</p>
          <p></p>
          <div className={styles.GroupBottons}>
            <input
              type="submit"
              className={styles.ButtonNewOrder}
              value="Enviar Novo Pedido"
              onClick={() => {
                setOrderIsCompleted(true);
              }}
            />

            <button
              className={styles.ButtonChatWhatsApp}
              onClick={() => {
                window.open(
                  `https://api.whatsapp.com/send?phone=5563991069649&text=Oie, passando para avisar que fiz um pedido:%0A${resume}`,
                  "_blank"
                );
              }}
              type="button"
            >
              <WhatsappLogo size={30} className={styles.WhatsappLogo} />
              Sinalizar envio do pedido
            </button>
          </div>
        </div>
      </ContainerForm>
    </Wrapper>
  );
}

export default OrderSent;
