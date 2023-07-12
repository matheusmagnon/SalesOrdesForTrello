export type DataOrder = {
  nameInOrder: string;
  celInOrder: string;
  phraseOnTheCake: string;
  drawingOnTheCake: string;
  cakePhraseColor: string;
  cakeColor: string;
  isWithdrawal: string;
  orderObservation: string;
  candleInOrder: string;
  flavorInOrder: string;
  formOfPaymentInOrder: string;
  filesInOrder: [];
  dateTimeInOrder: string;
  deliveryAdress: string;
  deliveryName: string;
  deliveryPhone: string;
  termsAccepted: boolean;
  awareOfWhatsApp: boolean;
};

export type PropsState = {
  state?: boolean;
};

export interface PropsType {
  children?: React.ReactNode;
}
