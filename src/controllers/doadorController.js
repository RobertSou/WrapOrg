const Doador = require('../models/doadorModel');
const bcrypt = require('bcryptjs');
const passport = require('passport');

module.exports = {
  renderDashboard(req, res){
    let { name } = req.user;
    res.render("dashboardDoador", { name });
  },
  renderDoadorLogin(req, res) {
    res.render("doadorLogin");
  },
  renderDoadorRegistro(req, res){
    res.render("doadorRegistro");
  },
  loginDoador(req, res, next) {
    passport.authenticate('doador', {
      successRedirect: '/doador/dashboard',
      failureRedirect: '/doador/login',
      failureFlash: true,
    })(req, res, next);
  },
  registerDoador(req, res) {

    let {
      name, 
      email, 
      password, 
      rpassword
    } = req.body;

    let erros = [];

    //Check required fields
    if(!name || !email || !password || !rpassword){
      erros.push({msg: 'Por favor, preencha todos os campos.'});
    }

    //Check password
    if(password !== rpassword){
      erros.push({msg: 'As senhas não batem, digite novamente.'});
    }

    //Check password size
    if(password.length < 6){
      erros.push({msg: 'A senha deve conter pelo menos 6 caracteres.'});
    }

    if(erros.length > 0){
      res.render('doadorRegistro', {
        erros,
        name,
        email,
        password,
        rpassword,
      });
    } else {
      Doador.findOne({ email })
        .then(user => {
          if(user){
            erros.push({msg: 'Email já está em uso, tente outro.'});
            res.render('doadorRegistro', {
              erros,
              name,
              email,
              password,
              rpassword,
            });
          } else {
            const newUser = new Doador({
              name,
              email,
              password
            });
            //Hash password
            bcrypt.genSalt(10, (e, salt) => {
              bcrypt.hash(newUser.password, salt, (e, hash) => {
                if(e) throw e;

                //set password to hash
                newUser.password = hash;

                //save the user
                newUser.save()
                  .then(user => {
                    req.flash('sucess_msg', 'Agora você está registrado e pode entrar.');
                    res.redirect('/doador/login');
                  })
                  .catch(e => console.log(e));
              });
            });
          }
        });
    }
  },
};