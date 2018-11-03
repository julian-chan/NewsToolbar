
function $(id) { return document.getElementById(id); }

alert("hi you're in toolbar.js");
// prevent right click -- do we need this?
// document.addEventListener('contextmenu', event => event.preventDefault());

//--- Begin CSS inject ---
var direction = "left";
var posbegin = "+100%";
var posend = "-100%";
if (direction == "left"){
  posbegin = "+100%";
  posend = "-100%";
} else {
  posbegin = "-100%";
  posend = "+100%";
}
var timecredit = 35;

var beginbeh = "normal";
if(marqueebehaviour == "scroll"){beginbeh = "normal"}
else{beginbeh = "alternate"}

if(scrollbar == true){
	if(fillchange == true){
		var fncss = '#stefanvdfinance #stefanvdfinancemarquee .moveeffect,#stefanvdfinancetwo #stefanvdfinancemarqueetwo .moveeffect{animation:marquee '+timecredit+'s linear infinite '+beginbeh+'} #stefanvdfinancemarquee div a,#stefanvdfinancemarqueetwo div a{color: '+textcolor+'!important} #stefanvdfinancefavo .green{background:'+greencolor+'!important} #stefanvdfinancemarquee .green a, #stefanvdfinancemarqueetwo .green a{background:'+greencolor+'!important;border-radius:2px!important;padding:0px 3px!important} #stefanvdfinancefavo .red{background:'+redcolor+'!important} #stefanvdfinance .red,#stefanvdfinancetwo .red{background:'+redcolor+'!important;border-radius:2px!important;padding:0px 3px!important} @keyframes marquee{0%{transform:translateX('+posbegin+')}100%{transform:translateX('+posend+')}}';
	}else{
		var fncss = '#stefanvdfinance #stefanvdfinancemarquee .moveeffect,#stefanvdfinancetwo #stefanvdfinancemarqueetwo .moveeffect{animation:marquee '+timecredit+'s linear infinite '+beginbeh+'} #stefanvdfinancemarquee div a,#stefanvdfinancemarqueetwo div a{color: '+textcolor+'!important} #stefanvdfinance .green,#stefanvdfinancetwo .green{color:'+greencolor+'!important} #stefanvdfinancemarquee .green a, #stefanvdfinancemarqueetwo .green a{color:'+greencolor+'!important} #stefanvdfinancemarquee .red a,#stefanvdfinancemarqueetwo .red a{color:'+redcolor+'!important} #stefanvdfinance .red,#stefanvdfinancetwo .red{color:'+redcolor+'!important} @keyframes marquee{0%{transform:translateX('+posbegin+')}100%{transform:translateX('+posend+')}}';
	}
}
else if(simultan == true){
	if(fillchange == true){
		var fncss = '#stefanvdfinancemarquee div a,#stefanvdfinancemarqueetwo div a{color: '+textcolor+'!important} #stefanvdfinancefavo .green{background:'+greencolor+'!important} #stefanvdfinancemarquee .green a, #stefanvdfinancemarqueetwo .green a{background:'+greencolor+'!important;border-radius:2px!important;padding:0px 3px!important} #stefanvdfinancefavo .red{background:'+redcolor+'!important} #stefanvdfinance .red,#stefanvdfinancetwo .red{background:'+redcolor+'!important;border-radius:2px!important;padding:0px 3px!important} @keyframes marquee{0%{transform:translateX('+posbegin+')}100%{transform:translateX('+posend+')}}';
	}else{
		var fncss = '#stefanvdfinancemarquee div a,#stefanvdfinancemarqueetwo div a{color: '+textcolor+'!important} #stefanvdfinance .green,#stefanvdfinancetwo .green{color:'+greencolor+'!important} #stefanvdfinancemarquee .green a, #stefanvdfinancemarqueetwo .green a{color:'+greencolor+'!important} #stefanvdfinancemarquee .red a,#stefanvdfinancemarqueetwo .red a{color:'+redcolor+'!important} #stefanvdfinance .red,#stefanvdfinancetwo .red{color:'+redcolor+'!important}';
	}
}
else if(staticbar == true){
	if(fillchange == true){
		var fncss = '#stefanvdfinance #stefanvdfinancemarquee .moveeffect,#stefanvdfinancetwo #stefanvdfinancemarqueetwo .moveeffect{overflow-x:hidden!important;width:100%!important;display:flex!important} #stefanvdfinance #stefanvdfinancemarquee .moveeffect:hover,#stefanvdfinancetwo #stefanvdfinancemarqueetwo .moveeffect:hover{overflow-x:scroll!important;width:100%!important} #stefanvdfinancemarquee div a,#stefanvdfinancemarqueetwo div a{color: '+textcolor+'!important} #stefanvdfinancefavo .green{background:'+greencolor+'!important} #stefanvdfinancemarquee .green a, #stefanvdfinancemarqueetwo .green a{background:'+greencolor+'!important;border-radius:2px!important;padding:0px 3px!important} #stefanvdfinancefavo .red{background:'+redcolor+'!important} #stefanvdfinancemarquee .red a,#stefanvdfinancemarqueetwo .red a{background:'+redcolor+'!important;border-radius:2px!important;padding:0px 3px!important}}}';
	}else{
		var fncss = '#stefanvdfinance #stefanvdfinancemarquee .moveeffect,#stefanvdfinancetwo #stefanvdfinancemarqueetwo .moveeffect{overflow-x:hidden!important;width:100%!important;display:flex!important} #stefanvdfinance #stefanvdfinancemarquee .moveeffect:hover,#stefanvdfinancetwo #stefanvdfinancemarqueetwo .moveeffect:hover{overflow-x:scroll!important;width:100%!important} #stefanvdfinancemarquee div a,#stefanvdfinancemarqueetwo div a{color: '+textcolor+'!important} #stefanvdfinance .green,#stefanvdfinancetwo .green{color:'+greencolor+'!important} #stefanvdfinancemarquee .green a, #stefanvdfinancemarqueetwo .green a{color:'+greencolor+'!important} #stefanvdfinance .red, #stefanvdfinancetwo .red{color:'+redcolor+'!important} #stefanvdfinancemarquee .red a,#stefanvdfinancemarqueetwo .red a{color:'+redcolor+'!important}}}';
	}
}

