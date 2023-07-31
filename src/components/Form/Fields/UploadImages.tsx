import { useContext, useState } from "react";
import { useFormContext } from "react-hook-form";
import PreviewImageUpload from "../../PreviewImageUpload";
import { v4 as uuidv4 } from "uuid";

import { OrderContext } from "../../../context/SalesOrderContext";

export function UploadImages() {
  const { register } = useFormContext();
  const { imagesBento, setImageBento } = useContext(OrderContext);

  // const [images, setImages] = useState<any>();

  interface Images extends FileList {
    name: string;
    size: number;
    URLpreview: string;
  }

  const getImagesToUpload = async (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;

    const imagesPreview = Array.from(target.files as FileList);

    interface File {
      name: string;
      size: number;
    }

    const ImagesToShow = imagesPreview.map((file) => {
      const { name, size }: File = file;
      return { name, size, URLpreview: URL.createObjectURL(file) };
    });
    setImageBento(ImagesToShow);
    // setImages(ImagesToShow);
  };

  return (
    <div className="xl:w-36">
      <label className="bg-fuchsia-950 p-2 text-white block rounded-xl cursor-pointer text-center duration-75">
        Caso haja alguma imagem de inspiração anexe aqui
        <input
          className="hidden"
          type="file"
          multiple
          accept="image/*"
          {...register("filesInOrder", {
            onChange: (e) => {
              getImagesToUpload(e);
            },
          })}
        />
      </label>
      <div className="xl:w-96">
        <div className="w-full flex flex-wrap space-x-4">
          {imagesBento.map((item) => {
            return (
              <PreviewImageUpload
                key={uuidv4()}
                name={item.name}
                URLpreview={item.URLpreview}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
