import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { AiFillCloseCircle } from "react-icons/ai";
import { Buttom } from "./Form/Buttom";

export function Modal() {
  return (
    <div>
      <AlertDialog.Root defaultOpen>
        {/* <Dialog.Trigger /> */}
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black/40" />
          <AlertDialog.Content
            className="fixed top-60 left-8 w-80 rounded-md bg-white p-4 text-gray-700 shadow
          xl:start-1/3"
          >
            {/* translate-x-1/2 translate-y-1/2 */}
            <div className="flex justify-between">
              <AlertDialog.Title className="font-bold text-2xl">
                Aviso!
              </AlertDialog.Title>
              <AlertDialog.Cancel>
                <AiFillCloseCircle size={30} color="#A02B2B" />
              </AlertDialog.Cancel>
            </div>
            <AlertDialog.Description>
              Estamos de recesso!
              <br /> Temos disponibilidade de agenda somente a partir do dia
              <strong> 26/07/2023.</strong>
            </AlertDialog.Description>
            <AlertDialog.Cancel>
              <Buttom content="Ok" color="verde" />
            </AlertDialog.Cancel>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
}
