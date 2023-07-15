interface PropsButtom {
  content: string;
}
export function Buttom(props: PropsButtom) {
  return (
    <input
      className="bg-fuchsia-950 rounded-md px-4 py-1 mt-3 text-xl text-white cursor-pointer"
      type="submit"
      value={props.content}
    />
  );
}
