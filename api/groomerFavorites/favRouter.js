//======================//
//      IMPORTS         //
//======================//
const express = require('express');
const authRequired = require('../middleware/authRequired');
const groomerFavModel = require('./favModel.js');
const router = express.Router();

router.all('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

//============================//
//  GET all favorite groomers //
//============================//
router.get('/', async (req, res) => {
  try {
    const data = await groomerFavModel.getAll();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// See notes on the favModel regarding the errors we encountered
// The following code is needed if wanting to display more groomer info/data
// on the pet owners dashboard.
//router.get('/:id', async (req, res) => {
//try {
//const data = await groomerFavModel.getById(req.params.id);
//res.status(200).json(data);
//} catch (err) {
// res.status(500).json({ message: err.message });
//  }
//});

//============================//
//  DELETE groomer by id //
//============================//
// The routes work without 'authRequired'. This code will be needed to verify id token.
// We were not able to get 'authRequired' working at this time.
// router.delete('/:id', authRequired, async (req, res) => {
router.delete('/:id', async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({ message: 'Missing required id.' });
    }
    await groomerFavModel.remove(req.params.id);
    res.status(200).json({ message: 'Selected favorite groomer was deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
