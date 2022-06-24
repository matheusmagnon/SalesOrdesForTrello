export default function getDateNow() {
  var today = new Date();
  let date = '222-01-01';
  // `${today.getFullYear()}-${(today.getMonth() + 1)
  //   .toString()
  //   .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

  let time = '00:00';
  // `${today.getHours().toString().padStart(2, '0')}:${today
  //   .getMinutes()
  //   .toString()
  //   .padStart(2, '0')}`;
  console.log(date);
  return `${date}T${time}`;
}
