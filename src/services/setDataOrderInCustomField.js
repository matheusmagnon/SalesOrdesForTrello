
export function setDataOrderInCustomField(idCustomField, dataOrder){
    const customFieldData = { value: { text: `` } };
    if (idCustomField == "6266f3cf7a05075d51e5d87a") {
      customFieldData.value.text = dataOrder.nameInOrder;
    }
    if (idCustomField == "62844c42896c562dc00f4e72") {
      customFieldData.value.text = dataOrder.celInOrder;
    }
    if (idCustomField == "6266f4bca4f27866da085132") {
      customFieldData.value.text = dataOrder.cakeColor;
    }
    if (idCustomField == "6266f5496a22807bb41e25f3") {
      customFieldData.value.text = dataOrder.candleInOrder;
    }
    if (idCustomField == "627bbedb3290697b9e6e0ddf") {
      customFieldData.value.text = dataOrder.flavorInOrder;
    }
    if (idCustomField == "62845d1714150e5f18da882e") {
      customFieldData.value.text = dataOrder.formOfPaymentInOrder;
    }
    return customFieldData
  };

  