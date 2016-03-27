
function getData() {
	var data = '{"myName": "Yingliang Du", "cityList": ["Chelsea", "Homburg", "San Marcello", "Portofino", "Helmond", "Linz", "Aalbeke", "Ehein", "Burntisland", "Sint-Pauwels", "Kallo", "Cimitile", "Stony Plain", "Neu-Isenburg", "Mission", "Halle", "Wimmertingen", "Savannah", "Osimo", "Merchtem", "Guadalajara", "Kettering", "Herne", "Malartic",	"La Hulpe", "Tilburg", "Caplan", "Houston", "Castelmarte", "Wetteren", "Cincinnati", "Adrano", "Antwerpen", "Rodgau", "Helensburgh", "Elversele", "Glauchau", "Limal", "Capannori", "Vichte", "Sambreville", "Husum", "Banff", "Rueglio", "Juneau", "Sydney", "Asso", "Emmen", "Montleban", "Banchory", "Castellafiume", "Treglio", "Wodonga", "Senftenberg", "Rotem", "Bloomington", "Baden", "Legal", "Pukekohe", "Springdale", "Gosnells", "Guelph", "Deventer", "Latinne", "Wechelderzande", "Trieste", "Cumbernauld", "Altavilla Irpina", "Grande Prairie", "Duns", "Fernie", "Kaiserslauter",		"Castelluccio Superiore", "Dubuisson", "Erli", "Newark", "Thame", "Viernheim", "Isca sullo Ionio", "Hudson Bay", "Bromyard", "Memphis"], "random10Digits": "function() {return Math.floor(Math.random() * 9000000000) + 1000000000}", "uuid": "uuid"}';
  
  var dataJson = JSON.parse(data);

  var myNewTitle = dataJson[document.getElementById('myTextField').value];
//  alert(typeof myNewTitle);
  
  if (typeof myNewTitle === "undefined" || myNewTitle.length == 0) {
    alert('Input a valid key please!');
    return;
  }
//  alert(Math.floor(Math.random() * myNewTitle.length));
  
  var randomData;
  
  // deal with array
  if (myNewTitle instanceof Array) {
//  	alert("It is an array");
		// a random number between 0 and array length
		//int i = Math.floor(Math.random() * myNewTitle.length);
    randomData = myNewTitle[Math.floor(Math.random() * myNewTitle.length)];
//    alert(randomData);
  }
  // deal with function
  else if (myNewTitle.startsWith("function")) {
//    alert("function");
    // invoke function in string
  	eval("var fn = " + myNewTitle);
  	randomData = fn();
  }
  // deal with uuid
  else if (myNewTitle === "uuid") {
  	randomData = generateUUID();
  }
  // deal with string value
  else {
//    alert("String value --> " + myNewTitle);
    randomData = myNewTitle;
  }
  
//  alert(myNewTitle);

  var title = document.getElementById('title');
  title.innerHTML = randomData;
}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}