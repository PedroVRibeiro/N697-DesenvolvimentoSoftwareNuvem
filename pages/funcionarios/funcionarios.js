// Sample array to store funcionarios
let funcionarios = [];

// DOM elements
const funcionariosList = document.querySelector(".funcionarios-list");
const addButton = document.querySelector(".add-button");

// Initial render
retrieveFuncionarios();

// Event listeners
addButton.addEventListener("click", () => {
	const nome = prompt("Digite o nome do funcionario:");
	const cargo = prompt("Digite o cargo do funcionario:");
	if (nome && cargo) {
		addFuncionario(nome, cargo);
	}
});

funcionariosList.addEventListener("click", (e) => {
	if (e.target.classList.contains("edit-button")) {
		const objectId = e.target.getAttribute("data-id");
		console.log(objectId);
		editFuncionario(objectId);
	} else if (e.target.classList.contains("delete-button")) {
		const objectId = e.target.getAttribute("data-id");
		const confirmDelete = confirm(
			"Tem certeza que deseja excluir este funcionario?"
		);
		if (confirmDelete) {
			deleteFuncionario(objectId);
		}
	}
});

//CRUD Functions

// CREATE
async function addFuncionario(nome, cargo) {
	const funcionario = new Parse.Object("Funcionario");

	funcionario.set("nome", nome);
	funcionario.set("cargo", cargo);
	try {
		let result = await funcionario.save();
		alert("New object created with objectId: " + result.id);
	} catch (error) {
		alert("Failed to create new object, with error code: " + error.message);
	}
	retrieveFuncionarios();
}

// EDIT
async function editFuncionario(objectId) {
	const query = new Parse.Query("Funcionario");

	try {
		const object = await query.get(objectId);
		console.log(object);
		object.set(`nome`, prompt("Editar nome:", object.get(`nome`)));
		object.set(`cargo`, prompt("Editar cargo:", object.get(`cargo`)));
		try {
			const response = await object.save();
		} catch (error) {
			console.error("Error while updating ", error);
		}
	} catch (error) {
		console.error("Error while retrieving object ", error);
	}
	retrieveFuncionarios();
}

// DELETE
async function deleteFuncionario(objectId) {
	const query = new Parse.Query("Funcionario");
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
	retrieveFuncionarios();
}

//READ
async function retrieveFuncionarios() {
	funcionariosList.innerHTML = "";
	funcionarios = [];
	const query = new Parse.Query("Funcionario");
	try {
		const resultado = await query.find();
		resultado.forEach((funcionario) => {
			funcionarios.push({
				objectId: funcionario.id,
				nome: funcionario.get(`nome`),
				cargo: funcionario.get(`cargo`),
			});
			renderFuncionario(funcionario);
		});
		console.log(funcionarios);
	} catch (error) {
		alert(
			`Failed to retrieve the objects, with error code: ${error.message}`
		);
	}
}

//RENDER
function renderFuncionario(funcionario) {
	const card = document.createElement("div");
	card.className = "funcionario-card";
	card.innerHTML = `
            <h2>Nome: ${funcionario.get(`nome`)}</h2>
            <p>Cargo: ${funcionario.get(`cargo`)}</p>
            <button class="edit-button" data-id="${
				funcionario.id
			}">Editar</button>
            <button class="delete-button" data-id="${
				funcionario.id
			}">Excluir</button>
        `;
	funcionariosList.appendChild(card);
	console.log(funcionario.id);
}
