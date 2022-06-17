export default async function getId(response, callback) {
  const Json = await response.json();
  return Json.id
}
