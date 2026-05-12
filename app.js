import {getContatos, criarContato, deletarContato, atualizarContato} from "./contatos.js"

const formulario = document.getElementById("formulario")
const lista = document.getElementById("lista")
let idEditando = null /*let cria um avariável variável*/
/*idEditando guarda qual contato está sendo editado.*/

async function mostrarContatos() {
    lista.innerHTML = ""
    const contatos = await getContatos()
    for (let i = 0; i < contatos.length; i++) {
        const contato = contatos[i]
    /*for repete código várias vezes*/
    /*let i = 0 cria uma variável chamada i*/
    /*length é a quantidade de itens*/
    /*i++ significa que i aumenta de 1 em 1*/
    /*contatos[i] = pegue o item da posição i*/
/*----------------------------------- CRIAR CARD ---------------------------------------*/

        const card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `
            <img src="${contato.foto}" alt="foto">
            <div class="card-info">
                <h2>${contato.nome}</h2>
                <p><strong>Celular:</strong> ${contato.celular}</p>
                <p><strong>Email:</strong> ${contato.email}</p>
                <p><strong>Endereço:</strong> ${contato.endereco}</p>
                <p><strong>Cidade:</strong> ${contato.cidade}</p>
                <div class="botoes">
                    <button class="btn-editar">
                        Editar
                    </button>
                    <button class="btn-deletar">
                        Deletar
                    </button>
                </div>
            </div>
        `
        lista.appendChild(card)/*Pega a variável card e coloca dentro da div de id lista.*/

/*---------------------------------------------------------------------------------*/  

/*---------------------------------------BOTÃO DELETAR-----------------------------*/

        const btnDeletar = card.querySelector(".btn-deletar")/*procura dentro da variavel card o .btn-deletar na div. queryselector busca classe e id (com #) tb*/

        btnDeletar.addEventListener("click", async function () {
            await deletarContato(contato.id)
            mostrarContatos() /*recarregar*/
        }) /*addEventListener é qdo eu clicar no btnDeletar, a função aí vai rodar*/
            /*posso ter uma função dentro da outra*/

/*---------------------------------------------------------------------------------*/ 

/*---------------------------------------BOTÃO EDITAR-----------------------------*/

        const btnEditar = card.querySelector(".btn-editar")
        btnEditar.addEventListener("click", function () {
            document.getElementById("nome").value = contato.nome
            document.getElementById("celular").value = contato.celular
            document.getElementById("foto").value = contato.foto
            document.getElementById("email").value = contato.email
            document.getElementById("endereco").value = contato.endereco
            document.getElementById("cidade").value = contato.cidade
            idEditando = contato.id
        })
    } /*o for termina aqui*/
}

/*---------------------------------------------------------------------------------*/ 

/*---------------------------------------Salvar formulário-----------------------------*/

formulario.addEventListener("submit", async function (event) {
    event.preventDefault() /*o comportamento padrão do formulário é qdo eu clicar no botão submit ele recarrega a página (mas isso zoa o CRUD, ent faço o event.preventDefault() pra quebrar o comportamento padrão e não recarregar)*/
    const contato = {
        nome: document.getElementById("nome").value,
        celular: document.getElementById("celular").value,
        foto: document.getElementById("foto").value,
        email: document.getElementById("email").value,
        endereco: document.getElementById("endereco").value,
        cidade: document.getElementById("cidade").value
    }
    // EDITAR
    if (idEditando != null) {
        await atualizarContato(idEditando, contato)
        idEditando = null
    } else {
        // CRIAR
        await criarContato(contato)
    }
    formulario.reset()
    mostrarContatos()
})
mostrarContatos()

/*---------------------------------------------------------------------------------*/ 

/*
Primeiro, o código importa as funções do arquivo contatos.js, responsáveis por buscar, criar, atualizar e deletar contatos na API.

Depois, o JavaScript pega os elementos do HTML necessários para o funcionamento da página, como o formulário e a div onde os cards serão exibidos. Também é criada a variável idEditando, usada para identificar qual contato está sendo editado.

A função mostrarContatos() busca todos os contatos da API utilizando getContatos(). Em seguida, um for percorre todos os contatos recebidos e cria dinamicamente um card para cada um deles usando createElement() e innerHTML. Cada card mostra as informações do contato e possui dois botões: editar e deletar.

O botão deletar chama a função deletarContato() para remover o contato da API e depois recarrega a lista de contatos na tela.

O botão editar preenche o formulário com os dados do contato selecionado e guarda seu id na variável idEditando para que o sistema saiba qual contato será atualizado.

Por fim, o formulário possui um addEventListener("submit"), que é executado quando o usuário clica em salvar. O preventDefault() impede o recarregamento da página. Os dados dos inputs são armazenados em um objeto contato. Se idEditando possuir algum valor, o contato é atualizado; caso contrário, um novo contato é criado. Depois disso, o formulário é limpo e os contatos são recarregados na tela.
*/