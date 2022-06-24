import Form from './Form';
import PedidoEnviado from './PedidoEnviado';

export default function renderComponent(props) {
  if (props === true) {
    return <PedidoEnviado />;
  } else {
    return <Form />;
  }

  return props;
}
