const Doador = require('../models/doadorModel');
const bcrypt = require('bcryptjs');
const passport = require('passport');

module.exports = {
  renderDashboard(req, res){
    let user = req.user;
    res.render("dashboardDoador", { displayName: user.firstname });
      //req.flash('error_msg', 'Perfil incompleto, preencha todas as informações para poder doar!');
      //res.redirect('/doador/dashboard');
  },
  renderDoadorLogin(req, res) {
    res.render("doadorLogin");
  },
  renderDoadorRegistro(req, res){
    res.render("doadorRegistro");
  },
  renderConfig(req, res){
    let { firstname, lastname, email, cpf, connectInfo} = req.user;
    res.render("configDoador", { 
      displayName: firstname,
      displayLastname: lastname,
      email,
      cpf,
      connectInfo,
      query: req.query
    });
  },
  async editPersonal(req, res, next){
    let {
      email,
      currentPassword,
      newPassword,
      newPassword2
    } = req.body;

    let erros = [];

    if(!email || !currentPassword || !newPassword || !newPassword2){
      erros.push({msg: 'Por favor, preencha todos os campos.'});
    }

    const match = await bcrypt.compare(currentPassword, req.user.password);

    if(!match){
      erros.push({msg: 'Senha atual invalida, tente novamente.'});
    }

    //Check password size
    if(newPassword.length < 6){
      erros.push({msg: 'A sua nova senha deve conter pelo menos 6 caracteres.'});
    }

    if(newPassword !== newPassword2){
      erros.push({msg: 'Novas senhas não batem, tente novamente.'});
    }

    if(erros.length > 0){
      let { firstname, lastname, connectInfo, cpf} = req.user;
      res.render("configDoador", {
        erros,
        query: {section: "personalinfo"},
        displayName: firstname,
        displayLastname: lastname,
        email,
        cpf,
        connectInfo,
        currentPassword,
      });
    }else{
      Doador.findById(req.user.id, (err, user) => {
        //Hash password
        bcrypt.genSalt(10, (e, salt) => {
          bcrypt.hash(newPassword, salt, (e, hash) => {
            if(e) throw e;
            user.password = hash;
            user.save((err) => {
              if(err){
                req.flash('error_msg', 'Algum erro ocorreu ao salvar sua senha, tente novamente.');
                res.redirect('/doador/config');
              }else{
                req.flash('sucess_msg', 'Configurações salvar com sucesso!.');
                res.redirect('/doador/config');
              }

            });
          });
        });
      });
    }
  },
  editAddress(req, res, next){
    let {
      endereco,
      estado,
      cidade,
      cep,
      telefone
    } = req.body;

    let erros = [];

    if(!endereco || !estado || !cidade || !cep || !telefone){
      erros.push({msg: 'Por favor, preencha todos os campos.'});
    }

    if(erros.length > 0){
      let { firstname, lastname, connectInfo} = req.user;
      res.render("configDoador", {
        erros,
        query: {section: "address"},
        displayName: firstname,
        displayLastname: lastname,
        connectInfo,
        endereco,
        estado,
        cidade,
        cep,
        telefone
      });
    }else{
      Doador.findById(req.user.id, (e, user) => {

          user.connectInfo.tel = telefone;
          user.connectInfo.address.city = cidade;
          user.connectInfo.address.state = estado;
          user.connectInfo.address.street = endereco;
          user.connectInfo.address.cep = cep;

          user.save((err) => {
            if(err){
              req.flash('cardError','Algum erro ocorreu ao salvar suas informações, tente novamente.');
              res.redirect('/doador/config');
            }else{
              req.flash('cardSucess', 'Configurações salvas com sucesso!');
              res.redirect('/doador/config');
            }
          });
      });
    }
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
      firstname,
      lastname,
      email,
      cpf,
      password, 
      rpassword
    } = req.body;

    let erros = [];

    //Check required fields
    if(!firstname || !lastname || !cpf || !email || !password || !rpassword){
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
        firstname,
        lastname,
        email,
        cpf,
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
              firstname,
              lastname,
              email,
              cpf,
              password,
              rpassword,
            });
          } else {
            const newUser = new Doador({
              firstname,
              lastname,
              email,
              cpf,
              password,
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