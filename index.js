#!/usr/bin/node


let http = require("http");

let mongo_client = require("mongodb").MongoClient;

let url = "mongodb://localhost/";

let db;

console.log("Inicuando script mongo-http");

mongo_client.connect(url, function(error, conn) {
	console.log("Dentro de MongoDB");

	if(error){
		console.log("ERROR!!!");
		return;
	}

	db = conn.db("tffhd");
});




http.createServer(function(request, response){
	response.writeHead(200);

	if(request.url == "/"){
		response.end();
		return;
	}

	let col= "";
	
	if(request.url == "/characters")
		col = "characters";
	else if(request.url == "/items")
		col = "items";
	else if(request.url == "/weapons")
		col = "weapons";
	else
		return;

	let col_data = db.collection(col).find();

	col_data.toArray(function(err,data){
		let string = JSON.stringify(data);

		response.end(string);
	});

}).listen(1095);
