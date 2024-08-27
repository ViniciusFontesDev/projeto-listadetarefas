
/*Primeiro chamei todas os elementos que vou utilizar aqui e dei um nome como variáveis*/
let listElement = document.querySelector("#app ul");
let inputElement = document.querySelector("#app input");
let buttonElement = document.querySelector("#app button");
/*Criei um array para ir acrescentando aqui as tarefas*/
let tarefas = JSON.parse(localStorage.getItem("@listaTarefas")) || [];

/*Criando a função que deixará aparente os itens que eu já cadastrei. Precisa ser aqui em cima porque quando salvarmos na máquina do usuário, quando ele entrar novamente ele possa já ver as tarefas salvas, e não somente depois que digitar algo.*/
function renderTarefas(){
    listElement.innerHTML = "";//Estamos acessando a tag ul e vou zerar ela caso tenha algo dentro dela. Serve principalmente para não ficar repetida as tarefas. Sempre vai limpar e depois mostrar novamente todos os itens.

    tarefas.map((todo) =>{/*Essa é uma função anônima. Vai funcionar como um for. O ".map" aí é tipo um for que vai pegar cada item e fazer o que eu estou mandando aqui dentro do {}.
        Essa variável "todo" é tipo as tarefas que eu adicionei, escrevi no input.*/
        let liElement = document.createElement("li"); //Criei um elemento do tipo li.
        let tarefaText = document.createTextNode(todo);//Criei um texto, o texto que estou recebendo, a tarefa que está passando, o todo.
        let linkElement = document.createElement("a"); //Criei um elemento do tipo a.
        linkElement.setAttribute("href", "#"); //Adicionei um atributo nesse link a. adicionei o atributo href com o link #.
        let linkText = document.createTextNode(" Excluir"); //adicionei um nome ao link a.
        linkElement.appendChild(linkText);//Estou adicionando um filho texto, cujo texto dei na linha anterior, ao link Element a.


        let posicao = tarefas.indexOf(todo) //pegando a posição do item que vamos excluir. O número da posição para que na hora de excluir ele exclua a certa.
        linkElement.setAttribute("onclick", `deletarTarefa(${posicao})`);//Estou adicionando um atributo chamado onclick e esse onclick vai chamar a função deletarTarefa().

        liElement.appendChild(tarefaText);//Adicionei a li o texto.
        liElement.appendChild(linkElement);//Adicionei ao li o a.
        listElement.appendChild(liElement); //Estou adicionando a li com o texto dentro da ul
    })
}

renderTarefas();

/*Criei uma função para ir adicionando as tarefas*/
function adicionarTarefas(){
    if(inputElement.value === ''){ //Aqui é só o teste caso a pessoa não digite nada.
        alert("Digite alguma tarefa"); //Vai aparecer um alerta informando que é necessário digitar alguma tarefa
        return false; //e depois vai pausar a operação aqui.
    }else{ //aqui é caso a pessoa tenha escrito algo
        let novaTarefa = inputElement.value; //estou criando uma variável chamada novaTarefa e fazendo com que ela receba o que for digitado (valor) no inputElement
        tarefas.push(novaTarefa); //Aqui estou dizendo que assim que a novaTarefa que acabou de ser criada vai ser adicionada no array tarefas.

        inputElement.value = '';//Aqui é o final, assim que o usuário digitar e adicionar algo na lista, eu quero que limpre o campo do input para que o usuário possa digitar mais sem precisar apagar.

        renderTarefas();/*Estou chamando a função que mostra os itens da lista. */
        salvarDados(); /*Chamo a função de salvarDados() para salvar os dados */
    }
}
/*Chamei um evento para o botão, que é a variável buttonElement. Ao clicar, vai chamar a função adicionar Tarefas.*/
buttonElement.onclick = adicionarTarefas;

/*Criando função que vai exluir a tarefa quando eu clicar no excluir. */
function deletarTarefa(posicao){
    tarefas.splice(posicao, 1);//Vai remover apenas 1 item, o item que seja da posicao.
    
    renderTarefas();/*Estou chamando a função que mostra os itens da lista. logo depois de ter exluído um item, isso é o correto a se fazer para que o usuário já note que a tarefa foi excluida.*/
    salvarDados(); /*Chamo a função de salvarDados() para salvar os dados também depois de excluir. */
}

/*Criando uma função para salvar os dados no localStorage*/
function salvarDados(){
    localStorage.setItem("@listaTarefas", JSON.stringify(tarefas))//acesso o localStorage ponto salvar itens, colocando primeiro uma chave única e depois o que eu quero salvar. no caso quero salvar o arrays. SÓ QUE o localStorage é um local para salvar um texto ou uma string ou um objeto. Não consigo salvar uma lista, mas consigo transformar a lista em um texto, uma string, e depois eu transformo de volta em uma array para poder salvar uma lista dentro do localStorage.
    //Então eu acesso o JSON.stringify(array que desejo salvar). Estou convertendo uma lista para uma string e dentro vou colocar a lista.
}