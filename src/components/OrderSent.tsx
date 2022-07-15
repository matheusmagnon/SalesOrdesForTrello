import { useState } from 'react';

import styles from './OrderSent.module.css';

import { ContainerForm } from './styled';
import { Main } from './styled';

import Form from './Form';

function OrderSent() {
  const [orderIsCompleted, setOrderIsCompleted] = useState(false);
  window.scrollTo(0, 0);
  // if (orderIsCompleted == true) {
  //   console.log(orderIsCompleted)
  //   return <Form />
  // }
  const newOrder = (state: boolean) => {

    if (state === true) {
      console.log(state)
      return (
        <Form />
      )
    } else {

    }
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
            onClick={() => newOrder(true)}
          />
        </div>
      </ContainerForm>
    </Main>
  );
}

export default OrderSent;
