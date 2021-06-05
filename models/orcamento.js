
const mongoose = require('mongoose');

// Schema que recebera os dados
const Schema = mongoose.Schema;

const dados = new Schema(
  {
    name: {
        type: String
    }, 
    email: {
        type: String
    }, 
    phone: {
        type: String
    },    
    whatsApp: {
        type: String
    },
    projeto: {
        type: String
    },
    idade: {
        type: String
    },
    sexo: {
        type: String
    }
 } , 
 { 
     timestamps: true,  // o certo é timestamps com 's' no final
 }
);

// exporta a constante home
mongoose.model('Orcamento', dados);