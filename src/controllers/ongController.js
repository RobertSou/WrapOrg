const Ong = require('../models/ongModel');
const Donation = require('../models/doacoesModel');
const bcrypt = require('bcryptjs');
const passport = require('passport');

module.exports = {
  async renderDashboard(req, res){
    let { name } = req.user;

    const allDonations = await Donation.find({pendingToOng: {$ne: true}}).populate('donor', 'firstname lastname email connectInfo');

    res.render("dashboardOng", { 
      displayName: name,
      allDonations,
     });
  },
  async renderPendingDonations(req, res){
    let { name } = req.user;

    const pendingDonations = await Donation.find({pendingToOng: {$ne: false}}).populate('donor', 'firstname lastname email connectInfo');

    res.render("pendingDonations", {
      displayName: name,
      pendingDonations,
     });
  },
  renderOngLogin(req, res) {
    res.render("ongLogin");
  },
  renderOngRegistro(req, res){
    res.render("ongRegistro");
  },
  renderConfig(req, res){
    let { name, email, cnpj, publicInfo} = req.user;
    res.render("configOng", { 
      displayName: name,
      email,
      cnpj,
      publicInfo,
      capaURI: publicInfo.capa.url,
      logoURI: publicInfo.logo.url,
      banner1: publicInfo.banner1.url,
      banner2: publicInfo.banner2.url,
      banner3: publicInfo.banner3.url,
      query: req.query
    });
  },
  saveBanner(req, res){
    let { originalname: name, size, filename: key } = req.file;
    
    let erros = [];

    if(req.file == undefined){
      erros.push({msg: 'Por favor, Insira uma imagem.'});
    }

    if(erros.length > 0){
      res.render("configOng", {
        erros,
      });
    } else {
      Ong.findById(req.user.id, (e, user) => {

        user.publicInfo.capa.name = name;
        user.publicInfo.capa.size = size;
        user.publicInfo.capa.key = key;
        user.publicInfo.capa.url = process.env.appURI + '/files/' + key;

        user.save((err) => {
          if(err){
            req.flash('cardError','Algum erro ocorreu ao salvar suas informações, tente novamente.');
            res.redirect('/ong/config');
          }else{
            req.flash('cardSucess', 'Banner alterado com sucesso!');
            res.redirect('/ong/config');
          }
        });
      });
    }
  },
  saveLogo(req, res){
    let { originalname: name, size, filename: key } = req.file;

    let erros = [];

    if(req.file == undefined){
      erros.push({msg: 'Por favor, Insira uma imagem.'});
    }

    if(erros.length > 0){
      res.render("configOng", {
        erros,
      });
    } else {
      Ong.findById(req.user.id, (e, user) => {

        user.publicInfo.logo.name = name;
        user.publicInfo.logo.size = size;
        user.publicInfo.logo.key = key;
        user.publicInfo.logo.url = process.env.appURI + '/files/' + key;

        user.save((err) => {
          if(err){
            req.flash('cardError','Algum erro ocorreu ao salvar suas informações, tente novamente.');
            res.redirect('/ong/config');
          }else{
            req.flash('cardSucess', 'Logo alterado com sucesso!');
            res.redirect('/ong/config');
          }
        });
      });
    }
  },
  saveBanner1(req, res){
    let { originalname: name, size, filename: key } = req.file;
    
    let erros = [];

    if(req.file == undefined){
      erros.push({msg: 'Por favor, Insira uma imagem.'});
    }

    if(erros.length > 0){
      res.render("configOng", {
        erros,
      });
    } else {
      Ong.findById(req.user.id, (e, user) => {

        user.publicInfo.banner1.name = name;
        user.publicInfo.banner1.size = size;
        user.publicInfo.banner1.key = key;
        user.publicInfo.banner1.url = process.env.appURI + '/files/' + key;

        user.save((err) => {
          if(err){
            req.flash('cardError','Algum erro ocorreu ao salvar suas informações, tente novamente.');
            res.redirect('/ong/config');
          }else{
            req.flash('cardSucess', 'Banner alterado com sucesso!');
            res.redirect('/ong/config');
          }
        });
      });
    }
  },
  saveBanner2(req, res){
    let { originalname: name, size, filename: key } = req.file;
    
    let erros = [];

    if(req.file == undefined){
      erros.push({msg: 'Por favor, Insira uma imagem.'});
    }

    if(erros.length > 0){
      res.render("configOng", {
        erros,
      });
    } else {
      Ong.findById(req.user.id, (e, user) => {

        user.publicInfo.banner2.name = name;
        user.publicInfo.banner2.size = size;
        user.publicInfo.banner2.key = key;
        user.publicInfo.banner2.url = process.env.appURI + '/files/' + key;

        user.save((err) => {
          if(err){
            req.flash('cardError','Algum erro ocorreu ao salvar suas informações, tente novamente.');
            res.redirect('/ong/config');
          }else{
            req.flash('cardSucess', 'Banner alterado com sucesso!');
            res.redirect('/ong/config');
          }
        });
      });
    }
  },
  saveBanner3(req, res){
    let { originalname: name, size, filename: key } = req.file;

    let erros = [];

    if(req.file == undefined){
      erros.push({msg: 'Por favor, Insira uma imagem.'});
    }

    if(erros.length > 0){
      res.render("configOng", {
        erros,
      });
    } else {
      Ong.findById(req.user.id, (e, user) => {

        user.publicInfo.banner3.name = name;
        user.publicInfo.banner3.size = size;
        user.publicInfo.banner3.key = key;
        user.publicInfo.banner3.url = process.env.appURI + '/files/' + key;

        user.save((err) => {
          if(err){
            req.flash('cardError','Algum erro ocorreu ao salvar suas informações, tente novamente.');
            res.redirect('/ong/config');
          }else{
            req.flash('cardSucess', 'Banner alterado com sucesso!');
            res.redirect('/ong/config');
          }
        });
      });
    }
  },
  async globalInfo(req, res){
    let { 
      email, 
      currentPassword, 
      newPassword, 
      newPassword2 } = req.body;

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
      let { name, cnpj, publicInfo} = req.user;
      res.render("configOng", {
        erros,
        query: { section: "globalInfo" },
        displayName: name,
        email,
        cnpj,
        publicInfo,
      });
    } else {
      Ong.findById(req.user.id, (err, user) => {
        //Hash password
        bcrypt.genSalt(10, (e, salt) => {
          bcrypt.hash(newPassword, salt, (e, hash) => {
            if(e) throw e;
            user.password = hash;
            user.save((err) => {
              if(err){
                req.flash('error_msg', 'Algum erro ocorreu ao salvar sua senha, tente novamente.');
                res.redirect('/ong/config');
              }else{
                req.flash('sucess_msg', 'Configurações salvar com sucesso!.');
                res.redirect('/ong/config');
              }

            });
          });
        });
      });
    }
  },
  ongAddress(req, res){
    
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
      let { name, publicInfo } = req.user;
      res.render("configOng", {
        erros,
        query: {section: "ongAddress"},
        displayName: name,
        publicInfo,
        endereco,
        estado,
        cidade,
        cep,
        telefone
      });
    }else{
      Ong.findById(req.user.id, (e, user) => {

          user.publicInfo.tel = telefone;
          user.publicInfo.address.city = cidade;
          user.publicInfo.address.state = estado;
          user.publicInfo.address.street = endereco;
          user.publicInfo.address.cep = cep;

          user.save((err) => {
            if(err){
              req.flash('cardError','Algum erro ocorreu ao salvar suas informações, tente novamente.');
              res.redirect('/ong/config');
            }else{
              req.flash('cardSucess', 'Configurações salvas com sucesso!');
              res.redirect('/ong/config');
            }
          });
      });
    }
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