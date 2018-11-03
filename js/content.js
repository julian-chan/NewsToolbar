//logging
// var firstHref = $("a[href^='http']").eq(0).attr("href");
// console.log("[content.js] logging: " + firstHref);

// create toolbar element

function $(id) { return document.getElementById(id); }

var height;

var skipPositionedChild = function( node, style ) {
    if ( this.offsetParent &&
         this.offsetParent.tagName !== 'BODY') return true;
    if ( hasPositionedParent(node) ) return true;
    return false;
};

var hasPositionedParent = function( node ){
    if ( node.tagName === 'BODY') return false;
    var parent = node.parentNode;
    var position = getComputedStyle(parent).position;
    if (position !== 'static') {
      return true;
    }
    return hasPositionedParent( parent );
};

function removetoolbar(){
  console.log("removing");

	var checkb = $('newstoolbar');
	if(checkb){
		document.documentElement.removeChild(checkb);

			var a = document.querySelectorAll('[data-financetoolbar]');

			var a = document.body.getElementsByTagName("*");
			for (var i = 0, len = a.length; i < len; i++) {
					if(a[i].hasAttribute("data-sfttop")){
						a[i].style.top = a[i].getAttribute("data-sfttop");
					}
					if(a[i].hasAttribute("data-sftbottom")){
						a[i].style.bottom = a[i].getAttribute("data-sftbottom");
					}
					if(a[i].hasAttribute("data-sftheight")){
						a[i].style.height = a[i].getAttribute("data-sftheight");
					}
					a[i].setAttribute("data-financetoolbar",false);
			}

	}

	var checkc = $('stefanvdfinanceblocksmall');
	if(checkc){
		document.body.removeChild(checkc);
	}

	var checkd = $('stefanvdfinanceblocklarge');
	if(checkd){
		document.body.removeChild(checkd);
	}

}

function addtoolbar(){
  console.log('addtoolbar\n');
  var getpositiontop = true; // not sure where it is sett

		var checka = $('newstoolbar');
		if (!checka) {
	    var height = '30px';

      // move everything in page down 30px
			var Children = document.body.getElementsByTagName("*");
			for (var i = 0, len = Children.length; i < len; i++) {

				if(Children[i].currentStyle){
					var x = Children[i].currentStyle["position"];
					var y = Children[i].currentStyle["top"];
					var z = Children[i].currentStyle["bottom"];
					var q = Children[i].currentStyle["height"];
				}
				else if(window.getComputedStyle){
					var st = document.defaultView.getComputedStyle(Children[i], null);
					var x = st.getPropertyValue("position");
					var y = st.getPropertyValue("top");
					var z = st.getPropertyValue("bottom");
					var q = st.getPropertyValue("height");
				}

				if(getpositiontop == true){
					if((x == "absolute" || x == "fixed") && y !== 'auto'){
							if(y == "0px"){
								Children[i].setAttribute("data-financetoolbar",true);
								Children[i].setAttribute("data-sfttop",Children[i].style.top);
								Children[i].style.top = parseInt(y, 10) + parseInt(height, 10) + "px";
								// if "top" and "bottom" is 0 => then calc height
								if(q != "auto" && (y=="0px" && z=="0px")){
									Children[i].setAttribute("data-sftheight",q);
									Children[i].style.height = "calc(100% - " + height + ")";
								}
							}
						}
				} else {
					if((x == "absolute" || x == "fixed") && z !== 'auto'){
						if(z == "0px"){
								Children[i].setAttribute("data-financetoolbar",true);
								Children[i].setAttribute("data-sftbottom",Children[i].style.bottom);
								Children[i].style.bottom = parseInt(z, 10) + parseInt(height, 10) + "px";
								// if "top" and "bottom" is 0 => then calc height
								if(q != "auto" && (y=="0px" && z=="0px")){
									Children[i].setAttribute("data-sftheight",q);
									Children[i].style.height = "calc(100% - " + height + ")";
								}
						}
					}
				}

			}

      // create the toolbar div
			var div = document.createElement("div");
			// div.setAttribute("src", "toolbar.html");
			div.setAttribute('id', "newstoolbar");
			div.setAttribute('allowtransparency', "true");
			div.setAttribute('width','100%');
			div.style.height = "30px";
      div.style.backgroundColor = "black";
			div.style.border = "none";
			div.style.position = "fixed";
			if(getpositiontop == true){
				div.style.top = "0px";
			}else{
				div.style.bottom = "0px";
			}
			div.style.left = "0px";
			div.style.marginBottom = "0px";
			div.style.marginLeft = "0px";
			div.style.zIndex = 2147483647;
			div.style.width  = '100%';
			div.style.boxSizing = "border-box";
			if (dropshadow == true) {
				if (getpositiontop == true) {
					div.style.boxShadow = "0px 2px 10px rgba(0,0,0,.2)";
				} else{
					div.style.boxShadow = "0px -2px 10px rgba(0,0,0,.2)";
				}
			}

      // create hide button
      var btn = document.createElement("button");
      var t = document.createTextNode("hide");
      btn.setAttribute('id', "hideBtn");
      btn.style.backgroundColor = "transparent";
      btn.style.color = "white";
      btn.style.border = "none";
      btn.style.float = "right";
      btn.appendChild(t);
      div.appendChild(btn);

			document.documentElement.appendChild(div);
		}
}