if($("fnstyle")){
$("fnstyle").innerText = fncss;
}else{
var style = document.createElement('style');
style.type = 'text/css';
style.setAttribute('id','fnstyle');
style.innerText = fncss;
document.body.appendChild(style);
}
//--- End CSS inject ---

var element = "change";
var ask = "latestPrice";
if(getinfovaluestock == true){element = "change";}
else if(getinfovaluepercent == true){element = "changePercent";}
else if(getinfovaluemc == true){element = "marketCap";}
else if(getfullvaluedata == true){element = "getfullvaluedata";}

// create marquee
	    var newframe = document.createElement("div");
	    newframe.setAttribute('id','stefanvdfinance');
		newframe.style.background = lightcolor;
		document.body.insertBefore(newframe, document.body.firstChild);

		if(hideworldmap == true){}else{
			var newworld = document.createElement("div");
			newworld.setAttribute('class','stefanvdfinanceworld');
			newworld.style.color = worldmapcolor;
			newworld.style.opacity = worldmapopacity/100;
			newworld.textContent = "";
			newworld.addEventListener("click", function() { document.getElementById("audioplayer").play(); });
			newframe.appendChild(newworld);

			var newsoundframe = document.createElement("span");
			newsoundframe.setAttribute('id','stefanvdfinancesound');
			newworld.appendChild(newsoundframe);

			var stefanvdfinancesound = document.getElementById("stefanvdfinancesound");
			var audioelement = document.createElement('audio');
			audioelement.setAttribute('id','audioplayer');
			audioelement.setAttribute('src','wallstreetbell.mp3');
			audioelement.setAttribute('hidden','true');
			stefanvdfinancesound.appendChild(audioelement);
		}

		if(favoritestock == true){
		var newstockfavo = document.createElement("div");
		newstockfavo.setAttribute('id','stefanvdfinancefavo');
		newframe.appendChild(newstockfavo);

		if(hideworldmap == true){
		}else{
			newstockfavo.style.marginLeft = "70px";
		}

		var newstockfavo1text = document.createElement('div');
		newstockfavo1text.style.display = "inline-block";
		//newstockfavo1text.style.width = "120px";
		newstockfavo1text.style.verticalAlign = "top";
		newstockfavo1text.style.marginTop = "1px";
		newstockfavo1text.textContent = favo1+favo1b;
		newstockfavo1text.addEventListener("click", function(){
			window.open(thesearchurl + favo1+favo1b + '','_blank');
		});
		newstockfavo.appendChild(newstockfavo1text);
		var newstockfavo1img = document.createElement('div');
		newstockfavo1img.setAttribute('id','currency'+favo1+favo1b);
		newstockfavo1img.addEventListener("click", function(){
			window.open(thesearchurl + favo1+favo1b + '','_blank');
		});
		newstockfavo1img.style.display = "inline-block";
		newstockfavo1img.style.marginLeft = "4px";
		newstockfavo1img.textContent = "";
		newstockfavo1text.appendChild(newstockfavo1img);
		var newstockfavo1diff = document.createElement('div');
		newstockfavo1diff.setAttribute('id','diff'+favo1+favo1b);
		newstockfavo1diff.style.display = "inline-block";
		newstockfavo1diff.style.marginLeft = "4px";
		newstockfavo1text.appendChild(newstockfavo1diff);
		currencyupdaterequest(favo1,favo1b);

		window.setInterval( function() {
			currencyupdaterequest(favo1,favo1b);
		}, xminutes * 1000 );

		var newstockfavo2text = document.createElement('div');
		newstockfavo2text.style.display = "inline-block";
		//newstockfavo2text.style.width = "120px";
		newstockfavo2text.style.marginLeft = "4px";
		newstockfavo2text.style.verticalAlign = "top";
		newstockfavo2text.style.marginTop = "1px";
		newstockfavo2text.textContent = favo2+favo2b;
		newstockfavo2text.addEventListener("click", function(){
			window.open(thesearchurl + favo2+favo2b + '','_blank');
		});
		newstockfavo.appendChild(newstockfavo2text);
		var newstockfavo2img = document.createElement('div');
		newstockfavo2img.setAttribute('id','currency'+favo2+favo2b);
		newstockfavo2img.addEventListener("click", function(){
			window.open(thesearchurl + favo2+favo2b + '','_blank');
		});
		newstockfavo2img.style.display = "inline-block";
		newstockfavo2img.style.marginLeft = "4px";
		newstockfavo2img.textContent = "";
		newstockfavo2text.appendChild(newstockfavo2img);
		var newstockfavo2diff = document.createElement('div');
		newstockfavo2diff.setAttribute('id','diff'+favo2+favo2b);
		newstockfavo2diff.style.display = "inline-block";
		newstockfavo2diff.style.marginLeft = "4px";
		newstockfavo2text.appendChild(newstockfavo2diff);
		currencyupdaterequest(favo2,favo2b);

		window.setInterval( function() {
			currencyupdaterequest(favo2,favo2b);
		}, xminutes * 1000 );

		var newstockfavo3text = document.createElement('div');
		newstockfavo3text.style.display = "inline-block";
		//newstockfavo3text.style.width = "120px";
		newstockfavo3text.style.verticalAlign = "top";
		newstockfavo3text.style.marginTop = "1px";
		newstockfavo3text.textContent = favo3+favo3b;
		newstockfavo3text.addEventListener("click", function(){
			window.open(thesearchurl + favo3+favo3b + '','_blank');
		});
		newstockfavo.appendChild(newstockfavo3text);
		var newstockfavo3img = document.createElement('div');
		newstockfavo3img.setAttribute('id','currency'+favo3+favo3b);
		newstockfavo3img.addEventListener("click", function(){
			window.open(thesearchurl + favo3+favo3b + '','_blank');
		});
		newstockfavo3img.style.display = "inline-block";
		newstockfavo3img.style.marginLeft = "4px";
		newstockfavo3img.textContent = "";
		newstockfavo3text.appendChild(newstockfavo3img);
		var newstockfavo3diff = document.createElement('div');
		newstockfavo3diff.setAttribute('id','diff'+favo3+favo3b);
		newstockfavo3diff.style.display = "inline-block";
		newstockfavo3diff.style.marginLeft = "4px";
		newstockfavo3text.appendChild(newstockfavo3diff);
		currencyupdaterequest(favo3,favo3b);

		window.setInterval( function() {
			currencyupdaterequest(favo3,favo3b);
		}, xminutes * 1000 );

		var newstockfavo4text = document.createElement('div');
		newstockfavo4text.style.display = "inline-block";
		//newstockfavo4text.style.width = "120px";
		newstockfavo4text.style.marginLeft = "4px";
		newstockfavo4text.style.verticalAlign = "top";
		newstockfavo4text.style.marginTop = "1px";
		newstockfavo4text.textContent = favo4+favo4b;
		newstockfavo4text.addEventListener("click", function(){
			window.open(thesearchurl + favo4+favo4b + '','_blank');
		});
		newstockfavo.appendChild(newstockfavo4text);
		var newstockfavo4img = document.createElement('div');
		newstockfavo4img.setAttribute('id','currency'+favo4+favo4b);
		newstockfavo4img.addEventListener("click", function(){
			window.open(thesearchurl + favo4+favo4b + '','_blank');
		});
		newstockfavo4img.style.display = "inline-block";
		newstockfavo4img.style.marginLeft = "4px";
		newstockfavo4img.textContent = "";
		newstockfavo4text.appendChild(newstockfavo4img);
		var newstockfavo4diff = document.createElement('div');
		newstockfavo4diff.setAttribute('id','diff'+favo4+favo4b);
		newstockfavo4diff.style.display = "inline-block";
		newstockfavo4diff.style.marginLeft = "4px";
		newstockfavo4text.appendChild(newstockfavo4diff);
		currencyupdaterequest(favo4,favo4b);

		window.setInterval( function() {
			currencyupdaterequest(favo4,favo4b);
		}, xminutes * 1000 );

		}

		function currencyupdaterequest(favo,favob){
			var z = favo;
			var x = favob;

			chrome.runtime.sendMessage({name: "currvalue", currencyparta: z, currencypartb: x}, function(response) {
			var stockopen = response.thatcurr;
			var diffvalue = response.thatcurrchange;

			var linkfdif = document.getElementById("diff"+z+x);
			if(linkfdif) {
				linkfdif.textContent = diffvalue;
			}

			if(japan == true){
			// give color span
			// red
			if(diffvalue.substring(0, 1) == '-') { document.getElementById("diff"+z+x+"").className = "green"; }
			// green
			else if(diffvalue.substring(0, 1) == '+') { document.getElementById("diff"+z+x+"").className = "red"; }
			// white
			else {
				document.getElementById("diff"+z+x+"").className = "red";
			}
			}
			else {
			// give color span
			// red
			if(diffvalue.substring(0, 1) == '-') { document.getElementById("diff"+z+x+"").className = "red"; }
			// green
			else if(diffvalue.substring(0, 1) == '+') { document.getElementById("diff"+z+x+"").className = "green"; }
			// white
			else {
				document.getElementById("diff"+z+x+"").className = "green";
			}
			}

			var linkfva = document.getElementById("currency"+z+x);
			if(linkfva) {
				linkfva.textContent = stockopen;
			}

			});
		}

	    var newspeedleft = document.createElement("div");
	    newspeedleft.setAttribute('class','arrowleft');
		if(favoritestock == true){
			if(hideworldmap == true){
				newspeedleft.style.left = "240px";
			}else{
				newspeedleft.style.left = "310px";
			}
		} else {
			if(hideworldmap == true){
				newspeedleft.style.left = "0px";
			}else{
				newspeedleft.style.left = "75px";
			}
		}
		newspeedleft.textContent = "<";
		newspeedleft.addEventListener("mousedown", function() {});
		newspeedleft.addEventListener("mouseup", function() {});
		newframe.appendChild(newspeedleft);

		var newbar = document.createElement("div");
	    newbar.setAttribute('class', "bar");
		if(favoritestock == true){
			if(hideworldmap == true){
				newbar.style.left = "260px";
			}else{
				newbar.style.left = "332px";
			}
		} else{
			if(hideworldmap == true){
				newbar.style.left = "20px";
			}else{
				newbar.style.left = "96px";
			}
		}
		newframe.appendChild(newbar);

		var newmaqinframe = document.createElement("div");
		newmaqinframe.setAttribute('id', "stefanvdfinancemarquee");
		newmaqinframe.style.fontFamily = getfontfamily;
	    newmaqinframe.style.fontSize = getfontsize + "px";
		newmaqinframe.addEventListener("mouseover", function() {}, false);
		newmaqinframe.addEventListener("mouseout", function() {}, false);
		newbar.appendChild(newmaqinframe);

	    var newfinframe = document.createElement("div");
		newfinframe.setAttribute('class', "moveeffect");
	   	newmaqinframe.appendChild(newfinframe);

		if(simultan == true){
		   // bar animation move
		   var pos = -100;
		   var id = window.setInterval(frame, 1000);
		   var coord;
		   // window.clearInterval(id);
		   function frame() {
					var d = new Date();
					var s = d.getSeconds() + Math.floor(d.getMilliseconds() / 1000);

					if(s > 200){
						s = 0;
						pos = 0;
						newfinframe.style.transform = "translateX(" + 0 + "%)";
					}else{
						pos = parseFloat(s * 3.4);
						coord = pos - 100;
						newfinframe.style.transform = "translateX(" + coord + "%)";
					}
		   }
		}

	    var newspeedright = document.createElement("div");
	    newspeedright.setAttribute('class','arrowright');
	    newspeedright.style.right = "0px";
		newspeedright.textContent = ">";
		newspeedright.addEventListener("mousedown", function() {}, false);
		newspeedright.addEventListener("mouseup", function() {}, false);
		newframe.appendChild(newspeedright);

		var newfinitembox;
		var newfinitem;
		var newfinitemask;

