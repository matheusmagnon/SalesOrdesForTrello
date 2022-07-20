import { useState } from 'react';

import styles from './OrderSent.module.css';

import { ContainerForm } from './styled';
import { Main } from './styled';

import Form from './Form';
import renderComponent from './renderComponent';

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
          <p>Vamos concluir seu atendimento pelo WhatsApp ❤</p>
          <input
            type="submit"
            className={styles.ButtonNewOrder}
            value="Enviar Novo Pedido"
            onClick={() => {
              setOrderIsCompleted(true);
            }}
          />
        </div>
      </ContainerForm>
    </Main>
  );
}

export default OrderSent;
