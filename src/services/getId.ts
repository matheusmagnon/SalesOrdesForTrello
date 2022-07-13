
export default async function getId(response:Response){
  const responseInJson = await response.json();
  return responseInJson.id
}
