const express = require('express');
const router = express.Router();

const User = require('../models/user');

/* GET users listing. */
router.delete('/:id', function(req, res, next) {
    
    //borrado fisico
   /* User.findByIdAndDelete(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.json(err));*/


    //borrado lógico con plugin
    User.deleteById(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

module.exports = router;