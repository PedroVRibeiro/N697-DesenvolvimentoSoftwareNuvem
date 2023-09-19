// Sample array to store funcionarios
let funcionarios = [
  { id: 1, nome: "John Doe", cargo: "Manager" },
  { id: 2, nome: "Jane Smith", cargo: "Developer" }
];

// DOM elements
const funcionariosList = document.querySelector(".funcionarios-list");
const addButton = document.querySelector(".add-button");

// Function to render funcionarios
function renderFuncionarios() {
  funcionariosList.innerHTML = "";
  funcionarios.forEach(funcionario => {
    const card = document.createElement("div");
    card.className = "funcionario-card";
    card.innerHTML = `
            <h2>Nome: ${funcionario.nome}</h2>
            <p>Cargo: ${funcionario.cargo}</p>
            <button class="edit-button" data-id="${funcionario.id}">Editar</button>
            <button class="delete-button" data-id="${funcionario.id}">Excluir</button>
        `;
    funcionariosList.appendChild(card);
  });
}

// Function to add a new funcionario
function addFuncionario(nome, cargo) {
  const id = Date.now(); // Generate a unique ID
  funcionarios.push({ id, nome, cargo });
  renderFuncionarios();
}

// Function to edit a funcionario
function editFuncionario(id, nome, cargo) {
  const index = funcionarios.findIndex(funcionario => funcionario.id === id);
  if (index !== -1) {
    funcionarios[index].nome = nome;
    funcionarios[index].cargo = cargo;
    renderFuncionarios();
  }
}

// Function to delete a funcionario
function deleteFuncionario(id) {
  funcionarios = funcionarios.filter(funcionario => funcionario.id !== id);
  renderFuncionarios();
}

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
    const id = parseInt(e.target.getAttribute("data-id"));
    const nome = prompt("Editar nome:", funcionarios.find(funcionario => funcionario.id === id).nome);
    const cargo = prompt("Editar cargo:", funcionarios.find(funcionario => funcionario.id === id).cargo);
    if (nome && cargo) {
      editFuncionario(id, nome, cargo);
    }
  } else if (e.target.classList.contains("delete-button")) {
    const id = parseInt(e.target.getAttribute("data-id"));
    const confirmDelete = confirm("Tem certeza que deseja excluir este funcionario?");
    if (confirmDelete) {
      deleteFuncionario(id);
    }
  }
});

// Initial render
renderFuncionarios();



//Saving your First Data Object on Back4App
async function saveNewFuncionario() {
  const funcionario = new Parse.Object("Funcionario");

  funcionario.set("nome", "Pedro Ernesto Figueiredo");
  funcionario.set("cargo", "Corretor");
  try {
    let result = await funcionario.save()
    alert('New object created with objectId: ' + result.id);
  } catch (error) {
    alert('Failed to create new object, with error code: ' + error.message);
  }
}

//Reading your First Data Object from Back4App
async function retrieveFirstFuncionario() {
  const query = new Parse.Query("Funcionario");

  try {
    const funcionario = await query.get("7q5WZA6XVu");
    const nome = funcionario.get("nome");
    const cargo = funcionario.get("cargo");

    alert(`Nome: ${nome} Cargo: ${cargo}`);
  } catch (error) {
    alert(`Failed to retrieve the object, with error code: ${error.message}`);
  }
}