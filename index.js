// carreando modulos

const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express()
const path = require("path")
const usuario = require('./models/Usuario')
const session = require('express-session')
const flash = require('connect-flash')
const cadastro = require('./controller/controllerCadastrar')
const listar = require('./controller/controllerListar')
const deletar = require('./controller/controllerDeletar')
const editar = require('./controller/controllerEditar')
const passport = require('passport')
require('./config/auth')(passport)
const auth = require("./helpers/adm")



// configurações 

        //Body-Parser
            app.use(bodyParser.urlencoded({extended: false}))
            app.use(bodyParser.json())

        //sessão
            app.use(session({
                secret: "abcd",
                resave: true,
                saveUninitialized: true 
            }))
            app.use(passport.initialize())
            app.use(passport.session())
            app.use(flash())
            
            //middleway
            app.use(function ( req, res, next) {
                
                res.locals.success_msg = req.flash("success_msg")
                res.locals.error_msg = req.flash("error_msg")
                res.locals.error = req.flash("error")
                res.locals.user = req.user || null;
                next()
                
            });

        // Handlebars
            app.engine('handlebars',handlebars({defaultLayaut: 'main'}))
            app.set('view engine','handlebars');

        //path
            app.use(express.static(path.join(__dirname + "/public")))
        
        // Rotas

            app.get('/',function(req,res){

                res.render('usuarios/login')


            })

            app.get('/home',auth.user,function(req,res){

                    
                res.render('index')

            })


            app.post('/login',function(req,res,next){
            
                passport.authenticate("local", {
                successRedirect: "/home",
                failureRedirect: "/login",
                failureFlash: true 
                           
                })(req, res, next)
            })
            

            app.use('/cadastro',cadastro);

            app.use('/listar',auth.adm,listar);

            app.use('/deletar',auth.adm,deletar)

            app.use('/editar',auth.adm,editar);

            app.use('/logout',function(req,res){

                req.logout()
                req.flash("success_msg","Deslogado")
                res.redirect('/')


            })

// Outros

const port = 8081

app.listen(port,function(){
    console.log("sevidor OK");
})