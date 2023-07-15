import { PropsType } from "../../types";

interface PropsFormContainer extends PropsType {
  onderSent?: boolean;
}

export function FormContainer(props: PropsFormContainer) {
  const { onderSent } = props;
  return onderSent == true ? (
    <div className=" bg-white px-3 py-3 rounded-md shadow-container max-w-6xl h-60  md:px-10">
      {props.children}
    </div>
  ) : (
    <div className=" bg-baseBackground px-2 pb-3 max-w-5xl  md:px-10">
      {/* rounded-md shadow-container  */}
      {props.children}
    </div>
  );
}
