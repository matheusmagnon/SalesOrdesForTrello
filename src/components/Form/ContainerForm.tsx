type ContainerProps = {
  children: React.ReactNode;
};

export function ContainerForm(props: ContainerProps) {
  return (
    <div
      className=" bg-gray-100 rounded-3xl px-4 py-3 max-w-5xl flex-col
    md:mx-8"
    >
      {props.children}
    </div>
  );
}
