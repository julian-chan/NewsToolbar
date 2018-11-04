
function addCheckBoxes() {
  var default_news = ["CNN", "Fox", "New York Times", "BBC"];
  var wrapper = document.getElementById("form-lstcheck");
  var myHTML = '';

  console.log("in popup.js" + wrapper);

  for(var i=0; i<default_news.length; i++) {
      myHTML += '<div class="form-check"><input class="form-check-input" type="checkbox" value=""id="defaultCheck1"><label class="form-check-label">'
      + default_news[i] + '</label></div>'
  }
  wrapper.innerHTML = myHTML;
}

function addAnother() {
  console.log("click");
}

function submit() {
  console.log('submitted');
  var url = document.getElementById('url').value;
  var linkcss = document.getElementById('linkcss').value;
  var contentcss = document.getElementById('contentcss').value;

  chrome.storage.local.get(['newsSetting'], function(result) {
        console.log('Value currently is ' + JSON.stringify(result));

        var newArr = (result['newsSetting'] == undefined) ? []: result['newsSetting'];
        newArr = [];
        newArr.push({url, linkcss, contentcss});
        console.log('[popup] after ' + JSON.stringify(newArr));
        chrome.storage.local.set({'newsSetting': newArr}, function() {
            console.log('[popup] Value is set to ' + newArr);
        });
  });

  // chrome.runtime.sendMessage({url, linkcss, contentcss}, function(response) {
  //   console.log(JSON.stringify(response));
  // });
}

window.onload = function () {
  document.getElementById("submitBtn").addEventListener("click", submit);

  console.log("in popup.js");
  addCheckBoxes();
};
