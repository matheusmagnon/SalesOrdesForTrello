type PropsType = {
  children: React.ReactNode;
};

export function FormTitle(props: PropsType) {
  return (
    <h1
      className=" ml-auto mr-auto text-2xl font-roboto font-bold text-center text-fuchsia-950 h-fit flex justify-center
    sm:text-5xl xl:text-5xl xl:w-full xl:pb-3"
    >
      {props.children}
    </h1>
  );
}
