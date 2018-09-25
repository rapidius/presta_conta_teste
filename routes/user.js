var express = require('express');
var router = express.Router();
const db = require('../db');


  /* GET users. */
  router.get('/users', global.authenticationMiddleware(), function(req, res) {
    db.findallusers((e, docs) => {
        if(e)   { return console.log(e); }
        res.render('users', { title: 'Lista de Usuários', docs: docs });
    })
  })


router.get('/edituser/:id', global.authenticationMiddleware(), function(req, res, next) {
    var id = req.params.id;
    db.findoneuser(id, (e, docs) => {
        if(e) { return console.log(e); }
        res.render('user', { title: 'Edição de Usuário', doc: docs[0], action: '/user/edituser/' + docs[0]._id });
      });
  })
  

  router.post('/edituser/:id', function(req, res) {
    var id = req.params.id;
    var email = req.body.email;
    var name = req.body.name;
    var phone = req.body.phone;
    var cpf = req.body.cpf;
    db.updateuser(id, {email, name, phone, cpf}, (e, result) => {
          if(e) { return console.log(e); }
          res.redirect('/user/users');
      });
  });
    

  router.get('/newuser', global.authenticationMiddleware(), function(req, res, next) {
    res.render('user', { title: 'Novo Usuário', 
      doc: {"email":"","name":"", "phone":"", "cpf":""}, 
      action: '/user/newuser' });
  });

  
  router.post('/newuser', function(req, res) {
    var email = req.body.email;
    var name = req.body.name;
    var phone = req.body.phone;
    var cpf = req.body.cpf;
    db.insertuser({email, name, phone, cpf}, (err, result) => {
            if(err) { return console.log(err); }
            res.redirect('/user/users');
        })
  }); 
  
  
  router.get('/deleteuser/:id', global.authenticationMiddleware(), function(req, res) {
    var id = req.params.id;
    db.deleteoneuser(id, (e, r) => {
          if(e) { return console.log(e); }
          res.redirect('/user/users');
        });
  });
  
  
  router.get('/receiveuser/:id', global.authenticationMiddleware(), function(req, res, next) {
    var id = req.params.id;
    db.findoneuser(id, (e, docs) => {
        if(e) { return console.log(e); }
        res.render('receive', 
          { title: 'Recebimento de Usuário', doc: docs[0], action: '/user/receiveuser/' + docs[0]._id });
      });
    });
    

    router.post('/receiveuser/:id', function(req, res) {
      var userid = req.params.id;
      var date = req.body.date;
      var value = parseFloat(req.body.value);
      db.receiveuser({userid, date, value}, (e, result) => {
            if(e) { return console.log(e); }
            res.redirect('/user/users');
        });
    });




  module.exports = router;