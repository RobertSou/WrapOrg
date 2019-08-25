module.exports = {
  async storeDoador(req, res) {
    let body = req.body;
    let user = await auth.SignUpWithEmailAndPassword(body.email, body.password);
    //TODO: handler erros and redict the user
  },
};
