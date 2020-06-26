
const link = require('./dataBases')

const usuario = link.connection.define('usuarios',{
   
    adm:{
        type: link.Sequelize.INTEGER,
        defaultValue: 0
    },

    nome:  {
        type: link.Sequelize.STRING},
                                     
    email: {
        type: link.Sequelize.STRING},
        
    senha: {
        type: link.Sequelize.STRING},
        
    })     

//usuario.sync({force: true}) 

    module.exports = usuario

