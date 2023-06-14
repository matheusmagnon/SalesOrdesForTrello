# Sales Orders For Trello (Aplicação que cria cards dentro do Trello)

## Capa

<img src="./Capa.JPG" /> <br/> <br/>

## Design da aplicação

- Clique [aqui](https://yannagoisconfeitaria.netlify.app/) para acessar a aplicação em produção ;)

- Clique [aqui](https://www.figma.com/file/CNZBZZ2sJhnC1vlCuyGkg8/Pedido-Bent%C3%B4-Cake?node-id=2%3A2) para acessar o layout no Figma(foi alterado durante o projeto)

## Funcionalidades da aplicação

- Colher informações do cliente(nome e telefone) e informações referente ao pedido (frase, cor da frase, desenho, cor do bolo, sabor e etc...)
- Mostrar que o pedido foi confirmado com suacesso (esse modulo será refatorado)
- Enviar informações tratadas para o trello (será que configurar as id(quadro,listas,api, token...) do trello na aplicação Sales Orders For Trello)

## Tecnologias utilizadas

- Vite
- React
- Typescript
- Styled components
- React hook form
- Moment
- Axios
- uuid
- yup
- Zod
- Phosphor react
- Dotenv

## Como executar a aplicação

### Instalação

1. Clone o repositório

```bash
git clone https://github.com/Magon0/SalesOrdesForTrello
```

2. Acesse a pasta do projeto

```bash
cd SalesOrdesForTrello
```

3. Instale as dependências necessárias

```bash
npm install
```

4. Execute o projeto

```bash
npm run dev
```

### Configuração do trello

Existe um quadro no trelo que qualquer um pode acessar e testar a aplicação, para fazer uso basta seguir os passos a seguir:

1. É nessario criar um arquivo .env na pasta raiz do projeto, neste arquivo terá as seguintes variaveis:

```bash
VITE_API_KEY=
VITE_TOKEN=
VITE_ID_BOARD=
```
