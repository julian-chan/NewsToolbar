document.addEventListener("DOMContentLoaded", function(event) {
  var newsUpdateTimer = setInterval(fetchNews, 1 * 1000000 * 1000);

  function fetchNews() {
    if (jQuery) {
      //getArticle("https://www.cnn.com/2018/11/03/politics/donald-trump-mike-lindell-mypillow-midterms/index.html", ".zn-body__read-all");
      //getArticle("https://lihkg.com/thread/877010/page/1", "div[data-ast-root='true']");
      getArticles('https://www.cnn.com/us', '.cd__content', '.zn-body__read-all')
    }
  }
});
  
function getArticleFromURL(articleUrl, articleSelector) {
  $.ajax({url: articleUrl, success: function(data){
    var page = $(data);
    result = [];
    var article = page.find(articleSelector).each(
    function(i) {
        var temp = $(this).clone();
        temp.find("img,script,style,a,noscript").remove();
        result.push(temp.text().trim().replace("\n", " "));
    }
    );


    run(result.join("\n"), function (data) {
      // Send Message to Front End Listener
      
    });
    // console.log("---------------------------------------------\n");
    // console.log(articleUrl);
    // console.log(result.join("\n"));
    // console.log("---------------------------------------------\n");
  }});
}

function getArticles(pageUrl, pageSelector, articleSelector){
  $.ajax({url: pageUrl, success: function(data){
    var page = $(data);
    var urlsInSelector = page.find(pageSelector + " a");
    let slashIndex = pageUrl.indexOf("/", 8);
    let host = slashIndex == -1 ? pageUrl : pageUrl.substr(0, slashIndex);
    let urlsArray = Array.from(urlsInSelector, url => host + $(url).prop("pathname"));
    let urlsSet = new Set(urlsArray);
    console.log(urlsSet);
    urlsSet.forEach(
        url => {
          getArticleFromURL(url, articleSelector);
        }
    );
  }});
}


'use strict';
// var FormData = require('form-data');
// let request = require('request');
// let https = require ('https');

// **********************************************
// *** Update or verify the following values. ***
// **********************************************

// Replace the accessKey string value with your valid access key.
let azure_accessKey = '6495a8dfb8254821a1f9ab9ebef536c9';
let deepai_accessKey = 'a68ee914-c771-44d5-9d89-731ebe21b53f';

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

let response_handler_azure = function (response, callback_fn) {
    let body = '';
    response.on ('data', function (d) {
        body += d;
    });
    response.on ('end', function () {
        let body_ = JSON.parse (body);
        callback_fn(body_['documents'][0]['score']);
    });
    response.on ('error', function (e) {
        console.log ('Error: ' + e.message);
    });
};

let response_handler_deepai = function (err, httpResponse, body, callback_fn) {
    if (err) {
        console.error('request failed:', err);
        return;
    }
    var response = JSON.parse(body);
    callback_fn(response['output']);
};

// Not using DeepAI Sentiment Analysis because it only returns {Positive, Neutral, Negative} 
// and does it for every sentence, not the entire passage.
let get_summary = function (articles, callback_fn) {
    // request.post({
    //     url: deepai_uri + deepai_summary_path,
    //     headers: {
    //         'Api-Key': deepai_accessKey
    //     },
    //     formData: {
    //         'text': articles
    //     }
    // }, (error, response, body) => response_handler_deepai(error, response, body, callback_fn))
    var fd = new FormData();
    fd.append('text', article)
    var myInit = {method: 'POST', headers: {'Api-Key': deepai_accessKey}, body: fd};
    var myRequest = new Request("https://api.deepai.org/api/summarization", myInit)
    fetch(myRequest).then(function(response) {
      const reader = response.body.getReader();
      reader.read().then(function processText({ done, value }) {
        var str = new TextDecoder("utf-8").decode(value);
        var json = JSON.parse(str);
        if (done) {
          // callback
          return;
        }
      })
    })    
  };

let get_sentiments = function (articles, callback_fn) {
    let body = JSON.stringify (articles);

    let request_params = {
        method : 'POST',
        hostname : azure_uri,
        path : azure_sentiment_path,
        headers : {
            'Ocp-Apim-Subscription-Key' : azure_accessKey,
        }
    };

    let req = https.request (request_params, (res) => response_handler_azure(res, callback_fn));
    req.write(body);
    req.end();
};


let run = function(passage, callback_fn) {
    let doc = {'documents': [
        {'id': '1', 'language': 'en', 'text': passage}
    ]};

    // get_sentiments (doc, callback_fn);
    get_summary (passage, callback_fn);
};


// Example
let article = 'An African Methodist pastor, dressed in a dark suit and white clerical collar, greeted a Conservative rabbi, wearing a black overcoat and matching fedora, in the lobby of a downtown hotel on Friday morning. They spread their arms wide and embraced at length, the rabbi patting the pastor rhythmically on the back as the pastor drew him close. Words were not necessary.The two men had never met, but for a week they have been bound by the unspeakable grief of two unconscionable desecrations. The pastor was the Rev. Eric S.C. Manning, who leads Emanuel African Methodist Episcopal Church in Charleston, S.C., where nine parishioners were  in a racist attack during a Wednesday night Bible study on June 17, 2015. The rabbi was Jeffrey Myers of the Tree of Life congregation in Pittsburgh’s Squirrel Hill neighborhood, where 11 worshipers were gunned down during shabbat services last Saturday.When a virulent anti-Semite walked through unlocked doors into a house of God that morning and opened fire on believers in prayer, the analogies to the massacre at Emanuel A.M.E. became inescapable. Here within 40 months were two ruthlessly murderous attacks in the most sacred of spaces, victimizing minority communities — one racial, one religious — that share a centuries-long struggle against bigotry and persecution.In both instances, the gunmen left a cache of hate-filled online commentary and eagerly volunteered their motives.'
// run(article, console.log);
