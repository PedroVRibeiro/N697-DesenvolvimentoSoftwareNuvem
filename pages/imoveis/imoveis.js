let properties = [];

const propertyList = document.querySelector(".imoveis-list");
const createButton = document.querySelector(".imoveis-list__button--add");

getProperties();

createButton.addEventListener("click", () => {
	const contractName = prompt("Digite o tipo de contrato:");
	const value = prompt("Digite o valor do imóvel: ");
	const address = prompt("Digite o endereço: ");

	if (contractName && value && address) {
		createProperty(contractName, value, address);
	}
});

propertyList.addEventListener("click", (e) => {
	if (e.target.classList.contains("imoveis-list__button--edit")) {
		const objectId = e.target.getAttribute("data-id");

		updateProperty(objectId);
	} else if (e.target.classList.contains("imoveis-list__button--delete")) {
		const objectId = e.target.getAttribute("data-id");
		const confirmDelete = confirm(
			"Tem certeza que deseja remover este imóvel?"
		);
		if (confirmDelete) {
			removeProperty(objectId);
		}
	}
});

async function createProperty(contractName, value, address) {
	const property = new Parse.Object("Imovel");

	property.set("tipo_contrato", contractName);
	property.set("valor", parseInt(value));
	property.set("endereco", address);

	try {
		await property.save();

		alert("Novo imóvel adicionado sob o código: " + property.id);
	} catch (error) {
		alert("Failed to create new object, with error code: " + error.message);
	}

	getProperties();
}

async function updateProperty(objectId) {
	const query = new Parse.Query("Imovel");

	try {
		const object = await query.get(objectId);
		object.set(
			`tipo_contrato`,
			prompt("Editar contrato:", object.get(`tipo_contrato`))
		);
		object.set(
			`valor`,
			parseInt(prompt("Editar valor:", object.get(`valor`)))
		);
		object.set(
			`endereco`,
			prompt("Editar endereço:", object.get(`endereco`))
		);
		try {
			await object.save();
		} catch (error) {
			console.error("Error while updating ", error);
		}
	} catch (error) {
		console.error("Error while retrieving object ", error);
	}
	getProperties();
}

async function removeProperty(objectId) {
	const query = new Parse.Query("Imovel");
	try {
		const object = await query.get(objectId);
		try {
			await object.destroy();
		} catch (error) {
			console.error("Error while deleting ParseObject", error);
		}
	} catch (error) {
		console.error("Error while retrieving ParseObject", error);
	}
	getProperties();
}

async function getProperties() {
	propertyList.innerHTML = "";
	properties = [];

	const query = new Parse.Query("Imovel");

	try {
		const result = await query.find();
		result.forEach((property) => {
			properties.push({
				objectId: property.id,
				contractName: property.get(`tipo_contrato`),
				value: property.get(`valor`),
				address: property.get(`endereco`),
			});
			showProperty(property);
		});
	} catch (error) {
		alert(
			`Failed to retrieve the objects, with error code: ${error.message}`
		);
	}
}

function showProperty(property) {
	const card = document.createElement("div");
	card.className = "imoveis-list__imovel";
	card.innerHTML = `
            <h2>Imóvel para ${property.get(`tipo_contrato`)}</h2>
            <p>Código: ${property.id}</p>
            <p>Valor: R$: ${property.get(`valor`)}</p>
            <p>Endereço: ${property.get(`endereco`)}</p>
            <button class="imoveis-list__button--edit" data-id="${
				property.id
			}">Editar</button>
            <button class="imoveis-list__button--delete" data-id="${
				property.id
			}">Excluir</button>
        `;
	propertyList.appendChild(card);
}
