// Sample array to store pagamentos
let pagamentos = [];

// Sample array to store pagamentos
let nomesFuncionarios = [];

// DOM Elements
const pagamentosList = document.querySelector(".pagamentos-list");
const addButton = document.querySelector(".add-button");
const funcionariosSelect = document.getElementById("funcionarios-select");

// Initial render
retrievePagamentos();
retrieveNomesFuncionarios();
// Event listeners
addButton.addEventListener("click", () => {
	if (funcionariosSelect.value) {
		const nomeFuncionario = funcionariosSelect.value;
		console.log(nomeFuncionario);
		const valor = prompt("Digite o valor do pagamento:");
		if (valor) {
			addPagamento(nomeFuncionario, valor);
		}
	}
});

pagamentosList.addEventListener("click", (e) => {
	if (e.target.classList.contains("edit-button")) {
		const objectId = e.target.getAttribute("data-id");
		console.log(objectId);
		editPagamento(objectId);
	} else if (e.target.classList.contains("delete-button")) {
		const objectId = e.target.getAttribute("data-id");
		const confirmDelete = confirm(
			"Tem certeza que deseja excluir este pagamento?"
		);
		if (confirmDelete) {
			deletePagamento(objectId);
		}
	}
});

//CRUD Functions

// CREATE
async function addPagamento(nomeFuncionario, valor) {
	const pagamento = new Parse.Object("FolhaPagamento");

	pagamento.set("nomeFuncionario", nomeFuncionario);
	pagamento.set("valor", valor);
	try {
		let result = await pagamento.save();
		alert("New object created with objectId: " + result.id);
	} catch (error) {
		alert("Failed to create new object, with error code: " + error.message);
	}
	retrievePagamentos();
}

// EDIT
async function editPagamento(objectId) {
	const query = new Parse.Query("FolhaPagamento");

	try {
		const object = await query.get(objectId);
		console.log(object);
		object.set(`valor`, prompt("Editar valor:", object.get(`valor`)));
		try {
			const response = await object.save();
		} catch (error) {
			console.error("Error while updating ", error);
		}
	} catch (error) {
		console.error("Error while retrieving object ", error);
	}
	retrievePagamentos();
}

// DELETE
async function deletePagamento(objectId) {
	const query = new Parse.Query("FolhaPagamento");
	try {
		const object = await query.get(objectId);
		try {
			const response = await object.destroy();
		} catch (error) {
			console.error("Error while deleting ParseObject", error);
		}
	} catch (error) {
		console.error("Error while retrieving ParseObject", error);
	}
	retrievePagamentos();
}

//READ
async function retrievePagamentos() {
	pagamentosList.innerHTML = "";
	pagamentos = [];
	const query = new Parse.Query("FolhaPagamento");
	try {
		const resultado = await query.find();
		resultado.forEach((pagamento) => {
			pagamentos.push({
				objectId: pagamento.id,
				valor: pagamento.get(`valor`),
				nomeFuncionario: pagamento.get(`nomeFuncionario`),
			});
			renderPagamento(pagamento);
		});
		console.log(pagamentos);
	} catch (error) {
		alert(
			`Failed to retrieve the objects, with error code: ${error.message}`
		);
	}
}

async function retrieveNomesFuncionarios() {
	funcionariosSelect.innerHTML = "";
	nomesFuncionarios = [];
	const query = new Parse.Query("Funcionario");
	try {
		const resultado = await query.find();
		resultado.forEach((funcionario) => {
			nomesFuncionarios.push(funcionario.get(`nome`));
			renderNomeFuncionarios(funcionario.get(`nome`));
		});
		console.log(nomesFuncionarios);
	} catch (error) {
		alert(
			`Failed to retrieve the objects, with error code: ${error.message}`
		);
	}
}

//RENDER
function renderPagamento(pagamento) {
	const card = document.createElement("div");
	card.className = "pagamento-card";
	card.innerHTML = `
            <h2>Valor: ${pagamento.get(`valor`)}</h2>
            <p>Funcionário: ${pagamento.get(`nomeFuncionario`)}</p>
            <button class="edit-button" data-id="${
				pagamento.id
			}">Editar</button>
            <button class="delete-button" data-id="${
				pagamento.id
			}">Excluir</button>
        `;
	pagamentosList.appendChild(card);
	console.log(pagamento.id);
}

function renderNomeFuncionarios(nomeFuncionario) {
	const option = document.createElement("option");
	option.className = "nome-funcionario-card";
	option.text = nomeFuncionario;
	funcionariosSelect.add(option);
}
