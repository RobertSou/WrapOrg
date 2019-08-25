const firebase = require("firebase");
const auth = require("../../firebase");

firebase.auth().onAuthStateChanged(user => {
  //TODO: Handle if the user is logged or not
});

module.exports = {
  render(req, res) {
    //TODO: Handle if the user is logged or not
    res.render("dashboard");
  }
};
