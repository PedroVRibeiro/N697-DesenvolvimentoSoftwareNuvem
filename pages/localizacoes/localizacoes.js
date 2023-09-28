// Sample array to store funcionarios
let enderecos = [];

// DOM elements
const enderecosList = document.querySelector(".enderecos-list");
const addButton = document.querySelector(".add-button");

// Renderização Inicial
retrieveEnderecos();

// Event listeners
addButton.addEventListener("click", () => {
	const cidade = prompt("Digite a cidade:");
	const rua = prompt("Digite a rua:");
	const numero = prompt("Digite o numero:");
	const bairro = prompt("Digite o bairro:");
	const cep = prompt("Digite o cep:");
	addEndereco(cidade, rua, numero, bairro, cep);
});

enderecosList.addEventListener("click", (e) => {
	if (e.target.classList.contains("edit-button")) {
		const objectId = e.target.getAttribute("data-id");
		console.log(objectId);
		editEndereco(objectId);
	}
	// else if (e.target.classList.contains("delete-button")) {
	// 	const objectId = e.target.getAttribute("data-id");
	// 	const confirmDelete = confirm(
	// 		"Tem certeza que deseja excluir este endereço?"
	// 	);
	// 	if (confirmDelete) {
	// 		deleteEndereco(objectId);
	// 	}
	// }
});

//CRUD Functions

//CREATE
async function addEndereco(cidade, rua, numero, bairro, cep) {
	const endereco = new Parse.Object("Endereco");

	endereco.set("cidade", cidade);
	endereco.set("rua", rua);
	endereco.set("numero", numero);
	endereco.set("bairro", bairro);
	endereco.set("cep", cep);
	try {
		let result = await endereco.save();
		alert("New object created with objectId: " + result.id);
	} catch (error) {
		alert("Failed to create new object, with error code: " + error.message);
	}
	retrieveEnderecos();
}

//READ
async function retrieveEnderecos() {
	enderecosList.innerHTML = "";
	enderecos = [];
	const query = new Parse.Query("Endereco");
	try {
		const resultado = await query.find();
		resultado.forEach((endereco) => {
			enderecos.push({
				objectId: endereco.id,
				rua: endereco.get(`rua`),
				numero: endereco.get(`numero`),
				cep: endereco.get(`cep`),
				bairro: endereco.get(`bairro`),
				cidade: endereco.get(`cidade`),
			});
			renderEndereco(endereco);
		});
		console.log(enderecos);
	} catch (error) {
		alert(
			`Failed to retrieve the objects, with error code: ${error.message}`
		);
	}
}

// EDIT
async function editEndereco(objectId) {
	const query = new Parse.Query("Endereco");

	try {
		const object = await query.get(objectId);
		console.log(object);
		object.set(cidade, prompt("Editar cidade:", object.get(cidade)));
		object.set(rua, prompt("Editar rua:", object.get(rua)));
		object.set(numero, prompt("Editar numero:", object.get(numero)));
		object.set(bairro, prompt("Editar bairro:", object.get(bairro)));
		object.set(cep, prompt("Editar cep:", object.get(cep)));
		try {
			const response = await object.save();
		} catch (error) {
			console.error("Error while updating ", error);
		}
	} catch (error) {
		console.error("Error while retrieving object ", error);
	}
	retrieveEnderecos();
}

// DELETE
// async function deleteEndereco(objectId) {
// 	const query = new Parse.Query("Endereco");
// 	try {
// 		const object = await query.get(objectId);
// 		try {
// 			const response = await object.destroy();
// 		} catch (error) {
// 			console.error("Error while deleting ParseObject", error);
// 		}
// 	} catch (error) {
// 		console.error("Error while retrieving ParseObject", error);
// 	}
// 	retrieveFuncionarios();
// }

//RENDERIZAÇÃO NO HTML
function renderEndereco(endereco) {
	const card = document.createElement("div");
	card.className = "endereco-card";
	card.innerHTML = `
            <h2>${endereco.get(`cidade`)} - ${endereco.get(`rua`)} ${endereco.get(
		`numero`
	)}, ${endereco.get(`bairro`)}</h2>
            <p>CEP: ${endereco.get(`cep`)}</p>
            <button class="edit-button" data-id="${endereco.id}">Editar</button>
            <button class="delete-button" data-id="${
				endereco.id
			}">Excluir</button>
        `;
	enderecosList.appendChild(card);
	console.log(endereco.id);
}

