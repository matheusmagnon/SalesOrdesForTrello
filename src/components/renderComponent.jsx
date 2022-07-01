import Form from './Form';
import OrderSen from './OrderSent';

export default function renderComponent(props) {
  if (props === true) {
    return <OrderSen />;
  } else {
    return <Form />;
  }
}
