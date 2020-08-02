var config = require('../config');

exports.github = function (req, res, next) {
  const authorize_uri = 'https://github.com/login/oauth/authorize';
  url = `${authorize_uri}?client_id=${config.GITHUB_OAUTH.clientID}`;
  return res.redirect(url);
};
