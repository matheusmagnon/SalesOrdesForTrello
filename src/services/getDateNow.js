export default function getDateNow() {
  var today = new Date();
  let date = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

  let time = '';
  // `
  //   ${today.getHours().toString().padStart(2, '0')}:${today
  //   .getMinutes()
  //   .toString()
  //   .padStart(2, '0')}`;

  return console.log(`${date}T${time}`);
}
