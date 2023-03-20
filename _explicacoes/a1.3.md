# Aula: Tanto faz o nome das pastas, o que importa são padrões e convenções


> O mundo da programação tem zilhares de sopa de letrinhas
-̶ M̶V̶C̶
-̶ M̶V̶V̶M̶
-̶ M̶V̶P̶
-̶ V̶I̶P̶E̶R̶
-̶ V̶I̶P̶
-̶ F̶l̶u̶x̶
-̶ R̶e̶d̶u̶x̶
-̶ C̶l̶e̶a̶n̶ A̶r̶c̶h̶i̶t̶e̶c̶t̶u̶r̶e̶
-̶ C̶l̶e̶a̶n̶ S̶w̶i̶f̶t̶
-̶ C̶l̶e̶a̶n̶ C̶o̶d̶e̶
-̶ S̶O̶L̶I̶D̶
-̶ D̶R̶Y̶
-̶ K̶I̶S̶S̶

> Vamos ignorá-las um pouco e pensar no que **acontece em um software qualquer no mundo**

## Processos de Softwares no mundo real

- Vimos a parte de por trás de um software 

### Usuário
> Twitter
- Clicamos num botão "Tweet"
- Abriu um Modal com a caixa para digitarmos um tweet 
- Digitei meu tweet, para que o botão de envio fosse liberado
- Cliquei para enviar
- Aparecer uma mensagem de "Publicado com sucesso"

### Trabalho das pessoas Devs por tras
#### Front End
- Programar a tela
  - HTML, CSS (Visual da tela)
- Ter o comportamento de escutar toda vez que o usuário digita um tweet
  - **Validar** se tiver mais de 1 caracter, remove o atributo disabled do botão de Tweetar
- Adicionar um evento que escuta quanto o botão de Tweetar foi apertado
  - Pegar o conteúdo do Tweet
  - Mandar para o servidor

#### Back End
- Vamos receber as infos do tweet no Body da Request
- **Validar** se o tweet é um tweet valido
  - Se não for valido, retorna um erro
- Salvar o tweet no banco de dados
  - Se não for possível, retorna um erro
- Retornar a mensagem de sucesso



### O que é comum nesses processos?
[view]
- HTML e CSS
- respostas do backend
[controller]
- executar funções de validação, vamos garantir que os dados estão corretos
- enviar para a parte que "salva"
[repository]
- Reponsável por PEGAR dados e ENVIAR dados

##### Código de exemplo [FRONT]

```html
<script>
  const tweetRepository {
    getTweets() {},
    postTweet() {}
  }
  function tweetController() {
    const $input = document.getElementById('input');
    // Fail Fast validations
    if(!isTweetValid($input.value)) return;
    const tweet = $input;
    // daqui em diante, podemos confiar que TEMOS os dados que precisamos
    tweetRepository.postTweet(tweet);
    alert("Tweet publicado com sucesso!")
  }
</script>
<form>
  <input type="text" id="input" />
  <button type="button" onclick="tweetController()">Tweetar</button>
</form>
```

###### [BACK]
[controller] -> Recebe o dado do **INPUT** 
[repository] -> Onde fica a lógica de acesso ao banco de dados
  - Responsável por PEGAR dados e por ENVIAR dados

```js
  const tweetRepository {
    getTweets() {},
    postTweet() {}
  }
  function tweetController(request, response) {
    // fail fast validations
    if(!isTweetValid(request.body)) return response.status(400).send('Invalid tweet');
    const tweet = $input;
    // daqui em diante, podemos confiar que TEMOS os dados que precisamos
    tweetRepository.postTweet(tweet);
    return response.status(200).send('Tweet posted');
  }
```

## Resumo
- Isso tudo faz link com a aula anterior de `Input -> Processamento -> Output`
- `Input (Usuário, FrontEnd, Serviço) -> Processamento (Controller, Repository) -> Output (Response, View)`
  - CRUDs

- Model
  - Representação do dado/abstração


```js
function Tweet(conteudo, usuario) {
  return {
    content: conteudo,
    user: usuario,
    data: new Date().now(),
  }
}
```