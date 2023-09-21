const Parse = require('parse');

// Inicialize a SDK do Back4App
Parse.initialize("IXkKfuGYK6z4bcOrN4kmlm4OZ5ybfaOpY6rtKa9P", "OTe1uGNezLiyWgFDsmQ47oFtFKyKFMPDAilWGFzl");
Parse.serverURL = "https://parseapi.back4app.com/";

// Função para adicionar uma localidade CREATE (cidade, bairro ou região) ao Back4App
function adicionarLocalidade(tipo, nome) {
    const Localidade = Parse.Object.extend("Localidade"); // Usar o nome correto da classe
    const localidade = new Localidade(); // Usar o nome correto da classe
    localidade.set("Tipo", tipo); // "Tipo" indica se é uma cidade, bairro ou região
    localidade.set("Nome", nome);

    localidade.save().then(function(localidade) {
        console.log(`Localidade "${nome}" adicionada com sucesso com ID: ${localidade.id}`);
    }).catch(function(error) {
        console.error("Erro ao adicionar localidade:", error);
    });

  // Função para consultar localidades READ com base no tipo (Cidade, Bairro, Região)
function consultarLocalidadesPorTipo(tipo) {
    const Localidade = Parse.Object.extend("Localidade");
    const query = new Parse.Query(Localidade);
    query.equalTo("Tipo", tipo);

    query.find().then(function(localidades) {
        // Aqui, 'localidades' contém os resultados da consulta
        console.log(`Localidades do tipo "${tipo}":`, localidades);
    }).catch(function(error) {
        console.error("Erro ao consultar localidades:", error);
    });

function consultarLocalidadePorNome(nome) {
    const Localidade = Parse.Object.extend("Localidade");
    const query = new Parse.Query(Localidade);
    query.equalTo("Nome", nome);

    return query.first();
}

  
function atualizarNomeLocalidadePorNome(nome, novoNome) {
    consultarLocalidadePorNome(nome)
        .then(function (localidade) {
            if (localidade) {
                localidade.set("Nome", novoNome);
                return localidade.save();
            } else {
                throw new Error("Localidade não encontrada.");
            }
        })
        .then(function (localidadeAtualizada) {
            console.log(`Nome da localidade atualizado com sucesso: ${localidadeAtualizada.get("Nome")}`);
        })
        .catch(function (error) {
            console.error("Erro ao atualizar o nome da localidade:", error);
        });
}

  // Função para excluir uma localidade DELETE com base no ID
function excluirLocalidadePorID(localidadeID) {
    const Localidade = Parse.Object.extend("Localidade");
    const localidade = new Localidade();
    localidade.set("objectId", localidadeID); // Define o ID da localidade a ser excluída

    // Exclui a localidade
    localidade.destroy().then(function() {
        console.log(`Localidade com ID ${localidadeID} excluída com sucesso.`);
    }).catch(function(error) {
        console.error("Erro ao excluir localidade:", error);
    });
}

// Exemplo de exclusão de localidade por ID
// Substitua 'localidadeID' pelo ID da localidade que você deseja excluir
// excluirLocalidadePorID(localidadeID);

}

// Exemplo de atualização de nome de localidade por ID
// Substitua 'localidadeID' pelo ID da localidade que você deseja atualizar
// Substitua 'novoNome' pelo novo nome desejado
// atualizarNomeLocalidadePorID(localidadeID, novoNome);

}

// Exemplo de consulta de cidades
consultarLocalidadesPorTipo("Cidade");

}

// Exemplos de adição de localidades
adicionarLocalidade("Cidade", "Cidade A");
adicionarLocalidade("Bairro", "Bairro B");
adicionarLocalidade("Região", "Região C");
