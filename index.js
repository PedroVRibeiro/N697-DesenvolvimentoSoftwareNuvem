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

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".button");

    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            saveNewFuncionario()
            retrieveFirstFuncionario()
        });
    });
});