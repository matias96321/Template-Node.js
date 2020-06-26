const deletar = require('express').Router();
const usuario = require('../models/Usuario');


deletar.post('/',function(req,res){

    usuario.destroy({where: {id: req.body._id}}).then(function(){
          
        req.flash("success_msg", "Usuário deletado com sucesso")
        res.redirect('/listar')

    }).catch((err) => {
  
        req.flash("error_msg", "Falha ao deletar usuario")
        res.redirect('/listar')
    })
})


module.exports = deletar