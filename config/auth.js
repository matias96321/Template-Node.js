
const banco = require("../models/dataBases");
const bcrypt = require('bcryptjs');
var passport = require('passport')
const LocalStrategy = require("passport-local").Strategy

const usuario = require("../models/Usuario.js");


module.exports = function(passport){
    
    passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password' },(email,password,done) => {
        
            usuario.findOne({where:{email: email}}).then(function(usuarios){
                   
                
                
            if(!usuarios){
                
                return done(null, false, {message: "Esta conta não existe"})
            }


            
            bcrypt.compare(password, usuarios.senha, (erro,batem) => {

                if(batem){
                    
                    return done(null,usuarios)
                }else{
                    
                    
                    return done(null,false,{message: "Senha incorreta"})
                }
            })


        })


    }))

    passport.serializeUser(function(usuarios ,done){
        
        done(null, usuarios.id);

    });
    
    passport.deserializeUser(function(id, done){
       
        usuario.findOne({where:{id: id}}).then(function(usuarios){
            done(null, usuarios)}).catch(function(erro){
                done(erro, null)
                
            })
           
        });
}
