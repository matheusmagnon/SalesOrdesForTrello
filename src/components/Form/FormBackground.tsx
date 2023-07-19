import { PropsType } from "../../types";

interface PropsFormBackground extends PropsType {
  orderSent?: boolean;
}

export function FormBackground(props: PropsFormBackground) {
  const { orderSent } = props;
  return orderSent == true ? (
    <div className="bg-backgroundPage p-3 md:p-5 h-screen flex justify-center">
      {props.children}
    </div>
  ) : (
    <div className="bg-baseBackground h-full w-fit xl:w-full flex justify-center">
      {/* bg-backgroundPage */}
      {props.children}
    </div>
  );
}
