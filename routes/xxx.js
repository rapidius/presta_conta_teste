
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/xxx/', function(req, res) {
    global.db.findAll((e, docs) => {
        if(e) { return console.log(e); }
        res.render('xxx', { title: 'Lista de xxx', docs: docs });
    })
  })


module.exports = router;