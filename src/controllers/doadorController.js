const auth = require('../../firebase');

module.exports = {
  renderDoadorLogin(req, res) {
    res.render("doadorLogin");
  },
  renderDoadorRegistro(req, res){
    res.render("doadorRegistro");
  },
  async loginDoador(req, res) {
    let { email, password } = req.body;
    try{
      let response = await auth.doadorLogin(email, password);
      //TODO: handler erros and redict the user
      if(response.err) return res.status(500).send(response.err);
      res.redirect('/dashboard', {userName: userName.displayName});
    }catch(e){
      console.log(e);
    }
  },
  async registerDoador(req, res) {
    let {name, email, password, rpassword} = req.body
    let response = await auth.doadorRegister(name, email, password, rpassword)
    //TODO: handler erros and redict the user
    console.log(response)
    res.redirect('/dashboard')
  },
};