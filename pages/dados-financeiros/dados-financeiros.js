// Sample array to store funcionarios
let dadosFinanceiros = [];

// DOM elements
const financialDataList = document.querySelector(".financial-data-list");
const addButton = document.querySelector(".add-button");

// Initial render
getFinancialData();

// Event listeners
addButton.addEventListener("click", () => {
	const id = prompt("Digite o ID do imóvel:");
	const valor_venda = prompt("Digite o valor de venda:");
	const valor_aluguel = prompt("Digite o valor de aluguel:");
	if (id && valor_venda && valor_aluguel) {
		saveNewFinancialData(id, valor_venda, valor_aluguel);
	}
});

financialDataList.addEventListener("click", (e) => {
	if (e.target.classList.contains("edit-button")) {
		const objectId = e.target.getAttribute("data-id");
		console.log(objectId);
		updateFinancialData(objectId);
	} else if (e.target.classList.contains("delete-button")) {
		const objectId = e.target.getAttribute("data-id");
		const confirmDelete = confirm(
			"Tem certeza que deseja excluir este dado financeiro?"
		);
		if (confirmDelete) {
			deleteFinancialData(objectId);
		}
	}
});

//CRUD Functions
async function saveNewFinancialData(imovelId, valor_venda, valor_aluguel) {
	const financeiro = new Parse.Object("Financeiro");

	const imovelQuery = new Parse.Query("Imovel");
	const imovelQueryBuild = imovelQuery.equalTo("objectId", imovelId);
	const imovelQueryResults = await imovelQueryBuild.first();

	const financeiroQuery = new Parse.Query("Financeiro");
	financeiroQuery.equalTo("imovel", imovelQueryResults);
	const financeiroQueryResults = await financeiroQuery.find();

	if (financeiroQueryResults.length > 0) {
		console.log("Erro! Já existe um dado financeiro com este imóvel!");
		return false;
	}

	try {
		let financeiroRelation = financeiro.relation("imovel");
		financeiroRelation.add(imovelQueryResults);

		financeiro.set("valor_venda", parseInt(valor_venda));
		financeiro.set("valor_aluguel", parseInt(valor_aluguel));

		await financeiro.save();
		if (financeiro !== null) {
			console.log(
				`Novo objeto criado com sucesso! ObjectId: ${financeiro.id}`
			);
		}
	} catch (error) {
		console.log(`Error: ${error.message}`);
	}

	getFinancialData();
}

async function deleteFinancialData(financialDataId) {
	const financialDataResult = await getOneFinancialData(financialDataId);

	try {
		alert(
			`Objeto deletado com sucesso! ObjectId: ${financialDataResult.id}`
		);
		await financialDataResult.destroy();
	} catch (error) {
		console.log(`Error: ${error.message}`);
	}

	getFinancialData();
}

async function updateFinancialData(financialDataId) {
	const financialDataResult = await getOneFinancialData(financialDataId);

	try {
		financialDataResult.set(
			`valor_venda`,
			parseInt(
				prompt(
					"Editar Valor de Venda:",
					financialDataResult.get(`valor_venda`)
				)
			)
		);
		financialDataResult.set(
			`valor_aluguel`,
			parseInt(
				prompt(
					"Editar Valor de Aluguel:",
					financialDataResult.get(`valor_aluguel`)
				)
			)
		);
		alert(
			`Objeto atualizado com sucesso! ObjectId: ${financialDataResult.id}`
		);
		await financialDataResult.save();
	} catch (error) {
		console.log(`Error: ${error.message}`);
	}

	getFinancialData();
}

async function getOneFinancialData(objectId) {
	const financeiroQuery = new Parse.Query("Financeiro");
	const financeiroQueryBuild = financeiroQuery.equalTo("objectId", objectId);
	const financeiroQueryResults = await financeiroQueryBuild.first();

	if (financeiroQueryResults.length < 0) {
		console.log("Erro! O dado informado não existe!");
		return false;
	}

	return financeiroQueryResults;
}

async function getFinancialData() {
	financialDataList.innerHTML = "";
	dadosFinanceiros = [];
	const query = new Parse.Query("Financeiro");
	try {
		const resultado = await query.find();
		resultado.forEach((data) => {
			dadosFinanceiros.push({
				objectId: data.id,
				valor_venda: data.get(`valor_venda`),
				valor_aluguel: data.get(`valor_aluguel`),
			});
			renderFinancialData(data);
		});
		console.log(dadosFinanceiros);
	} catch (error) {
		alert(
			`Failed to retrieve the objects, with error code: ${error.message}`
		);
	}
}

function renderFinancialData(data) {
	const card = document.createElement("div");
	card.className = "dados-financeiros-card";
	card.innerHTML = `
            <h2>ID: ${data.id}</h2>
            <p>Valor de Venda: ${data.get(`valor_venda`)}</p>
            <p>Valor de Aluguel: ${data.get(`valor_aluguel`)}</p>
            <button class="edit-button" data-id="${data.id}">Editar</button>
            <button class="delete-button" data-id="${data.id}">Excluir</button>
        `;
	financialDataList.appendChild(card);
	console.log(data.id);
}
