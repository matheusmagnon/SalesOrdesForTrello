import { PropsType } from "../../../types";

interface PropsCelField extends PropsType {
  placeholder: string;
}

export function CelField(props: PropsCelField) {
  return (
    <div>
      {/* <label> */}
      <input
        type="tel"
        id="POST-celular"
        // name="celInOrder"
        //   {...register("celInOrder")}
        placeholder={`${props.placeholder}`}
        className="bg-baseInput  border border-baseButton  text-baseText placeholder-baseLabel text-sm rounded-lg
                focus:ring-yellow-300 focus:border-yellow-300 block w-full p-2"
      />
      {/* </label> */}
      {/* <p className={styles.errorMessage}>{errors.celInOrder?.message}</p> */}
    </div>
  );
}
