const Ong = require('../models/ongModel');

module.exports = {
  async showAllOngs(req, res){
    const allOngs = await Ong.find();
    return res.send(allOngs);
  }
}
