const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load Doador Model
const Doador = require('../src/models/doadorModel');
const Ong = require('../src/models/ongModel');

module.exports = (passport) => {
    passport.use('doador', new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
        //Match doador
        Doador.findOne({ email })
            .then(doador => {
                if(!doador){
                    return done(null, false, { message: 'Esse email não está registrado' });
                }
                //Match password
                bcrypt.compare(password, doador.password, (e, isMatch) => {
                    if(e) throw e;
                    if(isMatch){
                        return done(null, doador);
                    } else {
                        return done(null, false, { message: 'Senha incorreta, digite novamente.' });
                    }
                });
            }).catch(e => console.log(e));
    }));

    passport.use('ong', new LocalStrategy(
        { usernameField: 'email' },
        (email, password, done) => {
            //Match Ong
            Ong.findOne({ email })
            .then(ong => {
                if(!ong){
                    return done(null, false, { message: 'Esse email não está registrado' });
                }

                //Match password
                bcrypt.compare(password, ong.password, (e, isMatch) => {
                    if(e) throw e;
                    if(isMatch){
                        return done(null, ong);
                    } else {
                        return done(null, false, { message: 'Senha incorreta, digite novamente.' });
                    }
                });
        }).catch(e => console.log(e));
    }));

    function PrincipleInfo(principleId, principleType, details){
        this.principleId = principleId;
        this.principleType = principleType;
        this.details = details;
    }

    passport.serializeUser((user, done) => {
        let principleType = 'doador';
        let userPrototype =  Object.getPrototypeOf(user);

        if (userPrototype === Doador.prototype) {
            principleType = 'doador';
        } else if (userPrototype === Ong.prototype) {
            principleType = 'ong';
        }

        let principleInfo = new PrincipleInfo(user.id, principleType, '');
        done(null, principleInfo);
    });
    
    passport.deserializeUser((principleInfo, done) => {
        if(principleInfo.principleType === 'doador'){
            Doador.findOne({
                _id: principleInfo.principleId
            }, (err, user) => {
                done(err, user);
            });
        } else if (principleInfo.principleType == 'ong') {
            Ong.findOne({
                _id: principleInfo.principleId
            }, (err, user) => {
                done(err, user);
            });
        }
    });
}