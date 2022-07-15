import Form from './Form';
import OrderSent from './OrderSent';

export default function renderComponent(state: boolean) {

    if (state == false) {
        return <Form />;
    }
    else {
        return <OrderSent />;
    }
}