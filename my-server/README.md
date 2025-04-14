## Express App 


## localhost

Crie um arquivo .env na raiz e inclua um access_token válido:
`ACCESS_TOKEN=XYZ`

`npm install`

`npm start`

Se tiver problema ao rodar npm start, tente os comandos específicos por sistema operacional:

`start-env-windows`

`start-env-linux`

Aplicação estará rodando na porta `4000`


### Observações funcionais:

> O access token foi criado com sucesso, porém as requisições para os endpoints de itens e detalhes do item retornam 403 para o meu usuário (conforme evidências no email). A partir disso, segui com o desenvolvimento baseado nos mocks e isso infelizmente limitou algumas partes da entrega como o estado de paginação.