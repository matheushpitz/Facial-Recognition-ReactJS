# Facial-Recognition-ReactJS
Simple facial recognition with ReactJS + NodeJS + Watson

Este projeto é um estudo da API Watson da IBM para reconhecimento de faces. Neste projeto, foi utilizado as tecnologias Node.JS para a parte de servidor e a tecnologia ReactJS para o frontend.

## Rodando o projeto

#### Configurando o .env

O servidor tem algumas configurações que são setados no arquivo .env. Esse arquivo carrega os dados contidos nele para as Environment Variables do Node.JS. Nesse arquivos vamos setar 2 valores, a porta que o nosso servidor irá escutar e a KEY da API Watson. O arquivo deverá ficar parecido com isso:
```
PORT=<YOUR_PORT>
IAM_APIKEY=<YOUR_KEY>
```
Lembre-se de remover os simbolos <>. O arquivo .env deve ser criado apenas com a sua extensão, não possuindo nome. Para cria-lo, você pode usar um editor de texto como o `Notepad++`.

#### Configurando o config.js

Para o cliente, nós possuimos o config.js que fica dentro da pasta do `client` em `config`. Esse arquivo exporta dados que serão usados na aplicação do cliente, nele nós possuímos o SERVER_HOST que indica qual o host do servidor. Por padrão o arquivo virá como está abaixo:
```
export const SERVER_HOST = 'http://localhost:8080';
```
Caso venha a ser alterado a porta ou o endereço do servidor, o mesmo deve ser alterado nesse arquivo para o bom funcionamento do sistema.

#### Instalando as dependências e rodando o sistema.
Agora vamos instalar todas as dependências do nosso projeto, para isso entre na raiz do projeto e execute o comando `npm run setup`. Após isso, todas as dependências já estarão instaladas, agora podemos rodar o nosso projeto com o comando `npm run start`. Com isso, o nosso sistema já estará rodando, você poderá acessa-lo através do endereço `localhost:3000`.
