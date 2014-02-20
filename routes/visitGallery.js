var profiles = require('../fakeDatabase.json');

exports.displayPage = function(req, res){
  res.render('visitGallery', profiles[0].exhibits[0]);
}