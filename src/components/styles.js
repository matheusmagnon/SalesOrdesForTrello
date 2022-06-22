import styled from "styled-components";
import background from "../_assets/images/Pattern.jpg";

var teste;
export const Main = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 2rem 0rem;
  background-image: url(${background});
  background-size: 80%;
  letter-spacing: 0.1rem;
  height: ${(props) => {
    if (props.state == true) {
      return `${200}vh`;
    }
  }};

  @media (max-width: 820px) {
    padding: 1rem 1rem;
  }
  @media (max-width: 580px) {
    background-size: 100%;
  }
`;
export const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 45px;
  box-shadow: 0 0 10px rgb(0, 0, 0), 0 0 1px rgb(7, 2, 10) inset;
  padding: 5rem 5rem 3rem;
  width: 100%;
  max-width: 1050px;
  background-color: #fff;
  height: fit-content;
  align-self: center;

  @media (max-width: 1310px) {
    max-width: 950px;
  }

  @media (max-width: 1140px) {
    max-width: 850px;
  }

  @media (max-width: 1050px) {
    max-width: 750px;
  }

  @media (max-width: 930px) {
    max-width: 650px;
  }
  @media (max-width: 820px) {
    max-width: 650px;
    padding: 1rem 2rem;
  }

  @media (max-width: 720px) {
    width: 100%;
    max-width: 655px;
    padding: 1rem 2rem;
    box-sizing: border-box;
  }

  @media (max-width: 510px) {
    width: 100%;
    max-width: 430px;
    padding: 0.5rem 1rem;
  }
`;