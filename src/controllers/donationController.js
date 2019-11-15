const Donation = require('../models/doacoesModel');
const Ong = require('../models/ongModel');

module.exports = {
    async renderMyDonations(req, res){
        const { firstname, connectInfo } = req.user;
        
        const myDonations = await Donation.find(
            {donor: req.user._id}
        );

        let erros = [];

        if(myDonations){
            res.render("minhasDoacoes", {
                displayName: firstname,
                connectInfo,
                myDonations,
            });
        } else {
            erros.push({msg: 'Você não fez nenhuma doação ainda!'});
            res.render("minhasDoacoes", {
                erros,
                displayName: firstname,
                connectInfo,
            });
        }
    },
    async makeDonation(req, res){
        const { connectInfo } = req.user;
        const { type, quality, qtd } = req.body;

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
              connectInfo,
            });
          }else{

            const newDonation = new Donation({
                donor: req.user._id,
                types: type,
                quality,
                qtd,
            });

            await newDonation.save();
            
            req.flash('cardSucess', 'Doação salva com sucesso, para ve-la vá a pagina de doações.');
            res.redirect('/doador/dashboard');    
        }
    },
    async deleteDonation(req, res){
        try{
            await Donation.findByIdAndRemove(req.params.donationId);
            req.flash('cardSucess', 'Doação removida com sucesso.');
            res.redirect('/doador/minhasDoacoes');
        }catch(e){
            console.log(e);
            req.flash('cardError', 'Falha ao remover doação, tente novamente.');
            res.redirect('/doador/minhasDoacoes');
        }
    },
    //===============
    // ONG DONATION
    //==============
    async getDonation(req, res){
        try{
            const ongUser = await Ong.findById(req.user.id);

            await Donation.updateOne({_id: req.params.donationId}, {"$set": {"pendingToOng": true,}});
            await ongUser.pendingDonations.push(req.params.donationId);
    
            await ongUser.save();

            req.flash('cardSucess', 'Doação pendente, entre em contato com o doador para buscar.');
            res.redirect('/ong/dashboard');
        }catch(e){
            console.log(e);
            req.flash('cardError', 'Falha ao pegar doação, talvez um ong a escolheu primeiro.');
            res.redirect('/ong/dashboard');
        }
    },
    async removeDonationOng(req, res){
        try{
            const ongUser = await Ong.findById(req.user.id);

            await Donation.updateOne({_id: req.params.donationId}, {"$set": {"pendingToOng": false,}});
           
            await ongUser.updateOne({$pull: {pendingDonations: req.params.donationId}});
    
            req.flash('cardSucess', 'Doação removida com sucesso, você podera ve-lâ novamente na página inicial.');
            res.redirect('/ong/pendingDonations');
        }catch(e){
            console.log(e);
            req.flash('cardError', 'Falha ao remover doação, tente novamente ou contate o suporte.');
            res.redirect('/ong/pendingDonations');
        }
    },
}