var addbar = null; var dropshadow = null; var allsites = null; var toolbaronly = null; var toolbarDomains = null;var getpositiontop = null; var getpositionbottom = null; var toolbarwhite = null; toolbarblack = null;

addtoolbar();
$("hideBtn").click(() => removetoolbar());

/** listen and get request to remove toolbar **/

// chrome.runtime.onMessage.addListener(function(request, sender, sendMessage) {
//     if (request.action == "addremove") {
//         chrome.storage.sync.get(['addbar','dropshadow','toolbarDomains','allsites','toolbaronly','getpositiontop','getpositionbottom','toolbarwhite','toolbarblack'], function(items) {
//           addbar = items['addbar'];
//           dropshadow = items['dropshadow'];if(dropshadow == null)dropshadow = true;
//           allsites = items['allsites'];if(allsites == null)allsites = true;
//           toolbaronly = items['toolbaronly'];if(toolbaronly == null)toolbaronly = false;
//           toolbarDomains = items['toolbarDomains'];
//           getpositiontop = items['getpositiontop'];if(getpositiontop == null)getpositiontop = true;
//           getpositionbottom = items['getpositionbottom'];if(getpositionbottom == null)getpositionbottom = false;
//           toolbarwhite = items['toolbarwhite'];if(toolbarwhite == null)toolbarwhite = true;
//           toolbarblack = items['toolbarblack'];if(toolbarblack == null)toolbarblack = false;
//
//           if(addbar == true){
//           	if(toolbaronly == true){
//           	var currenturl = window.location.protocol + '//' + window.location.host;
//           	var blackrabbit = false;
//           	if(typeof toolbarDomains == "string") {
//           		toolbarDomains = JSON.parse(toolbarDomains);
//           		var abuf = [];
//           		for(var domain in toolbarDomains)
//           			abuf.push(domain);
//           			abuf.sort();
//           			for(var i = 0; i < abuf.length; i++){
//           				if(toolbarwhite == true){
//           					if(currenturl == abuf[i]){
//           						// prevent opening in the popup window
//           						if (window.opener && window.opener !== window) {
//           							// you are in a popup
//           						} else {
//           							addtoolbar();
//           						}
//           					}else{
//           						removetoolbar();
//           					}
//           				}
//           				else if(toolbarblack == true){
//           					if(currenturl == abuf[i]){blackrabbit=true;}
//           				}
//           			}
//           		}
//           		if(toolbarblack == true){
//           			if(blackrabbit == false){
//           				// prevent opening in the popup window
//           				if (window.opener && window.opener !== window) {
//           					// you are in a popup
//           				} else {
//           					addtoolbar();
//           				}
//           				blackrabbit = false;
//           			}else{
//           				removetoolbar();
//           			}
//           		}
//           	}else{
//           		// prevent opening in the popup window
//           		if (window.opener && window.opener !== window) {
//           			// you are in a popup
//           		} else {
//           			addtoolbar();
//           		}
//           	}
//           }else{
//           	removetoolbar();
//           }
//           });
//
//     } else if (request.action == "toolbarrefresh") {
//     	removetoolbar();
//     	addtoolbar();
//         //window.location.reload();
//     }
// });
