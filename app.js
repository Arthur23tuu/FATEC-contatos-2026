import {getContatos, criarContato, deletarContato, atualizarContato} from "./contatos.js"

let idEditando = null /*let cria um avariável variável*/
/*idEditando guarda qual contato está sendo editado.*/
let fotoUrl = ""
const app = document.getElementById("app")

function iniciarCrud() {
    const formulario = document.getElementById("formulario")
    const lista = document.getElementById("lista")
    const previewInput = document.getElementById("preview-input")
    const previewImage = document.getElementById("preview-image")

function previewImagem({ target }) {
    const arquivo = target.files[0]
    if (!arquivo) return
    previewImage.src = URL.createObjectURL(arquivo)
    uploadCloudinary(arquivo)
}

async function uploadCloudinary(arquivo) {
    const formData = new FormData()
    formData.append("file", arquivo)
    formData.append("upload_preset", "contatos")
    const response = await fetch(
        "https://api.cloudinary.com/v1_1/dax5dntte/image/upload",
        {
            method: "POST",
            body: formData
        }
    )
    const dados = await response.json()
    fotoUrl = dados.secure_url
}



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
            fotoUrl = contato.foto
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
        foto: fotoUrl,
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
    fotoUrl = ""
    mostrarContatos()
})

previewInput.addEventListener("change", previewImagem)

mostrarContatos()

} /*aqui fecha o iniciarCrud()*/

/*---------------------------------------------------------------------------------*/

function mostrarLogin() {
    app.innerHTML = `
        <section class="login-container">
            <form class="login-form" id="login-form">
                <h2>Login</h2>
                <input 
                    type="email"
                    placeholder="Email"
                    required
                >
                <input 
                    type="password"
                    placeholder="Senha"
                    required
                >
                <button class="btn-login">
                    Entrar
                </button>
            </form>
        </section>
    `
    const loginForm = document.getElementById("login-form")
    loginForm.addEventListener("submit", function(event){
        event.preventDefault()
        mostrarSistema()
    })
}

function mostrarSistema() {

    app.innerHTML = `
        <section class="form-section">
            <form id="formulario" class="form-container">
                <h2>Adicionar Novo Contato</h2>
                    <div class="preview-container">
                        <input 
                        type="file"
                        id="preview-input"
                        class="preview-input"
                        accept="image/*">
                        <label for="preview-input" class="preview-label">
                        <img 
                        id="preview-image"
                        class="preview-image"
                        src="./image/iconeUpload.png"
                        alt="upload">
                        </label>
                    </div>
                <input type="text" id="nome" placeholder="Nome" required>
                <input type="text" id="celular" placeholder="Celular" required>
                <input type="email" id="email" placeholder="Email" required>
                <input type="text" id="endereco" placeholder="Endereço" required>
                <input type="text" id="cidade" placeholder="Cidade" required>
                <button type="submit" class="btn-salvar">Salvar Contato</button>
            </form>
        </section>

        <section class="list-section">
            <div id="lista" class="lista-contatos"></div>
        </section>
        `
    iniciarCrud()
}

mostrarLogin()