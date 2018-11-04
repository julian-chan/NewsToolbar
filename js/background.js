

var defaultNews = {
  'cnn': {
    url: "https://www.cnn.com/us",
    linkcss: ".cd_content",
    contentcss: ".zn-body_read-all"
  }
}


document.addEventListener("DOMContentLoaded", function(event) {
  var newsUpdateTimer = setInterval(fetchNews, 1 * 1000000 * 1000);

  function fetchNews() {
    if (jQuery) {
      chrome.storage.local.set({'result': {}}, function() {});
      chrome.storage.local.get(['newsSetting'], function(result) {
        // console.log(JSON.stringify(result['newsSetting'][0]));
        if (result['newsSetting'] !== undefined)
          for (var res in result['newsSetting']) {
            getArticles(res.sname, res.url, res.linkcss, res.contentcss);
          }
      });
    }
  }
});

function getArticleFromURL(host, articleUrl, articleSelector) {
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

    chrome.storage.local.get(['result'], function(data_arr) {
      // Host
      data_arr.result[url] = {'host': host};
      chrome.storage.local.set({'result': data_arr.result});
    })

    run(url, result.join("\n"), function (url, data) {
      // Summary
      chrome.storage.local.get(['result'], function(data_arr) {
        data_arr.result[url]['summary'] = data;
        chrome.storage.local.set({'result': data_arr.result});
      })
    }, function (url, data) {
      // Sentiment
      chrome.storage.local.get(['result'], function(data_arr) {
        data_arr.result[url]['sentiment'] = data;
        chrome.storage.local.set({'result': data_arr.result});
      })
    });
    // console.log("---------------------------------------------\n");
    // console.log(articleUrl);
    // console.log(result.join("\n"));
    // console.log("---------------------------------------------\n");
  }});
}

function getArticles(host, pageUrl, pageSelector, articleSelector) {
  $.ajax({url: pageUrl, success: function(data){
    var page = $(data);
    var urlsInSelector = page.find(pageSelector + " a");
    let slashIndex = pageUrl.indexOf("/", 8);
    let domain = slashIndex == -1 ? pageUrl : pageUrl.substr(0, slashIndex);
    let urlsArray = Array.from(urlsInSelector, url => domain + $(url).prop("pathname"));
    let urlsSet = new Set(urlsArray);
    console.log(urlsSet);
    urlsSet.forEach(
        url => {
          getArticleFromURL(host, url, articleSelector);
        }
    );
  }});
}


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

// Not using DeepAI Sentiment Analysis because it only returns {Positive, Neutral, Negative}
// and does it for every sentence, not the entire passage.
let get_summary = function (url, articles, callback_fn) {
    var fd = new FormData();
    fd.append('text', article)
    var myInit = {method: 'POST', headers: {'Api-Key': deepai_accessKey}, body: fd};
    var myRequest = new Request("https://api.deepai.org/api/summarization", myInit)
    fetch(myRequest).then(function(response) {
        response.json().then(function (data) {
          callback_fn(url, data['output']);
        })
      })
    };

let get_sentiments = function (url, articles, callback_fn) {
    let body = JSON.stringify (articles);
    var myInit = {method: 'POST', headers: {'Ocp-Apim-Subscription-Key' : azure_accessKey, 'content-type': 'application/json'}, body: body};
    var myRequest = new Request("https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment", myInit)
    fetch(myRequest).then(function(response) {
        response.json().then(function (data) {
          callback_fn(url, data.documents[0]['score']);
        })
      })
    };


let run = function(url, passage, summary_callback_fn, sentiment_callback_fn) {
    let doc = {'documents': [
        {'id': '1', 'language': 'en', 'text': passage}
    ]};

    get_sentiments (url, doc, summary_callback_fn);
    get_summary (url, passage, sentiment_callback_fn);
};


// Example
// let article = 'An African Methodist pastor, dressed in a dark suit and white clerical collar, greeted a Conservative rabbi, wearing a black overcoat and matching fedora, in the lobby of a downtown hotel on Friday morning. They spread their arms wide and embraced at length, the rabbi patting the pastor rhythmically on the back as the pastor drew him close. Words were not necessary.The two men had never met, but for a week they have been bound by the unspeakable grief of two unconscionable desecrations. The pastor was the Rev. Eric S.C. Manning, who leads Emanuel African Methodist Episcopal Church in Charleston, S.C., where nine parishioners were  in a racist attack during a Wednesday night Bible study on June 17, 2015. The rabbi was Jeffrey Myers of the Tree of Life congregation in Pittsburgh’s Squirrel Hill neighborhood, where 11 worshipers were gunned down during shabbat services last Saturday.When a virulent anti-Semite walked through unlocked doors into a house of God that morning and opened fire on believers in prayer, the analogies to the massacre at Emanuel A.M.E. became inescapable. Here within 40 months were two ruthlessly murderous attacks in the most sacred of spaces, victimizing minority communities — one racial, one religious — that share a centuries-long struggle against bigotry and persecution.In both instances, the gunmen left a cache of hate-filled online commentary and eagerly volunteered their motives.'
// run("lol", article, console.log, console.log);
