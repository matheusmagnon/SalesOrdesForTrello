import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import { FooterTitle } from "./FooterTitle";
import { FooterItem } from "./FooterItem";
import { FooterItemInstagram } from "./FooterItemInstagram";
import { FooterItemFacebook } from "./FooterItemFacebook";

export function Footer() {
  return (
    <footer className="pt-4">
      {/* <div className="w-full xl:flex-col  xl:px-56"> */}
      <div className="flex flex-col gap-7 px-4 xl:flex xl:flex-row xl:justify-between xl:px-56">
        <div>
          <FooterTitle>Produtos</FooterTitle>
          <ul>
            <FooterItem>Bolos Grandes</FooterItem>
            <FooterItem>Petit</FooterItem>
            <FooterItem>Bentô Cake</FooterItem>
            <FooterItem>Brigadeiros</FooterItem>
          </ul>
        </div>
        <div>
          <FooterTitle>Sobre nós</FooterTitle>
          <ul>
            <FooterItem>História da Confeitaria</FooterItem>
            <FooterItem>Quem é Yanna Góis</FooterItem>
            <FooterItem>Cases de sucesso</FooterItem>
          </ul>
        </div>
        <div>
          <FooterTitle>Consultoria empresarial</FooterTitle>
          <ul>
            <FooterItem>Gerenciamento de atendimento</FooterItem>

            <FooterItem>Desenho e automação de processos</FooterItem>
            <FooterItem>Food Marketing</FooterItem>
          </ul>
        </div>
        <div>
          <FooterTitle>Redes socias</FooterTitle>
          <div className="flex-col ">
            <FooterItemFacebook />
            <FooterItemInstagram />
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
