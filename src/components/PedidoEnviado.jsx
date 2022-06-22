import { useState } from "react";
import Form from "./Form";
import renderComponent from "./renderComponent";
import { ContainerForm } from "./styles";
import { Main } from "./styles";

function PedidoEnviado() {
  const [isShown, setIsShown] = useState([false]);
    window.scrollTo(0, 0);
  if (isShown === false) {
    return <Form />;
  } else {
    
    console.log(`Tá indo ${isShown}`)
    return (
      <Main state={true}>
        <ContainerForm>
          <div className="PedidoEnviado">
            <p>
              Sua solicitação foi registrada com sucesso! Se puder, sinalize o
              envio do formulário no nosso Whatsapp.
            </p>
            <input
              type="submit"
              className="ButtonNewOrder"
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