// // Função para adicionar uma localidade CREATE (cidade, bairro ou região) ao Back4App
// function adicionarLocalidade(tipo, nome) {
// 	const Localidade = Parse.Object.extend("Localidade"); // Usar o nome correto da classe
// 	const localidade = new Localidade(); // Usar o nome correto da classe
// 	localidade.set("Tipo", tipo); // "Tipo" indica se é uma cidade, bairro ou região
// 	localidade.set("Nome", nome);

// 	localidade
// 		.save()
// 		.then(function (localidade) {
// 			console.log(
// 				Localidade "${nome}" adicionada com sucesso com ID: ${localidade.id}
// 			);
// 		})
// 		.catch(function (error) {
// 			console.error("Erro ao adicionar localidade:", error);
// 		});

// 	// Função para consultar localidades READ com base no tipo (Cidade, Bairro, Região)
// 	function consultarLocalidadesPorTipo(tipo) {
// 		const Localidade = Parse.Object.extend("Localidade");
// 		const query = new Parse.Query(Localidade);
// 		query.equalTo("Tipo", tipo);

// 		query
// 			.find()
// 			.then(function (localidades) {
// 				// Aqui, 'localidades' contém os resultados da consulta
// 				console.log(Localidades do tipo "${tipo}":, localidades);
// 			})
// 			.catch(function (error) {
// 				console.error("Erro ao consultar localidades:", error);
// 			});

// 		function consultarLocalidadePorNome(nome) {
// 			const Localidade = Parse.Object.extend("Localidade");
// 			const query = new Parse.Query(Localidade);
// 			query.equalTo("Nome", nome);

// 			return query.first();
// 		}

// 		function atualizarNomeLocalidadePorNome(nome, novoNome) {
// 			consultarLocalidadePorNome(nome)
// 				.then(function (localidade) {
// 					if (localidade) {
// 						localidade.set("Nome", novoNome);
// 						return localidade.save();
// 					} else {
// 						throw new Error("Localidade não encontrada.");
// 					}
// 				})
// 				.then(function (localidadeAtualizada) {
// 					console.log(
// 						`Nome da localidade atualizado com sucesso: ${localidadeAtualizada.get(
// 							"Nome"
// 						)}`
// 					);
// 				})
// 				.catch(function (error) {
// 					console.error(
// 						"Erro ao atualizar o nome da localidade:",
// 						error
// 					);
// 				});
// 		}

// 		// Função para excluir uma localidade DELETE com base no ID
// 		function excluirLocalidadePorID(localidadeID) {
// 			const Localidade = Parse.Object.extend("Localidade");
// 			const localidade = new Localidade();
// 			localidade.set("objectId", localidadeID); // Define o ID da localidade a ser excluída

// 			// Exclui a localidade
// 			localidade
// 				.destroy()
// 				.then(function () {
// 					console.log(
// 						Localidade com ID ${localidadeID} excluída com sucesso.
// 					);
// 				})
// 				.catch(function (error) {
// 					console.error("Erro ao excluir localidade:", error);
// 				});
// 		}

// 		// Exemplo de exclusão de localidade por ID
// 		// Substitua 'localidadeID' pelo ID da localidade que você deseja excluir
// 		// excluirLocalidadePorID(localidadeID);
// 	}

// 	// Exemplo de atualização de nome de localidade por ID
// 	// Substitua 'localidadeID' pelo ID da localidade que você deseja atualizar
// 	// Substitua 'novoNome' pelo novo nome desejado
// 	// atualizarNomeLocalidadePorID(localidadeID, novoNome);
// }

// // Exemplo de consulta de cidades
// consultarLocalidadesPorTipo("Cidade");

// // Exemplos de adição de localidades
// adicionarLocalidade("Cidade", "Cidade A");
// adicionarLocalidade("Bairro", "Bairro B");
// adicionarLocalidade("Região", "Região C");
