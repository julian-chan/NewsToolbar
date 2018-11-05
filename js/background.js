// Initialize local file
chrome.storage.local.set({'result': {}});

var defaultNews = {
  'cnn': {
    selected: true,
    sname: "CNN",
    url: "https://www.cnn.com/us",
    linkcss: ".cd__content",
    contentcss: ".zn-body__read-all"
  }
}


document.addEventListener("DOMContentLoaded", function(event) {
  chrome.storage.local.get(['newsSetting'], function(result) {
    var newArr = (result['newsSetting'] == undefined) ? []: result['newsSetting'];
    for(var key in defaultNews) {
      var site = defaultNews[key];
      if(!(newArr.map(i => i.sname).includes(site.sname))) {
        newArr.push({selected: true, sname:site.sname, url:site.url, linkcss:site.linkcss, contentcss:site.contentcss});
        chrome.storage.local.set({'newsSetting': newArr}, function() {
        });
      }
    }
  });

  var newsUpdateTimer = setInterval(fetchNews, 1 * 20 * 1000);

  function fetchNews() {
    if (jQuery) {
      console.log("fetchNews");
      chrome.storage.local.set({'result': {}}, function() {});
      chrome.storage.local.get(['newsSetting'], function(result) {
        // console.log(JSON.stringify(result['newsSetting'][0]));
        if (result['newsSetting'] !== undefined) {
          // console.log(result['newsSetting']);
          var r = result['newsSetting'];
          for (var i = 0; i < r.length; i++) {
            var res = r[i];
            getArticles(res.sname, res.url, res.linkcss, res.contentcss);
          }
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

    run(host, articleUrl, result.join("\n"), function (host, url, summary, sentiment) {
      // Summary
      chrome.storage.local.get(['result'], function(data_arr) {
      })
      chrome.storage.local.get(['result'], function(data_arr) {
        data_arr.result[url] = {};
        data_arr.result[url]['host'] = host;
        data_arr.result[url]['summary'] = summary;
        data_arr.result[url]['sentiment'] = sentiment;
        chrome.storage.local.set({'result': data_arr.result});
      });
    });
    // console.log("---------------------------------------------\n");
    // console.log(articleUrl);
    // console.log(result.join("\n"));
    // console.log("---------------------------------------------\n");
  }})};

function getArticles(host, pageUrl, pageSelector, articleSelector) {
  $.ajax({url: pageUrl, success: function(data){
    var page = $(data);
    var urlsInSelector = page.find(pageSelector + " a");
    let slashIndex = pageUrl.indexOf("/", 8);
    let domain = slashIndex == -1 ? pageUrl : pageUrl.substr(0, slashIndex);
    let urlsArray = Array.from(urlsInSelector, url => domain + $(url).prop("pathname"));
    let urlsSet = new Set(urlsArray);
    console.log(urlsSet);
    var urlsSetArray = Array.from(urlsSet);

    for(var i = 0; i < Math.min(5, urlsSetArray.length); i++) {
      console.log("getArticleFromURL");
      getArticleFromURL(host, urlsSetArray[i], articleSelector);
    }
  }});
}

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
let analyze = function (host, url, articles_summary, articles_sentiment, callback_fn) {
    // Text Summarization
    var output = {};
    var fd = new FormData();
    fd.append('text', articles_summary)
    var myInit = {method: 'POST', headers: {'Api-Key': deepai_accessKey}, body: fd};
    var myRequest = new Request("https://api.deepai.org/api/summarization", myInit)
    fetch(myRequest).then(function(response) {
        response.json().then(function (data) {
          output['summary'] = [url, data['output']];
        })
      });

    // Sentiment Analysis
    let body = JSON.stringify (articles_sentiment);
    myInit = {method: 'POST', headers: {'Ocp-Apim-Subscription-Key' : azure_accessKey, 'content-type': 'application/json'}, body: body};
    myRequest = new Request("https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment", myInit)
    fetch(myRequest).then(function(response) {
        response.json().then(function (data) {
          if (data.documents[0] !== undefined) {
            output['sentiment'] = [url, data.documents[0]['score']];
          } else {
            output['sentiment'] = [url, 1];
          }
          if (!('summary' in output)) {
            output['summary'] = [url, 'No summary available.'];
          }
          callback_fn(host, output['summary'][0], output['summary'][1], output['sentiment'][1]); 
        })
      });
}


let run = function(host, url, passage, callback_fn) {
    let doc = {'documents': [
        {'id': '1', 'language': 'en', 'text': passage}
    ]};

    console.log("Run");

    analyze(host, url, passage, doc, callback_fn);
};