const Ong = require('../models/ongModel');

module.exports = {
  showAllOngs(req, res){
    const allOngs = await Ong.find();
    return res.send(allOngs);
  }
}
