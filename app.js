import {getContatos, criarContato, deletarContato, atualizarContato} from "./contatos.js"

const formulario = document.getElementById("formulario")
const lista = document.getElementById("lista")
let idEditando = null /*let cria um avariável variável*/
/*idEditando guarda qual contato está sendo editado.*/
let fotoBase64 = ""
const previewInput = document.getElementById("preview-input")
const previewImage = document.getElementById("preview-image")

function previewImagem({ target }) {
    const arquivo = target.files[0]
    if (!arquivo) return
    previewImage.src = URL.createObjectURL(arquivo)
    converterBase64(arquivo)
}

function converterBase64(arquivo) {
    const reader = new FileReader()
    reader.onload = function () {
        fotoBase64 = reader.result
    }
    reader.readAsDataURL(arquivo)
}

previewInput.addEventListener("change", previewImagem)

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

/*-------------------------------------BOTÃO EDITAR-----------------------------*/

        const btnEditar = card.querySelector(".btn-editar")
        btnEditar.addEventListener("click", function () {
            document.getElementById("nome").value = contato.nome
            document.getElementById("celular").value = contato.celular
            document.getElementById("email").value = contato.email
            document.getElementById("endereco").value = contato.endereco
            document.getElementById("cidade").value = contato.cidade
            previewImage.src = contato.foto
            fotoBase64 = contato.foto
            idEditando = contato.id

        window.scrollTo({
        top: 0,
        behavior: "smooth"
        }) /*faz a tela rolar pra cima*/

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
        foto: fotoBase64,
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
    previewImage.src="./image/iconeUpload.png"
    fotoBase64 = ""
    mostrarContatos()
})
mostrarContatos()

/*---------------------------------------------------------------------------------*/ 

