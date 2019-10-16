const Ong = require('../models/ongModel');
const bcrypt = require('bcryptjs');
const passport = require('passport');

module.exports = {
  renderDashboard(req, res){
    let { name } = req.user;
    res.render("dashboardOng", { displayName: name });
  },
  renderOngLogin(req, res) {
    res.render("ongLogin");
  },
  renderOngRegistro(req, res){
    res.render("ongRegistro");
  },
  renderConfig(req, res){
    let { name } = req.user;
    res.render("configOng.pug", { displayName: name });
  },
  async loginOng(req, res, next) {
    passport.authenticate('ong', {
      successRedirect: '/ong/dashboard',
      failureRedirect: '/ong/login',
      failureFlash: true,
    })(req, res, next);
  },
  async registerOng(req, res) {

    let {
      name,
      cnpj,
      email, 
      password, 
      rpassword
    } = req.body;

    let erros = [];

    //Check required fields
    if(!name || !cnpj || !email || !password || !rpassword){
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
      res.render('ongRegistro', {
        erros,
        name,
        cnpj,
        email,
        password,
        rpassword,
      });
    } else {
      Ong.findOne({ email })
        .then(user => {
          if(user){
            erros.push({msg: 'Email já está em uso, tente outro.'});
            res.render('ongRegistro', {
              erros,
              name,
              cnpj,
              email,
              password,
              rpassword,
            });
          } else {
            const newUser = new Ong({
              name,
              cnpj,
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
                    res.redirect('/ong/login');
                  })
                  .catch(e => console.log(e));
              });
            });
          }
        });
    }
  }
}