export default function getDateNow(addHours?: number) {
  var today = new Date();

  addHours && today.setHours(today.getHours() + addHours);

  let date = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

  let time = `${today.getHours().toString().padStart(2, "0")}:${today
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  return `${date}T${time}`;
}

export { getDateNow };
