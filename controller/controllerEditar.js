
const editar = require('express').Router();
const usuario = require('../models/Usuario');





editar.get('/:id',function(req,res){

  usuario.findOne({where:{id:req.params.id}}).then(function(editar){ 
    
  res.render('admin/editar', {editar: editar.toJSON()})
  }).catch(function(erro){
  req.redirect('admin/lista')
  })
})

editar.post('/alterar',function(req,res){

 
        usuario.findOne({where:{id: req.body._id}}).then(function(usuarios){
          
          console.log(usuarios);

          usuarios.nome = req.body.nomme    
          usuarios.email = req.body.emmail
          usuarios.senha = req.body.sennha
          

          console.log(usuarios);
          
          usuarios.save().then(function(){

          req.flash("success_msg", "Dados de usuario alterado com sucesso")
          res.redirect('/listar')
          })
        }).catch((err) => {
  
        req.flash("error_msg", "Não foi possível encontrar usuario")
        res.redirect('/listar')
      });
    });
 
module.exports = editar
