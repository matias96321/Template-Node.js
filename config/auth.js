
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


            console.log(email);
            console.log(password);
            
            bcrypt.compare(password, usuarios.senha, (erro,batem) => {

                if(batem){
                    console.log("funfa");
                    return done(null,usuarios)
                }else{
                    console.log("erro");
                    
                    return done(null,false,{message: "Senha incorreta"})
                }
            })


        })


    }))

    passport.serializeUser(function(usuarios ,done){
        console.log("id");
        done(null, usuarios.id);

    });
    
    passport.deserializeUser(function(id, done){
       
        usuario.findOne({where:{id: id}}).then(function(usuarios){
            done(null, usuarios)}).catch(function(erro){
                done(erro, null)
            })
           
        });
}