if(typeof excludedstock == "string") {
	excludedstock = JSON.parse(excludedstock);
	var buf = [];
	for(var domain in excludedstock)
		buf.push(domain);
	for(var i = 0; i < buf.length; i++) {
		// check if not ^
		var str = buf[i]; var nameoutput;
		if (str.indexOf("^")){ nameoutput = str.replace("^","%5E"); }
		else { nameoutput = buf[i]; }

		// box
		    newfinitembox = document.createElement("div");
			newfinitembox.style.fontFamily = getfontfamily;
			newfinitembox.style.fontSize = getfontsize + "px";
			newfinitembox.style.display = "flex";
			newfinitembox.style.alignItems = "center";
			newfinitembox.style.height = "30px";
			newfinitembox.style.float = "left";

			newfinframe.appendChild(newfinitembox);
			var newfinitemboxa = document.createElement('a');
			newfinitemboxa.setAttribute('href',thesearchurl + nameoutput + '');
			newfinitemboxa.setAttribute('target','_blank');
			newfinitemboxa.style.fontFamily = getfontfamily;
			newfinitemboxa.style.fontSize = getfontsize + "px";
			newfinitembox.appendChild(newfinitemboxa);
				var newfinitemboxatext = document.createTextNode(nameoutput);
				newfinitemboxa.setAttribute('class','stockname');
				newfinitemboxa.appendChild(newfinitemboxatext);
		// span
		    newfinitemask = document.createElement("span");
			newfinitemask.style.fontFamily = getfontfamily;
			newfinitemask.style.fontSize = getfontsize + "px";
			newfinitemask.setAttribute('id',nameoutput + ask);
			newfinitembox.appendChild(newfinitemask);
		// span
		    newfinitem = document.createElement("span");
			newfinitem.style.fontFamily = getfontfamily;
			newfinitem.style.fontSize = getfontsize + "px";
			newfinitem.setAttribute('id',nameoutput + element);
			newfinitembox.appendChild(newfinitem);

			getinformation(nameoutput, element, ask); // refresh now
			setRefresh(nameoutput, element, ask, i);
	}
}

