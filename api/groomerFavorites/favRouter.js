//======================//
//      IMPORTS         //
//======================//
const express = require('express');
const authRequired = require('../middleware/authRequired');
const groomerFavModel = require('./favModel');
const router = express.Router();

//============================//
//  GET all favorite groomers //
//============================//
router.get('/');

//============================//
//  DELETE groomer by id //
//============================//
router.delete('/:id', authRequired, async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({ message: 'Missing required id.' });
    }
    await groomerFavModel.remove(req.params.id);
    res.status(200).json({ message: 'User was deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
