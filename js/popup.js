
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

window.onload = function () {
  console.log("in popup.js");
  addCheckBoxes();
};
