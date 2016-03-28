
util = require("util");
var data = require('./data_source');
var dateFormat = require('dateformat');

module.exports = function(key) {
  //console.log("Before parsing.", util.inspect(data.random_bind, false, null));

  //var dataJson = JSON.parse(data.test);

  var data_source = getDataSourceForField(key);  //dataJson[key];
//  alert(typeof data_source);
  
  if (typeof data_source === "undefined" || data_source.length == 0) {
    alert('Input a valid key please!');
    return;
  }
//  alert(Math.floor(Math.random() * data_source.length));
  
  var randomData;
  
  // deal with array
  if (data_source instanceof Array) {
//  	alert("It is an array");
		// a random number between 0 and array length
		//int i = Math.floor(Math.random() * data_source.length);
    randomData = data_source[Math.floor(Math.random() * data_source.length)];
//    alert(randomData);
  }
  // deal with function
  else if (data_source.startsWith("function")) {
    console.log("--function--");
    // invoke function in string
  	eval("var fn = " + data_source);
  	randomData = fn();
  }
  // deal with uuid
  else if (data_source === "source_uuid") {
  	randomData = generateUUID();
  }
  // deal with date
  else if (data_source.startsWith('source_date')) {
    // key format: source_datestart*end*format
    //randomData = data_source.substring(11);
    var initParam = data_source.substring(11).split("*");
    randomData = generateDate(initParam[0], initParam[1], initParam[2]);
  }
  // deal with string value
  else {
//    alert("String value --> " + data_source);
    randomData = data_source;
  }
  
//  alert(data_source);
  return randomData;
}

function getDataSourceForField(type_field) {
  //console.log("Type-field source bind: ", util.inspect(data.random_bind, false, null));
  var data_bind = data.random_bind; //JSON.parse(data.random_bind);

  var data_source_key = data_bind[type_field];
  console.log("data source key: " + data_source_key);

  var data_source;
  if (typeof data_source_key === "undefined") {
    // not defined in bind try data source directly
    data_source_key = type_field;
  }
  if (data_source_key.startsWith('source')) {
    // source key is the value
    data_source = data_source_key;
  }
  else {
    // Get the data source
    data_source = data.random_source[data_source_key];
  }
  console.log("data source: " + data_source);

  return data_source;
}

/*
Generate random date within a date range in the given format.
*/
function generateDate(start, end, format) {
  console.log("start: " + start + " end: " + end + " format: " + format);
  var startDate = new Date(start);
  var endDate = new Date(end);
  // generate the random date within the given range
  var randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
  // format the date and return
  return formatDate(randomDate, format);
}

/*
  Supportted format: YYYY-MM-DD, MM/DD/YYYY
*/
function formatDate(date, format) {
  // decide the dividor
  var div = "-";
  console.log("format: " + format);
  if (format.includes("/")) {
    div = "/";
  }
  else if (format.includes("-")) {
    div = "-";
  }
  else {
    console.log("-------Un-recogonized dividor in format");
  }

  // Build date string base on the given format
  var date_string = "";
  var format_blocks = format.toLowerCase().split(div);
  for(var i=0; i<format_blocks.length; i++) {
    console.log("format block: " + format_blocks[i]);
    if (format_blocks[i].includes("y")) {
      date_string += div + date.getFullYear();
    }
    else if (format_blocks[i].includes("d")) {
      date_string += div + ("0"+(date.getMonth()+1)).slice(-2);
    }
    else if (format_blocks[i].includes("m")) {
      date_string += div + ("0" + date.getDate()).slice(-2);
    }
    else {
      console.log("-------Un-handled block");
    }
  }
  // remove the first div
  date_string = date_string.substring(1);

  //dateString += " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);

  console.log("Formatted date: " + date_string);
  return date_string;
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