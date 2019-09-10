module.exports = {
  render(req, res) {
    res.render("dashboard", {name: req.user.name});
  }
};
