var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  global.db.findAll((e, docs) => {
      if(e) { return console.log(e); }
      res.render('index', { title: 'Lista de Clientes', docs: docs });
  })
})

/* GET home page. */
router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Novo Cadastro', doc: {"nome":"","idade":""}, action: '/new' });
});


router.post('/new', function(req, res) {
  var nome = req.body.nome;
  var idade = parseInt(req.body.idade);
  global.db.insert({nome, idade}, (err, result) => {
          if(err) { return console.log(err); }
          res.redirect('/');
      })
})

router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.findOne(id, (e, docs) => {
      if(e) { return console.log(e); }
      res.render('new', { title: 'Edição de Cliente', doc: docs[0], action: '/edit/' + docs[0]._id });
    });
})

router.post('/edit/:id', function(req, res) {
  var id = req.params.id;
  var nome = req.body.nome;
  var idade = parseInt(req.body.idade);
  global.db.update(id, {nome, idade}, (e, result) => {
        if(e) { return console.log(e); }
        res.redirect('/');
    });
});


router.get('/delete/:id', function(req, res) {
  var id = req.params.id;
  global.db.deleteOne(id, (e, r) => {
        if(e) { return console.log(e); }
        res.redirect('/');
      });
});


/**ROTINAS PRESTA CONTA */
router.get('/newuser', function(req, res, next) {
  res.render('user', { title: 'Novo Usuário', 
    doc: {"email":"","name":"", "phone":"", "cpf":""}, 
    action: '/newuser' });
});

router.post('/newuser', function(req, res) {
  var email = req.body.email;
  var name = req.body.name;
  var phone = req.body.phone;
  var cpf = req.body.cpf;
  global.db.insertuser({email, name, phone, cpf}, (err, result) => {
          if(err) { return console.log(err); }
          res.redirect('/users');
      })
});

router.get('/edituser/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.findoneuser(id, (e, docs) => {
      if(e) { return console.log(e); }
      res.render('user', { title: 'Edição de Usuário', doc: docs[0], action: '/edituser/' + docs[0]._id });
    });
})

router.post('/edituser/:id', function(req, res) {
  var id = req.params.id;
  var email = req.body.email;
  var name = req.body.name;
  var phone = req.body.phone;
  var cpf = req.body.cpf;
  global.db.updateuser(id, {email, name, phone, cpf}, (e, result) => {
        if(e) { return console.log(e); }
        res.redirect('/users');
    });
});

/* GET users. */
router.get('/users', function(req, res) {
  global.db.findallusers((e, docs) => {
      if(e) { return console.log(e); }
      res.render('users', { title: 'Lista de Usuários', docs: docs });
  })
})

router.get('/deleteuser/:id', function(req, res) {
  var id = req.params.id;
  global.db.deleteoneuser(id, (e, r) => {
        if(e) { return console.log(e); }
        res.redirect('/users');
      });
});


router.get('/receiveuser/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.findoneuser(id, (e, docs) => {
      if(e) { return console.log(e); }
      res.render('receive', 
        { title: 'Recebimento de Usuário', doc: docs[0], action: '/receiveuser/' + docs[0]._id });
    });
  });
  
  router.post('/receiveuser/:id', function(req, res) {
    var userid = req.params.id;
    var date = req.body.date;
    var value = parseFloat(req.body.value);
    global.db.receiveuser({userid, date, value}, (e, result) => {
          if(e) { return console.log(e); }
          res.redirect('/users');
      });
  });



module.exports = router;
