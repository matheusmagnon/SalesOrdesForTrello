type PropsFieldtext = {
  title: string;
};

export function FieldText(props: PropsFieldtext) {
  const { title } = props;
  return (
    <div className=" text-gray-800">
      <label>
        <input
          type="text"
          id="POST-name"
          // name="nameInOrder"
          //   {...register("nameInOrder")}
          placeholder={`${title}`}
          autoFocus
          className="w-full h-8 rounded-lg bg-baseInput border-solid border-2 border-baseButton placeholder-gray-600 
          focus:outline-yellow-500"
          // #EDEDED
        />
      </label>
      {/* <p className={styles.errorMessage}>{errors.nameInOrder?.message}</p> */}
    </div>
  );
}
