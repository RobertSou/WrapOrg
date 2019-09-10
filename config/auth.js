module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', 'Por favor acesse sua conta para ter acesso a essa pagina');
        res.redirect('/doador/login');
    },
    alredyLogged: (req, res, next) => {
        if(req.isAuthenticated()){
            res.redirect('/dashboard');
        }
        next();
    }
}