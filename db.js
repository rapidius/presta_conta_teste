const bcrypt = require('bcryptjs') 

       
function findAll(callback){  
    global.db.collection("customers").find({}).toArray(callback);
}

function insert(customer, callback){
    global.db.collection("customers").insert(customer, callback);
}

var ObjectId = require("mongodb").ObjectId;
function findOne(id, callback){  
    global.db.collection("customers").find(new ObjectId(id)).toArray(callback);
}

function update(id, customer, callback){
    global.db.collection("customers").updateOne({_id:new ObjectId(id)}, {$set:{nome:customer.nome, idade:customer.idade}}, callback);
}

function deleteOne(id, callback){
    global.db.collection("customers").deleteOne({_id: new ObjectId(id)}, callback);
}

/**ROTINAS PRESTA CONTA */
/**user */
function findallusers(callback){  
    //global.conn.collection("users").find({}).toArray(callback);
    global.db.collection("users").find({}).toArray(callback);
}

function insertuser(user, callback){
    global.db.collection("users").insert(user, callback);
}

var ObjectId = require("mongodb").ObjectId;
function findoneuser(id, callback){  
    global.db.collection("users").find(new ObjectId(id)).toArray(callback);
}

function updateuser(id, user, callback){
    global.db.collection("users").updateOne({_id:new ObjectId(id)}, 
        {$set:{email:user.email, name:user.name, phone:user.phone, cpf:user.cpf }}, callback);
}

function deleteoneuser(id, callback){
    global.db.collection("users").deleteOne({_id: new ObjectId(id)}, callback);
}

function receiveuser(receive, callback){
    global.db.collection("receives").insert(receive, callback);
}


module.exports = { findAll, insert, findOne, update, deleteOne, 
    findallusers, insertuser, findoneuser, updateuser, deleteoneuser, receiveuser}

