const listar = require('express').Router();
const usuario = require('../models/Usuario');



listar.get('/',function(req,res){

    usuario.findAll().then((lista) =>{
    
    res.render('admin/lista',{lista: lista.map(lista => lista.toJSON())})
       
    })
})

module.exports = listar