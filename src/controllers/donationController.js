const Donation = require('../models/doacoesModel');

module.exports = {
    async renderMyDonations(req, res){
        const { firstname, connectInfo } = req.user;
        
        const myDonations = await Donation.find(
            {user: req.user._id}
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
                user: req.user._id,
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
            req.flash('cardError', 'Falha ao remover doação, tente novamente.');
            res.redirect('/doador/minhasDoacoes');
        }
    },
}