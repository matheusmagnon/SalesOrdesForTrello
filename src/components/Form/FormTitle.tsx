type PropsType = {
  children: React.ReactNode;
};

export function FormTitle(props: PropsType) {
  return (
    <h1
      className=" w-4/5 ml-auto mr-auto text-2xl font-bold text-center text-fuchsia-950 h-fit flex justify-center
    sm:text-5xl sm:w-2/3 xl:text-6xl xl:w-3/4"
    >
      {props.children}
    </h1>
  );
}
