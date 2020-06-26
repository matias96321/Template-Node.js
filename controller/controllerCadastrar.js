const cadastro = require('express').Router();
const usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');



cadastro.get('/',function(req,res){
    res.render('usuarios/cadastrar')
})


//validação 
  cadastro.post('/cadastro/novo',function(req,res){

    erros = []
  
    if (!req.body.nomme || typeof req.body.nomme == undefined || req.body.nomme == null) {
      erros.push({Text: "Nome inválido."})
    }
    
    if(req.body.nomme.length > 0 && req.body.nomme.length < 5){
      erros.push({Text: "Nome muito pequeno."})
    }
    
    if (!req.body.emmail || typeof req.body.emmail == undefined || req.body.emmail == null ) {
      erros.push({Text: "Email inválido"})
    }
  
    if(req.body.sennha.length < 5){
      erros.push({Text: "Sua senha precisa ter no mínimo 5 carateres"})
    }

    if(req.body.sennha != req.body.sennha2){
      erros.push({Text: "Senhas divergentes."}) 
    }
                                                            
    
    if(erros.length > 0){

        res.render('usuarios/cadastrar',{erros: erros})

    }else{
          usuario.findOne({where:{email: req.body.emmail}}).then(function(usuarios){

          if(usuarios){
             req.flash("error_msg","Já existe uma conta cadastrada com esse email")
             res.redirect('/cadastro')
            }else{
             
            const formulario = usuario.build({ 
               
              nome: req.body.nomme,
                    
              email: req.body.emmail,

              senha: req.body.sennha
                
                                            
                })
                // Cadastro de ADM                      
                if(req.body.options == "adm"){
                  formulario.adm = 1
                }

                //encriptando senha
                 bcrypt.genSalt(10,function(erro,salt){

                    bcrypt.hash(formulario.senha,salt,function(erro,hash){
                      
                      if(erro){
                           
                        req.flash("error_msg", "Erro ao salvar senha de usuario")
                        res.redirect('/')
                    
                      }

                      formulario.senha = hash;
                      
                      //Insert no banco
                      formulario.save().then(function(){
                        req.flash("success_msg", "Contra criada com sucesso")
                        res.redirect('/')
                        
                      }).catch(function(erro){
                        req.flash("error_msg","Erro ao criar conta")
                        res.redirect('/cadastrar')

                      })
                      
                       


                    })
                    

                  })
                
                
                }
              })
            }     
                  
    
})
            
      







  
  module.exports = cadastro