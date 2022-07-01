import { useState } from 'react';

import styles from './OrderSent.module.css';

import Form from './Form';
import { ContainerForm } from './styled';
import { Main } from './styled';

function PedidoEnviado() {
  const [isShown, setIsShown] = useState([false]);
  window.scrollTo(0, 0);
  if (isShown === false) {
    return <Form />;
  } else {
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
              onClick={() => setIsShown(false)}
            />
          </div>
        </ContainerForm>
      </Main>
    );
  }
}
export default PedidoEnviado;
