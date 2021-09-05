const TwitchItem = require('../../model/twitch/TwitchItem');
var express = require('express');
const request = require('request');
var uniqid = require('uniqid');
const TwitchUserItem = require('../../model/twitch/TwitchUserItem');

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
                                    }, (TwitchErr, TwitchRes, TwitchBody) => {
            if (TwitchErr) { return console.log(TwitchErr); }
            switch(TwitchRes.statusCode){
                case 200:
                    req.session.twitch = TwitchRes.body;
                    this.WebPush(req, res,"GET", "/users?client_id=" + twitch.client_id, this.WebAuthChannel);
                    callback(req, res);
                    break;
                default:
                    //WebRefresh(req, res, callback); Noch nicht getestet
                    break;
            }      
        });
    }  

    static WebRefresh(req, res, callback) {
        var twitch = req.app.get('twitch');
        request(twitch.url_token + '?client_id=' + twitch.client_id +
                                   '&client_secret=' + twitch.client_secret +
                                   '&grant_type=' + twitch.refresh_type +
                                   '&refresh_token=' + req.session.twitch.refresh_token, { 
                                        json: true, 
                                        method: "POST" 
                                    }, async (TwitchErr, TwitchRes, TwitchBody) => {
            if (TwitchErr) { return console.log(TwitchErr); }
            switch(TwitchRes.statusCode){
                case 200:
                    req.session.twitch = TwitchRes.body;
                    this.WebPush(req, res,"GET", "/users?client_id=" + twitch.client_id, this.WebAuthChannel);
                    callback(req, res);
                    break;
                default:
                    break;
            }      
        });
    } 

    static WebPush(req, res, method, endpoint, callback) {
        var twitch = req.app.get('twitch');
        request(twitch.url_base + endpoint, { 
            method : method,
            auth : { "bearer": req.session.twitch.access_token }, 
            headers : { 'client-id' : twitch.client_id }
        }, (twitchErr, twitchRes, twitchBody) => {
            if (twitchErr) { return console.log(twitchErr); }
            callback(req, res, twitchErr, twitchRes, JSON.parse(twitchRes.body));
        });
    }

    static async WebAuthChannel(req, res, twitchErr, twitchRes, twitchBody){
        var twitchItem = await TwitchItem.get(req.app.get('channel').globalDatabase.sequelize,req.session.state, twitchBody.data[0].login);
        twitchItem.channelName = twitchBody.data[0].login;
        twitchItem.accessToken = req.session.twitch.access_token;
        twitchItem.refreshToken = req.session.twitch.refresh_token;
        twitchItem.scope = req.session.twitch.scope.join(' ');
        twitchItem.tokenType = req.session.twitch.token_type;
        twitchItem.state = req.session.state;
        await twitchItem.save();   

        var twitchUserItem = await TwitchUserItem.get(req.app.get('channel').globalDatabase.sequelize, twitchBody.data[0].login);
        twitchUserItem.displayName = twitchBody.data[0].display_name;
        twitchUserItem.type = twitchBody.data[0].type;
        twitchUserItem.broadcaster_type = twitchBody.data[0].broadcaster_type;
        twitchUserItem.description = twitchBody.data[0].description;
        twitchUserItem.profileImageUrl = twitchBody.data[0].profile_image_url;
        twitchUserItem.viewCount = twitchBody.data[0].view_count;
        twitchUserItem.eMail = twitchBody.data[0].email;
        await twitchUserItem.save();    
    }

    static async GetConnection(req, res) {
        var twitch = req.app.get('twitch');
        var result = {};

        if(req.session.state){
            var twitchItem = await req.app.get('channel').globalDatabase.sequelize.models.twitch.findOne({ where: { state: req.session.state } });
            if(twitchItem){
                var twitchUserItem = await TwitchUserItem.get(req.app.get('channel').globalDatabase.sequelize, twitchItem.channelName);
                result.userName = twitchUserItem.displayName; 
                result.userImage = twitchUserItem.profileImageUrl; 
            }
        } else {
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