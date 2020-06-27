
module.exports = {
    adm: function(req,res,next){

        if(req.isAuthenticated() && req.user.adm == 1){

            return next();
        };

        req.flash("error_msg", "Acesso restrito")
        res.redirect("/");
    
    },

    user: function(req,res,next){

        if(req.isAuthenticated() || req.user.adm == 1){
            return next();
        }

        req.flash("error_msg", "Voce precisa esta logado para acessar")
        res.redirect("/")
    
    }

};