
const mongoose = require('mongoose');

// Schema que recebera os dados
const Schema = mongoose.Schema;

const dados = new Schema(
  {
    topTitulo: {
        type: String
    }, 
    topSubTitulo: {
        type: String
    }, 
    topTextoBtn: {
        type: String
    },    
    topLinkBtn: {
        type: String
    },    
    serTitulo: {
        type: String
    },
    serSubTitulo: {
        type: String
    },
    serUmIcone: {
        type: String
    },
    serUmTitulo: {
        type: String
    },
    serUmDesc: {
        type: String
    },
    serDoisIcone: {
        type: String
    },
    serDoisTitulo: {
        type: String
    },
    serDoisDesc: {
        type: String
    }, 
    serTresIcone: {
        type: String
    },
    serTresTitulo: {
        type: String
    },
    serTresDesc: {
        type: String
    }, 
 } , 
 { 
     timestamps: true,  // o certo é timestamps com 's' no final
 }
);

// exporta a constante home
mongoose.model('Home', dados);