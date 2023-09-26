const Parse = require('parse/node');

Parse.initialize("IXkKfuGYK6z4bcOrN4kmlm4OZ5ybfaOpY6rtKa9P", "OTe1uGNezLiyWgFDsmQ47oFtFKyKFMPDAilWGFzl");
Parse.serverURL = 'https://parseapi.back4app.com/'

async function saveNewFinancialData() {  
  const financeiro = new Parse.Object('Financeiro')
  
  const imovelObjectId = 'opUbyhDQZC'

  const imovelQuery = new Parse.Query('Imovel');
  const imovelQueryBuild = imovelQuery.equalTo('objectId', imovelObjectId);
  const imovelQueryResults = await imovelQueryBuild.first()
  
  // console.log('imovelQueryResult => ', imovelQueryResults)
  
  const financeiroQuery = new Parse.Query('Financeiro');
  financeiroQuery.equalTo('imovel', imovelQueryResults);
  const financeiroQueryResults = await financeiroQuery.find();
  
  // console.log('financeiroQueryResults =>', financeiroQueryResults)

  if (financeiroQueryResults.length > 0) {
    console.log(
      'Erro! Já existe um dado financeiro com este imóvel!',
    );
    return false;
  } 
    
  try {
    
    let financeiroRelation = financeiro.relation('imovel');
    financeiroRelation.add(imovelQueryResults);
    // financeiro.set('valor_venda', 50000);
    // financeiro.set('valor_aluguel', 2000);
    
    await financeiro.save();
    if (financeiro !== null) {
      console.log(
        `New object created with success! ObjectId: ${
          financeiro.id
        }, ${financeiro.get("username")}`
      );
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

// async function getFinancialData () {
//   const data = new Parse.Query("Financeiro");
  
//   const results = await data.find();
//   console.log(results);

// };

saveNewFinancialData();
