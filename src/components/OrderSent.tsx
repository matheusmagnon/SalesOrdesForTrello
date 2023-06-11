import { useState } from 'react';

import styles from './OrderSent.module.css';

import { ContainerForm } from './styled';
import { Main } from './styled';

import { WhatsappLogo } from 'phosphor-react';

import Form from './Form';

type OrderSentProps = {
  resume: () => {};
};

function OrderSent() {
  const [orderIsCompleted, setOrderIsCompleted] = useState<boolean>(false);

  window.scrollTo(0, 0);

  if (orderIsCompleted == true) {
    return <Form />;
  }

  return (
    <Main state={true}>
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

            <a
              className={styles.ButtonChatWhatsApp}
              href=" https://api.whatsapp.com/send?phone=5563991069649&text=Oie, passando para avisar que fiz um pedido"
              type="button"
            >
              <WhatsappLogo size={30} className={styles.WhatsappLogo} />
              Sinalizar envio do pedido
            </a>
          </div>
        </div>
      </ContainerForm>
    </Main>
  );
}

export default OrderSent;
