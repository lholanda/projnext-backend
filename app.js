// run com nodemon app.js
const express = require('express');
// Using Node.js `require()`
const mongoose = require('mongoose');

const cors = require('cors');

// --------  MODELS 
require('./models/home');
require('./models/orcamento');
// utilizar a model do mongoose - vai no diretorio de models e procura por Home
const Home = mongoose.model('Home');
// utilizar a model do mongoose - vai no diretorio de models e procura por Home
const Orcamento = mongoose.model('Orcamento');

// implementar para a aplicacao aceitar formato JSON
const app = express();

// para aceitar formato JSON atraves de req.body() 
app.use(express.json())
// Enable CORS Requests passando o Acess-Control correspondente
app.use( (req, res, next ) => {
  res.header("Access-Control-Allow-Origin", "*"); // coloca os nomes de sites aqui
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
  app.use(cors());
  next();
})

// CONEXAO COM O BANDO DE DADOS
// connect to MongoDB with the mongoose.connect() method. nome da base de dados : holandaDB
mongoose.connect('mongodb://localhost:27017/holandaDB', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  console.log('Conexao com o banco de dados realizada com sucesso !!!')
}).catch((err) => {
  console.log('Erro:')
});

// o express gerenciará rotas
app.get('/home', async (req, res) => {
  await Home.findOne({})
    .then( (home) => {
      // verifica se home tem conteudo
      if(home){
        console.log("/home na API",'traz _id ', home['topTitulo']);
        return res.status(200).json({
          // status: 200, // se quiser trazer o status, aqui a API quem manda
          error: false,
          home: home
        });
      }
      else {
        console.log("nao encontrou a pagina errooooooorrrr")
        return res.status(400).json({
          error: true,
          message: "Error: Conteudo da pagina home nao cadastrado"
        });
      }
     })
    .catch((err) => {
      console.log("um erro");
      return res.status(400).json({
        error: true,
        message: "um erro ocorreu na leitura da página !!!"
      });
  });
});


// mesma rota verbo post
/*
async - middlewaere executta antes de qualquer instrucao. qdo estiver executando, e ele encontrar um await. finalizar o que estiver no wait para continuar
await - 
*/
// API responsavel por gravar os dados no endereco apontado por /home

// poderia fazer um formulario para editar os dados que iremos gravar aqui
app.post('/home', async (req, res) => {

  const dados = {
    "topTitulo"    : "RENAN **** We have a solution for your company",
    "topSubTitulo" : "This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.",
    "topTextoBtn"  : "Orçamento", 
    "topLinkBtn"   : "http://localhost:3000/orcamento", 
    "serTitulo"    : "Serviços",
    "serSubTitulo" : "Feature content or information.",
    "serUmIcone": "laptop-code",
    "serUmTitulo": "Serviço 1",
    "serUmDesc": "Praesent quis sagittis libero, nec suscipit neque. Quisque ut ultrices lectus, sit amet sollicitudin mauris.",
    "serDoisIcone": "mobile-alt",
    "serDoisTitulo": "Serviço 2",
    "serDoisDesc": "Nullam rutrum imperdiet nisi, eget facilisis elit consectetur accumsan lectus, sit amet sollicdin efficitur.",
    "serTresIcone": "network-wired",
    "serTresTitulo": "Serviço 3",
    "serTresDesc": "Quisque elementum suscipit dolor, sed lobortis nibh. Curabitur et dui iaculis, consectetur enim vitae purus.",
}
  console.log("Tentativa de cadastrar página...post in /home")
  // Faz uma pesquisa para verificar se a colllection Home já foi cadastrada
  const homeExiste = await  Home.findOne({}) // retorna un registro caso encontre algo
  if(homeExiste){
    return res.status(400).json({
      error: true,
      message: "Erro: A página já foi cadastrada !"
    })
  }

  // enquanto nao executar tudo o que está no await o async nao continua
  await Home.create(dados, (err) => {
    if(err) return res.status(400).json({
      error: true,
      message: "Error: Conteudo da pagina home nao cadastrado com sucesso !"
    });
    return res.status(201).json({
      error: false,
      message: "Sucesso - Conteudo da pagina home cadastrado com sucesso !"
    });
  })
})

/*
errooooo !!!!!!

quando vem do setInterval, está chegando vazio o req.body
*/


// -----------------------------------------------------------------------
// API responsavel por gravar os dados vindo do form Orcamento
// -----------------------------------------------------------------------
app.post('/orcamento', async (req, res) => {
  // req.body -> traz o que esta recebendo no formulario - vem no coropo da aplicacao
  // enquanto nao executar tudo o que está no await o async nao continua
  
  
  console.log ( req.body );

  // return erroForcado( res );

  await Orcamento.create(req.body , (err) => {
    // retorno a requisicao feita pelo site 
    if(err) return res.status(400).json({
      error: true,
      message: "Error: Orçamento nao enviado !"
    });
    return res.status(201).json({
      error: false,
      message: "Sucesso - Orçamento enviado com sucesso !"
    });
  })
})
// -----------------------------------------------------------------------
function erroForcado( res ) {
  return res.status(500).json({
    error: true,
    message: "Erro forçado !"
  });
}

// -----------------------------------------------------------------------
servidor = function(){
  console.log('Servidor Teste iniciado na porta 8080: http://localhost:8080')
}
app.listen(8080, servidor)  // o site irá utilizar a porta 3000
// -----------------------------------------------------------------------




/* 
estudos

ESTRUTURA

app.get('/home', async (req,res) => {
  await Home.findOne({}).then(() => {
    console.log("é 1")
    return res.status(201).json({error: 1});
  }).catch(() => {
    console.log("é 2")
    return res.status(400).json({error: 2});
  })
})
*/
