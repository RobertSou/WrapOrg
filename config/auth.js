module.exports = {
    ensureAuthenticated: (req, res, next) => {
        //req.usedStrategy === 'doador'
        if(!req.isAuthenticated()){
            //req.flash('error_msg', 'Por favor acesse sua conta para ter acesso a essa pagina');
            res.redirect('/');
        } else {
            next();
        }
    },
    alredyLogged: (req, res, next) => {
        if(req.isAuthenticated() && req.usedStrategy === 'ong'){
            res.redirect('/ong/dashboard');
        } else if(req.isAuthenticated() && req.usedStrategy === 'doador'){
            res.redirect('/doador/dashboard');
        } else {
            next();
        }
    }
}