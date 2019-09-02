const auth = require('../../firebase');

module.exports = {
  renderDoador(req, res) {
    res.render("doadorSignInUp");
  },
  async loginDoador(req, res) {
    let { email, password } = req.body;
    try{
      let user = await auth.doadorLogin(email, password);
      //TODO: handler erros and redict the user
      console.log(user);
      res.redirect('/dashboard');
    }catch(e){
      console.log(e);
    }
  },
  async registerDoador(req, res) {
    let {name, email, password, rpassword} = req.body;
    let user = await auth.doadorRegister(name, email, password, rpassword);
    //TODO: handler erros and redict the user
    res.redirect('/dashboard', user);
  },
};