function setRefresh(nameoutput, element, ask, itempart) {
	window.setInterval( function() {
	getinformation(nameoutput, element, ask);
	}, 1 * xminutes * 1000);
}

function getinformation(company, element, ask){
var a = company;
var b = element;
var c = ask;

var atext = "";
var ctext = "";
//---
	chrome.runtime.sendMessage({name: "barvalue", type:"oldprice", stock: a}, function(response) {
		if(undefined == response){}else{
		var stockclose = response.thatask;
		var oldstockclose = response.thatoldprice;
		var marketcap = response.thatmarketcap;
//---
		ctext = stockclose;
		ctext = parseFloat(Math.round(ctext * 100) / 100).toFixed(2); // 2 numbers after the comma
		var tempac = document.getElementById(""+a+c+"");
		var linkc = document.getElementById("Alink" + a);
		if(linkc) { linkc.textContent = ctext; } else {
		var tempaclink = document.createElement('a');
		tempaclink.setAttribute('id','Alink' + a);
		tempaclink.style.fontFamily = getfontfamily;
		tempaclink.style.fontSize = getfontsize + "px";
		tempaclink.setAttribute('href',thesearchurl + a + '');
		tempaclink.setAttribute('target','_blank');
		tempac.appendChild(tempaclink);
			var tempaclinktext = document.createTextNode(ctext);
			tempaclink.appendChild(tempaclinktext);
		}

		var stockchange = stockclose - oldstockclose;

		//-- correct format
		if(element == "change"){
			atext = stockchange;
			atext = parseFloat(Math.round(atext * 100) / 100).toFixed(2); // 2 numbers after the comma

			// if no negative value, add the plus character
			if(atext.substring(0, 1) == '-') {}
			else if(atext.substring(0, 1) == '-') {}
			else{ atext = "+"+atext; }
		}
		else if(element == "changePercent"){
			atext = (stockchange/oldstockclose)*100;
			atext = parseFloat(Math.round(atext * 100) / 100).toFixed(2); // 2 numbers after the comma
			atext = atext +"%";

			// if no negative value, add the plus character
			if(atext.substring(0, 1) == '-') {}
			else if(atext.substring(0, 1) == '-') {}
			else{ atext = "+"+atext; }
		}
		else if(element == "getfullvaluedata"){
			atextparta = stockchange;
			atextparta = parseFloat(Math.round(atextparta * 100) / 100).toFixed(2); // 2 numbers after the comma

			// if no negative value, add the plus character
			if(atextparta.substring(0, 1) == '-') {}
			else if(atextparta.substring(0, 1) == '-') {}
			else{ atextparta = "+"+atextparta; }

			atextpartb = (stockchange/oldstockclose)*100;
			atextpartb = parseFloat(Math.round(atextpartb * 100) / 100).toFixed(2); // 2 numbers after the comma
			atextpartb = atextpartb +"%";

			// if no negative value, add the plus character
			if(atextpartb.substring(0, 1) == '-') {}
			else if(atextpartb.substring(0, 1) == '-') {}
			else{ atextpartb = "+"+atextpartb; }
			atextpartb = "("+atextpartb+")";

			atext = atextparta + " " + atextpartb;
		}
		else if(element == "marketCap"){
			try {
				var marketcapvalue = marketcap;
				atext = marketcapvalue;
				atext = parseFloat(Math.round(atext) / 1000000000).toFixed(2); // 2 numbers after the comma
				atext = atext +"B";
			}
			catch(e){
				atext = "";
			}
			//create item in the toolbar
			var tempab = document.getElementById(""+a+b+"");
			var linkb = document.getElementById("Blink" + a);
			if(linkb) { linkb.textContent = atext; } else {
				var tempablink = document.createElement('a');
				tempablink.setAttribute('id','Blink' + a);
				tempablink.style.fontFamily = getfontfamily;
				tempablink.style.fontSize = getfontsize + "px";
				tempablink.setAttribute('href',thesearchurl + a + '');
				tempablink.setAttribute('target','_blank');
				tempab.appendChild(tempablink);
					var tempablinktext = document.createTextNode(atext);
					tempablink.appendChild(tempablinktext);
			}
		}
		//---

			var tempab = document.getElementById(""+a+b+"");
			var linkb = document.getElementById("Blink" + a);
			if(linkb) { linkb.textContent = atext; } else {
				var tempablink = document.createElement('a');
				tempablink.setAttribute('id','Blink' + a);
				tempablink.style.fontFamily = getfontfamily;
				tempablink.style.fontSize = getfontsize + "px";
				tempablink.setAttribute('href',thesearchurl + a + '');
				tempablink.setAttribute('target','_blank');
				tempab.appendChild(tempablink);
					var tempablinktext = document.createTextNode(atext);
					tempablink.appendChild(tempablinktext);
			}


		if(japan == true){
		// give color span
		// red
		if(atext.substring(0, 1) == '-') { document.getElementById(""+a+b+"").className = "green"; }
		// green
		else if(atext.substring(0, 1) == '+') { document.getElementById(""+a+b+"").className = "red"; }
		// white
		else {
			document.getElementById(""+a+b+"").className = "red";
		}
		}
		else {
		// give color span
		// red
		if(atext.substring(0, 1) == '-') { document.getElementById(""+a+b+"").className = "red"; }
		// green
		else if(atext.substring(0, 1) == '+') { document.getElementById(""+a+b+"").className = "green"; }
		// white
		else {
			document.getElementById(""+a+b+"").className = "green";
		}
		}
	}
	});
}

