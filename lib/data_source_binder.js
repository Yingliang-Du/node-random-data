var data = require('./data_source');
var generator = require('./random_data_generator');

module.exports = function(obj, property, type) {
	console.log("Parameters - obj:" + obj + " property:" + property + " type:" + type);
	// get data source key from random_bind
	var obj_field = obj + "-" + property;
	console.log("Object-field combined key: " + obj_field);
	var data_source_key = getDataSourceKeyForField(obj_field); 
	console.log("Data source key from random bind: " + data_source_key);
	// When the data source is not defined in the random_bind - using the type  
	// Make sure to have entry for every type in the random_bind
  	if (typeof data_source_key === "undefined" || data_source_key.length == 0) {
    	obj_field = type;
  	}
  	else {
  		// make sure date generated correctly even binding configured wrong
  		if ('date' === type && !data_source_key.startsWith('source_date')) {
  			obj_field = type;
  		}
  	}

  	// Generate random value for object property and return 
  	console.log("final key: " + obj_field);
  	return generator(obj_field);
}

function getDataSourceKeyForField(obj_field) {
  //console.log("Type-field source bind: ", util.inspect(data.random_bind, false, null));
  var data_bind = data.random_bind; //JSON.parse(data.random_bind);

  var data_source_key = data_bind[obj_field];
  console.log("data source key: " + data_source_key);

  return data_source_key;
}