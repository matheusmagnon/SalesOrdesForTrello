import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";

export function Footer() {
  return (
    <footer className="pt-4">
      {/* <div className="w-full xl:flex-col  xl:px-56"> */}
      <div className="flex flex-col gap-7 px-4 xl:flex xl:flex-row xl:justify-between xl:px-56">
        <div>
          <h3 className="font-dmSans text-2xl text-footerTitle font-bold">
            Produtos
          </h3>
          <ul>
            <li className="pt-2">
              <a href="#" className="font-dmSans text-base text-footerOptions">
                Bolos Grandes
              </a>
            </li>
            <li className="pt-2">
              <a href="#" className="font-dmSans text-base text-footerOptions">
                Petit
              </a>
            </li>
            <li className="pt-2">
              <a href="#" className="font-dmSans text-base text-footerOptions">
                Bentô Cake
              </a>
            </li>
            <li className="pt-2">
              <a href="#" className="font-dmSans text-base text-footerOptions">
                Brigadeiros
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-dmSans text-2xl text-footerTitle font-bold">
            Sobre nós
          </h3>
          <ul>
            <li className="pt-2">
              <a href="#" className="font-dmSans text-base text-footerOptions">
                História da Confeitaria
              </a>
            </li>
            <li className="pt-2">
              <a href="#" className="font-dmSans text-base text-footerOptions">
                Quem é Yanna Góis
              </a>
            </li>
            <li className="pt-2">
              <a href="#" className="font-dmSans text-base text-footerOptions">
                Cases de sucesso
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-dmSans text-2xl text-footerTitle font-bold">
            Consultoria empresarial
          </h3>
          <ul>
            <li className="pt-2">
              <a href="#" className="font-dmSans text-base text-footerOptions">
                Gerenciamento de atendimento
              </a>
            </li>
            <li className="pt-2">
              <a href="#" className="font-dmSans text-base text-footerOptions">
                Petit
              </a>
            </li>
            <li className="pt-2">
              <a href="#" className="font-dmSans text-base text-footerOptions">
                Desenho e automação de processos
              </a>
            </li>
            <li className="pt-2">
              <a href="#" className="font-dmSans text-base text-footerOptions">
                Food Marketing
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-dmSans text-2xl text-footerTitle font-bold">
            Redes socias
          </h3>
          <div className="flex-col ">
            {/* <div className="flex flex-row"> */}
            <a href="#" className="flex flex-row pt-2">
              <AiFillFacebook className="text-baseText" size={25} /> Facebook
            </a>
            {/* </div> */}
            <a href="#" className="flex flex-row pt-2">
              <AiFillInstagram className="text-baseText" size={25} /> Instagram
            </a>
          </div>
        </div>
      </div>
      {/* </div> */}
      <div className="xl:flex xl:justify-between xl:px-32 xl:mt-4 bg-gray-300 px-4">
        <div className="xl:flex">
          <div>Copyright© 2023 Yanna Góis Confeitaria,&nbsp;</div>
          <div>CNPJ: 11.650.193/0001-13.</div>
        </div>
        <div>Desenvolvido por: Matheus Magno</div>
      </div>
    </footer>
  );
}
