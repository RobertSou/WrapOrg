module.exports = {
  renderDoador(req, res) {
    res.render("doadorSignInUp");
  },
  async loginDoador(req, res) {
    let body = req.body;
    let user = await auth.SignInWithEmailAndPassword(body.email, body.password);
    //TODO: handler erros and redict the user
  },
  async registerDoador(req, res) {
    let body = req.body;
    let user = await auth.SignUpWithEmailAndPassword(body.email, body.password);
    //TODO: handler erros and redict the user
  },
};
