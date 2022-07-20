import Form from './Form';
import OrderSent from './OrderSent';

export default function renderComponent(state: boolean) {
  if (state == true) {
    console.log('ta bem');

    // return <Form />;
  } else {
    return <OrderSent />;
  }
}
