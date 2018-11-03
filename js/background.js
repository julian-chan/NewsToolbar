document.addEventListener("DOMContentLoaded", function(event) {
  var newsUpdateTimer = setInterval(fetchNews, 1 * 10 * 1000);

  function fetchNews() {
      if (jQuery) {
        //getArticle("https://www.cnn.com/2018/11/03/politics/donald-trump-mike-lindell-mypillow-midterms/index.html", ".zn-body__read-all");
        //getArticle("https://lihkg.com/thread/877010/page/1", "div[data-ast-root='true']");
      }
  }
});

function getArticle(articleUrl, articleSelector) {
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
    console.log(result.join("\n"));
  }});
}
