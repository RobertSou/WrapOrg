const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load Doador Model
const Doador = require('../src/models/doadorModel');

module.exports = (passport) => {
    passport.use(new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
        //Match User
        Doador.findOne({ email })
            .then(user => {
                if(!user){
                    return done(null, false, { message: 'Esse email não está registrado' });
                }
                //Match password
                bcrypt.compare(password, user.password, (e, isMatch) => {
                    if(e) throw e;
                    if(isMatch){
                        return done(null, user);
                    }else{
                        return done(null, false, {message: 'Senha incorreta, digite novamente.'});
                    }
                });
            })
            .catch(e => console.log(e));
    }));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
        Doador.findById(id, (err, user) => {
            done(err, user);
        });
    });
}