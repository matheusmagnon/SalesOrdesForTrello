import background from "../_assets/images/Pattern.png";

interface PropsState {
  state?: boolean;
  children: React.ReactNode;
}

export function Wrapper(props: PropsState) {
  return (
    <div
      style={{ backgroundImage: `url(${background})` }}
      className={`flex justify-center pt-4 pb-2`}
    >
      {props.children}
    </div>
  );
}

// ${(props: PropsState) => {
//     return props.state == true ? "h-1/2	" : "h-full";
//   }}
