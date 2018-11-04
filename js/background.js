
document.addEventListener("DOMContentLoaded", function(event) {
  var newsUpdateTimer = setInterval(fetchNews, 1 * 10 * 1000);

  function fetchNews() {

    if (jQuery) {
      //getArticle("https://www.cnn.com/2018/11/03/politics/donald-trump-mike-lindell-mypillow-midterms/index.html", ".zn-body__read-all");
      //getArticle("https://lihkg.com/thread/877010/page/1", "div[data-ast-root='true']");
      // getArticles('https://www.cnn.com/us', '.cd__content', '.zn-body__read-all');

      chrome.storage.local.get(['newsSetting'], function(result) {
        console.log(JSON.stringify(result['newsSetting'][0]));
        if (result['newsSetting'] !== undefined)
          res = result['newsSetting'][0];
          getArticles(res.url, res.linkcss, res.contentcss);
      });
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

    console.log("---------------------------------------------\n");
    console.log(articleUrl);
    console.log(result.join("\n"));
    console.log("---------------------------------------------\n");
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
