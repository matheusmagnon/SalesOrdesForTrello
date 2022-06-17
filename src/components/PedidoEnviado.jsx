
import { useState } from "react";
import Form from "./Form";
import renderComponent from "./renderComponent";

function PedidoEnviado() {
  const [isShown, setIsShown] = useState([false]);
  // const [isShown, setIsShown] = useState(false);
  {window.scrollTo(0,0)}
  // {styles.main.style.height = "100vmax"}
  if (isShown == false) {
    return <Form />;
  } 
  return (
    <div className="PedidoEnviado">
      <p>
        Sua solicitação foi registrada com sucesso! Se puder, sinalize o envio
        do formulário no nosso Whatsapp.
      </p>
      <input type="submit" className="ButtonNovoPedido"  value="Enviar Novo Pedido" onClick={()=>setIsShown(false)}/>
    </div>
  )
}
export default PedidoEnviado;
