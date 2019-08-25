module.exports = {
  async storeDoador(req, res) {
    let body = req.body;
    let user = await auth.SignInWithEmailAndPassword(body.email, body.password);
    //TODO: handler erros and redict the user
  },
  renderDoador(req, res) {
    res.render("loginDoador");
  }
};
