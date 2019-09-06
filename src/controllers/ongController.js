const auth = require('../../firebase');

module.exports = {
  renderOngLogin(req, res) {
    res.render("ongLogin")
  },
  renderOngRegistro(req, res){
    res.render("ongRegistro")
  },
  async loginOng(req, res) {

  },
  async registerOng(req, res) {
  }
}