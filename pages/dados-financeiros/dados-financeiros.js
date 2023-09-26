const Parse = require('parse/node');

Parse.initialize("IXkKfuGYK6z4bcOrN4kmlm4OZ5ybfaOpY6rtKa9P", "OTe1uGNezLiyWgFDsmQ47oFtFKyKFMPDAilWGFzl");
Parse.serverURL = 'https://parseapi.back4app.com/'

async function saveNewFinancialData() {  
  const financeiro = new Parse.Object('Financeiro')
  
  const imovelObjectId = 'opUbyhDQZC'

  const imovelQuery = new Parse.Query('Imovel');
  const imovelQueryBuild = imovelQuery.equalTo('objectId', imovelObjectId);
  const imovelQueryResults = await imovelQueryBuild.first()
  
  const financeiroQuery = new Parse.Query('Financeiro');
  financeiroQuery.equalTo('imovel', imovelQueryResults);
  const financeiroQueryResults = await financeiroQuery.find();
  
  if (financeiroQueryResults.length > 0) {
    console.log(
      'Erro! Já existe um dado financeiro com este imóvel!',
    );
    return false;
  } 
    
  try {
    
    let financeiroRelation = financeiro.relation('imovel');
    financeiroRelation.add(imovelQueryResults);
  
    await financeiro.save();
    if (financeiro !== null) {
      console.log(
        `Novo objeto criado com sucesso! ObjectId: ${
          financeiro.id
        }, ${financeiro.get("username")}`
      );
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

async function deleteFinancialData() {
  const financeiroObjectId = 'w51t130yJU'

  const financialDataResult = await getOneFinancialData(financeiroObjectId); 

  try {
  console.log(
    `Objeto deletado com sucesso! ObjectId: ${
      financialDataResult.id
    }, ${financialDataResult.get("username")}`
  );
  await financialDataResult.destroy();
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

async function updateFinancialData() {
  const financeiroObjectId = '6ATw4TR7EO'
 
  const financialDataResult = await getOneFinancialData(financeiroObjectId);

  const novoValorVenda = 10000;
  const novoValorAluguel = 3000;

  financialDataResult.set('valor_venda', novoValorVenda)
  financialDataResult.set('valor_aluguel', novoValorAluguel)

  try {
  console.log(
    `Objeto atualizado com sucesso! ObjectId: ${
      financialDataResult.id
    }, ${financialDataResult.get("username")}`
  );
  await financialDataResult.save();
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

async function getOneFinancialData (objectId) {
  const financeiroQuery = new Parse.Query('Financeiro');
  const financeiroQueryBuild = financeiroQuery.equalTo('objectId', objectId);
  const financeiroQueryResults = await financeiroQueryBuild.first()

  if (financeiroQueryResults.length < 0) {
    console.log(
      'Erro! O dado informado não existe!',
    );
    return false;
  }

  return financeiroQueryResults;
}

async function getFinancialData () {
  const data = new Parse.Query("Financeiro");
  
  const results = await data.findAll();
  console.log(results);

};

updateFinancialData()
