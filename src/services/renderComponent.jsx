import Form from "../components/Form";
import PedidoEnviado from "../components/PedidoEnviado";

export default function renderComponent(x) {
  if (x == true) {
    return  <PedidoEnviado />
  } else {
    return   <Form/>
  }
}
