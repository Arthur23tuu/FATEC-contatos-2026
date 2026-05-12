const BASE_URL = "https://bakcend-fecaf-render.onrender.com/contatos" /*endereço da API*/

/*-----------------------------------função GET--------------------------------------------*/

export async function getContatos() {
  const response = await fetch(BASE_URL) /*fetch() Função nativa do JavaScript usada para acessar APIs. method GET é o padrão do fetch*/
  if (!response.ok) /*! significa 'não'*/ {
    throw new Error("Erro ao buscar contatos")
  }
  return response.json()
}

/*---------------------------------------------------------------------------------------*/

/*-----------------------------------função POST-------------------------------------------*/

export async function criarContato(contato) {
  const optionsPost = {
    method: "POST",/*Enviar dados para criar algo.*/
    headers: {
      "Content-Type": "application/json" /*está avisando que os dados enviados estarão em json*/
    },
    body: JSON.stringify(contato) /*transforma o objeto em texto json*/
  }/*tudo isso cria um objeto de configurações da requisição*/

  const respondePost = await fetch(BASE_URL, optionsPost)
  /*Agora o fetch envia:
- URL
- método POST
- body
- headers
Tudo para a API.*/

  if (!respondePost.ok) {
    throw new Error("Erro ao criar contato")
  }

  return respondePost.json() /*return devolve um valor*/
  /*  
      JSON.stringify() | JS → JSON para a api receber valor em json
      response.json()  | JSON → JS para a api responder em objeto javascript
*/
}

/*--------------------------------------------------------------------------------------*/

/*-----------------------------------função PUT-------------------------------------------*/

export async function atualizarContato(id /*qual contato será alterado*/, contato) {
  const optionsPut = {
    method: "PUT",/*significa atualizar algo existente*/
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(contato)
  }

  const respondePut = await fetch(`${BASE_URL}/${id}` /*atualiza o id que será atualizado*/, optionsPut)

  if (!respondePut.ok) {
    throw new Error("Erro ao atualizar contato")
  }

  return respondePut.json()
}

/*--------------------------------------------------------------------------------------*/

/*-----------------------------------função DELETE-----------------------------------------*/

export async function deletarContato(id) {
  const optionsDelete = {
    method: "DELETE" /*pra excluir algo*/
  }

  const respondeDelete = await fetch(`${BASE_URL}/${id}`, optionsDelete)

  if (!respondeDelete.ok) {
    throw new Error("Erro ao deletar contato")
  }

  return true
}

/*--------------------------------------------------------------------------------------*/
