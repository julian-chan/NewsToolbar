'use strict';

let request = require('request');
let https = require ('https');

// **********************************************
// *** Update or verify the following values. ***
// **********************************************

// Replace the accessKey string value with your valid access key.
let azure_accessKey = '6495a8dfb8254821a1f9ab9ebef536c9';
let deepai_accessKey = 'a68ee914-c771-44d5-9d89-731ebe21b53f'

// Replace or verify the region.

// You must use the same region in your REST API call as you used to obtain your access keys.
// For example, if you obtained your access keys from the westus region, replace 
// "westcentralus" in the URI below with "westus".

// NOTE: Free trial access keys are generated in the westcentralus region, so if you are using
// a free trial access key, you should not need to change this region.
let azure_uri = 'westcentralus.api.cognitive.microsoft.com';
let azure_sentiment_path = '/text/analytics/v2.0/sentiment';
let azure_key_phrases_path = '/text/analytics/v2.0/keyPhrases';

let deepai_uri = 'https://api.deepai.org';
let deepai_summary_path = '/api/summarization';

let response_handler = function (response) {
    let body = '';
    response.on ('data', function (d) {
        body += d;
    });
    response.on ('end', function () {
        let body_ = JSON.parse (body);
        let body__ = JSON.stringify (body_, null, '  ');
        console.log (body__);
    });
    response.on ('error', function (e) {
        console.log ('Error: ' + e.message);
    });
};

// Not using DeepAI Sentiment Analysis because it only returns {Positive, Neutral, Negative} 
// and does it for every sentence, not the entire passage.
let get_summary = function (articles) {
    if (typeof articles === 'string') {
        request.post({
            url: deepai_uri + deepai_summary_path,
            headers: {
                'Api-Key': 'a68ee914-c771-44d5-9d89-731ebe21b53f'
            },
            formData: {
                'text': articles
            }
        }, function callback(err, httpResponse, body) {
            if (err) {
                console.error('request failed:', err);
                return;
            }
            var response = JSON.parse(body);
            console.log(response);
        });
    } else {
        for (var i = 0; i < articles['documents'].length; i++) {
            request.post({
                url: deepai_uri + deepai_summary_path,
                headers: {
                    'Api-Key': 'a68ee914-c771-44d5-9d89-731ebe21b53f'
                },
                formData: {
                    'text': articles['documents'][i]['text']
                }
            }, function callback(err, httpResponse, body) {
                if (err) {
                    console.error('request failed:', err);
                    return;
                }
                var response = JSON.parse(body);
                console.log(response);
            });
        }
    }
}

let get_sentiments = function (articles) {
    let body = JSON.stringify (articles);

    let request_params = {
        method : 'POST',
        hostname : azure_uri,
        path : azure_sentiment_path,
        headers : {
            'Ocp-Apim-Subscription-Key' : azure_accessKey,
        }
    };

    let req = https.request (request_params, response_handler);
    req.write (body);
    req.end ();
}

let get_key_phrases = function (articles) {
    let body = JSON.stringify (articles);

    let request_params = {
        method : 'POST',
        hostname : azure_uri,
        path : azure_key_phrases_path,
        headers : {
            'Ocp-Apim-Subscription-Key' : azure_accessKey,
        }
    };

    let req = https.request (request_params, response_handler);
    req.write (body);
    req.end ();
}

let documents = { 'documents': [
    { 'id': '1', 'language': 'en', 'text': 'I really enjoy the new XBox One S. It has a clean look, it has 4K/HDR resolution and it is affordable.' },
    { 'id': '2', 'language': 'es', 'text': 'Este ha sido un dia terrible, llegué tarde al trabajo debido a un accidente automobilistico.' },
]};

get_sentiments (documents);


let documents = { 'documents': [
    { 'id': '1', 'language': 'en', 'text': 'I really enjoy the new XBox One S. It has a clean look, it has 4K/HDR resolution and it is affordable.'},
    { 'id': '2', 'language': 'es', 'text': 'Si usted quiere comunicarse con Carlos, usted debe de llamarlo a su telefono movil. Carlos es muy responsable, pero necesita recibir una notificacion si hay algun problema.'},
    { 'id': '3', 'language': 'en', 'text': 'The Grand Hotel is a new hotel in the center of Seattle. It earned 5 stars in my review, and has the classiest decor I\'ve ever seen.'}
]};

get_key_phrases (documents);


let article = 'An African Methodist pastor, dressed in a dark suit and white clerical collar, greeted a Conservative rabbi, wearing a black overcoat and matching fedora, in the lobby of a downtown hotel on Friday morning. They spread their arms wide and embraced at length, the rabbi patting the pastor rhythmically on the back as the pastor drew him close. Words were not necessary.The two men had never met, but for a week they have been bound by the unspeakable grief of two unconscionable desecrations. The pastor was the Rev. Eric S.C. Manning, who leads Emanuel African Methodist Episcopal Church in Charleston, S.C., where nine parishioners were  in a racist attack during a Wednesday night Bible study on June 17, 2015. The rabbi was Jeffrey Myers of the Tree of Life congregation in Pittsburgh’s Squirrel Hill neighborhood, where 11 worshipers were gunned down during shabbat services last Saturday.When a virulent anti-Semite walked through unlocked doors into a house of God that morning and opened fire on believers in prayer, the analogies to the massacre at Emanuel A.M.E. became inescapable. Here within 40 months were two ruthlessly murderous attacks in the most sacred of spaces, victimizing minority communities — one racial, one religious — that share a centuries-long struggle against bigotry and persecution.In both instances, the gunmen left a cache of hate-filled online commentary and eagerly volunteered their motives.'

get_summary(documents);