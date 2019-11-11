const Donation = require('../models/doacoesModel');
const Doador = require('../models/doadorModel');

module.exports = {
    async renderMyDonations(req, res){
        const { firstname, donations } = req.user;
        
        const allDonations = await Donation.find({
            _id: { 
                $in: donations
            }
        });

        let erros = [];

        if(allDonations){;
            res.render("minhasDoacoes", {
                displayName: firstname, 
                myDonations: allDonations,
            });
        } else {
            erros.push({msg: 'Você não fez nenhuma doação ainda!'});
            res.render("minhasDoacoes", {
                erros,
                displayName: firstname,
            });
        }
    },
    async makeDonation(req, res, next){
        const { connectInfo } = req.user;
        const { type, quality, qtd } = req.body;
        const loggedDonor = await Doador.findById(req.user);

        let erros = [];

        if(!type){
            erros.push({msg: 'Tipo invalido ou não selecionado, tente novamente.'});
        }

        if(!connectInfo.address.city ||
            !connectInfo.address.state ||
            !connectInfo.address.street ||
            !connectInfo.address.cep ||
            !connectInfo.tel){
            erros.push({msg: 'Endereço ou informações de contato imcompleto, complete o perfil para doar.'});
        }

        if(erros.length > 0){
            let { firstname } = req.user;
            res.render("dashboardDoador", {
              erros,
              displayName: firstname,
            });
          }else{

            const newDonation = new Donation({
                types: type,
                qualidade: quality,
                quantidade: qtd,
            });
            await newDonation.save();
            loggedDonor.donations.push(newDonation._id);
            await loggedDonor.save();
            req.flash('cardSucess', 'Doação salva com sucesso, para ve-la vá a pagina de doações.');
            res.redirect('/doador/dashboard');    
        }
    },
}