import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { AiFillCloseCircle } from "react-icons/ai";
import { Buttom } from "../Form/Buttom";
import StyleLoading from "./StyleLoading";
import { PropsType } from "../../types";
import React, { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

interface PropsModal extends PropsType {
  titleDialog: string;
  contentDialog: ReactNode | string;
  closeButton?: boolean;
  okButton?: boolean;
  isLoading?: boolean;
}

export function Modal({
  titleDialog,
  contentDialog,
  closeButton,
  okButton,
  isLoading,
}: PropsModal) {
  return (
    <AlertDialog.Root defaultOpen>
      <AlertDialog.Portal className="align-middle">
        <AlertDialog.Overlay className="fixed inset-0 bg-black/40" />
        <AlertDialog.Content className="fixed  w-80 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-md bg-white p-4 text-gray-700 shadow">
          <div className="flex justify-between">
            <AlertDialog.Title className="font-bold text-2xl">
              {titleDialog}
            </AlertDialog.Title>
            {closeButton && (
              <AlertDialog.Cancel>
                <AiFillCloseCircle size={30} color="#A02B2B" />
              </AlertDialog.Cancel>
            )}
          </div>
          <AlertDialog.Description>{contentDialog}</AlertDialog.Description>
          {okButton && (
            <AlertDialog.Cancel>
              <Buttom content="Ok" color="verde" />
            </AlertDialog.Cancel>
          )}
          {isLoading && (
            <>
              <StyleLoading />
              <div className=" py-2 px-5 rounded-lg flex items-center flex-col">
                <div className="loader-dots block relative w-20 h-5 mt-2">
                  <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-yellow-300"></div>
                  <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-fuchsia-900"></div>
                  <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-yellow-300"></div>
                  <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-fuchsia-900"></div>
                </div>
              </div>
            </>
          )}
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
