var config = require('../config');
var request = require('request');

exports.github = function (req, res, next) {
    const requestToken = req.query.code;
    uuu = 'https://github.com/login/oauth/access_token?' +
        `client_id=${config.GITHUB_OAUTH.clientID}&` +
        `client_secret=${config.GITHUB_OAUTH.clientSecret}&` +
        `code=${requestToken}`
    request.post({
        method: 'post',
        url: uuu,
        headers: {
            accept: 'application/json',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36'
        }
    }, function (err, res) {
        data = JSON.parse(res.body)
        console.log(data)
        request.get({
            method: 'get',
            url: `https://api.github.com/user`,
            headers: {
                accept: 'application/json',
                Authorization: `token ${data.access_token}`,
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36'
            }
        }, function (err, res) {
            json = JSON.parse(res.body)
            console.log(json)
            var profile = {};
            profile.id = String(json.id);
            profile.displayName = json.name;
            profile.username = json.login;
            profile.profileUrl = json.html_url;
            if (json.email) {
                profile.emails = [{ value: json.email }];
            }
            if (json.avatar_url) {
                profile.photos = [{ value: json.avatar_url }];
            }
            profile._json = json
            req.user = profile
            console.log(req.user)
            next();
        })
    })
};