if(doublebar == true){

	var newframe = document.createElement("div");
	newframe.setAttribute('id','stefanvdfinancetwo');
	newframe.style.background = lightcolor;
	document.body.insertBefore(newframe, document.body.firstChild);


	var newspeedleft = document.createElement("div");
	newspeedleft.setAttribute('class','arrowleft');
	newspeedleft.textContent = "<";
	newspeedleft.addEventListener("mousedown", function() {});
	newspeedleft.addEventListener("mouseup", function() {});
	newframe.appendChild(newspeedleft);

	var newbar = document.createElement("div");
	newbar.setAttribute('class', "bar");
	newbar.style.left = "0px";
	newframe.appendChild(newbar);

	var newmaqinframe = document.createElement("div");
	newmaqinframe.setAttribute('id', "stefanvdfinancemarqueetwo");
	newbar.style.left = "20px";
	newmaqinframe.style.fontFamily = getfontfamily;
	newmaqinframe.style.fontSize = getfontsize + "px";
	newmaqinframe.addEventListener("mouseover", function() {}, false);
	newmaqinframe.addEventListener("mouseout", function() {}, false);
	newbar.appendChild(newmaqinframe);

	var newfinframedouble = document.createElement("div");
	newfinframedouble.setAttribute('class', "moveeffect");
	newmaqinframe.appendChild(newfinframedouble);

	if(simultan == true){
		// bar animation move
		var posdouble = -100;
		var iddouble = window.setInterval(framedouble, 1000);
		var coorddouble;
		// window.clearInterval(iddouble);
		function framedouble() {
				 var dd = new Date();
				 var sd = dd.getSeconds() + Math.floor(dd.getMilliseconds() / 1000);

				 if(sd > 200){
					 sd = 0;
					 posdouble = 0;
					 newfinframedouble.style.transform = "translateX(" + 0 + "%)";
				 }else{
					posdouble = parseFloat(sd * 3.4);
					coorddouble = posdouble - 100;
					newfinframedouble.style.transform = "translateX(" + coorddouble + "%)";
				 }
		}
	}

	var newspeedright = document.createElement("div");
	newspeedright.setAttribute('class','arrowright');
	newspeedright.style.right = "0px";
	newspeedright.textContent = ">";
	newspeedright.addEventListener("mousedown", function() {}, false);
	newspeedright.addEventListener("mouseup", function() {}, false);
	newframe.appendChild(newspeedright);

	var newfinitembox;
	var newfinitem;
	var newfinitemask;

if(typeof excludedstockdouble == "string") {
excludedstockdouble = JSON.parse(excludedstockdouble);
var buf = [];
for(var domain in excludedstockdouble)
	buf.push(domain);
for(var i = 0; i < buf.length; i++) {
	// check if not ^
	var str = buf[i]; var nameoutput;
	if (str.indexOf("^")){ nameoutput = str.replace("^","%5E"); }
	else { nameoutput = buf[i]; }

	// box
		newfinitembox = document.createElement("div");
		newfinitembox.style.fontFamily = getfontfamily;
		newfinitembox.style.fontSize = getfontsize + "px";
		newfinitembox.style.fontSize = getfontsize + "px";
		newfinitembox.style.display = "flex";
		newfinitembox.style.alignItems = "center";
		newfinitembox.style.height = "30px";
		newfinitembox.style.float = "left";
		newfinframedouble.appendChild(newfinitembox);
		var newfinitemboxa = document.createElement('a');
		newfinitemboxa.setAttribute('href',thesearchurl + nameoutput + '');
		newfinitemboxa.setAttribute('target','_blank');
		newfinitemboxa.style.fontFamily = getfontfamily;
		newfinitemboxa.style.fontSize = getfontsize + "px";
		newfinitembox.appendChild(newfinitemboxa);
			var newfinitemboxatext = document.createTextNode(nameoutput);
			newfinitemboxa.appendChild(newfinitemboxatext);
	// span
		newfinitemask = document.createElement("span");
		newfinitemask.style.fontFamily = getfontfamily;
		newfinitemask.style.fontSize = getfontsize + "px";
		newfinitemask.setAttribute('id',nameoutput + ask);
		newfinitembox.appendChild(newfinitemask);
	// span
		newfinitem = document.createElement("span");
		newfinitem.style.fontFamily = getfontfamily;
		newfinitem.style.fontSize = getfontsize + "px";
		newfinitem.setAttribute('id',nameoutput + element);
		newfinitembox.appendChild(newfinitem);
		getinformation(nameoutput, element, ask);
		setRefresh(nameoutput, element, ask);
}
}

}

// change stock name to custom name
if(fullname == true){
	var lines = fullnamearea.split('\n');
	for (var j = 0; j < lines.length; j++) {
		if(lines[j].indexOf("=")){
			var str = lines[j];
			var res = str.split("=");

			var elements = document.querySelectorAll('.stockname');
			for ( var i=elements.length; i--; ) {
				try{
				elements[i].textContent = elements[i].textContent.replace(res[0], res[1]);
				}catch(e){}
			}

		}
	}
}


});
