const Ong = require('../models/ongModel');

module.exports = {
  async showAllOngs(req, res){
    const allOngs = await Ong.find({});

    let Ongs = [];

    allOngs.map(donation => {
      Ongs.push({
        "name": donation.name,
        "email": donation.email,
        "publicInfo": donation.publicInfo,
      });
    });

    return res.send(Ongs);
  }
}
