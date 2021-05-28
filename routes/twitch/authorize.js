const TwitchItem = require('../../model/twitch/TwitchItem');
var express = require('express');
const request = require('request');
var uniqid = require('uniqid');

class Authorize {
    static WebAuth(req, res, callback) {
        var twitch = req.app.get('twitch');
        request(twitch.url_token + '?client_id=' + twitch.client_id +
                                   '&client_secret=' + twitch.client_secret +
                                   '&code=' + req.query.code +
                                   '&grant_type=' + twitch.grant_type +
                                   '&redirect_uri=' + twitch.redirect_uri, { 
                                        json: true, 
                                        method: "POST" 
                                    }, async (TwitchErr, TwitchRes, TwitchBody) => {
            if (TwitchErr) { return console.log(TwitchErr); }
            switch(TwitchRes.statusCode){
                case 200:
                    var item = await TwitchItem.get(req.app.get('channel').globalDatabase.sequelize, req.session.state);
                    item.channelName = "test";
                    item.accessToken = TwitchRes.body.access_token;
                    item.refreshToken = TwitchRes.body.refresh_token;
                    item.scope = TwitchRes.body.scope.join(' ');
                    item.tokenType = TwitchRes.body.token_type;
                    await item.save();

                    callback(req, res);
                    break;
                default:
                    break;
            }      
        });
    }
  
    static WebPush(req, res, endpoint, method, callback) {
        var twitch = req.app.get('twitch');

        request(twitch.url_base + endpoint, { 
                json: true, 
                method: method
            }, (TwitchErr, TwitchRes, TwitchBody) => {
                if (TwitchErr) { return console.log(TwitchErr); }
                callback(req, res, TwitchErr, TwitchRes, TwitchBody);
            });
    }

    static GetUrl(req, res) {
        var twitch = req.app.get('twitch');
        var result = {};

        if(!req.session.state){
            req.session.state = uniqid();
        }
        result.url = twitch.url_authorize + '?client_id=' + twitch.client_id +
                                      '&redirect_uri=' + twitch.redirect_uri +
                                      '&response_type=' + twitch.response_type +
                                      '&scope=' + twitch.scope +
                                      '&state=' + req.session.state;
        return result;
    }
}

module.exports = Authorize;