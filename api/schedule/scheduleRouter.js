const express = require('express');
const authRequired = require('../middleware/authRequired');
const router = express.Router();


const { google } = require('googleapis')
const { OAuth2 } = google.auth

const AuthClient = new OAuth2(process.env.OAUTH_ID, process.env.OAUTH_SECRET_SHHH)

const TwilioSID = process.env.TWILIO_ACCOUNT_SID
const TwilioAuth = process.env.TWILIO_AUTH_TOKEN

const twilio = require('twilio')(TwilioSID, TwilioAuth)

// twilio.message.create({
//     to: 
//     from:
//     body:
// })

AuthClient.setCredentials({
    refresh_token: process.env.OAUTHREFRESH,
})

const calendar = google.calendar({ version: 'v3', auth: AuthClient })

router.all('/', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
  });

router.get('/calendar', function (req, res) {
    res.status(200).json(calendar);
    // .catch((err) => {
    //     console.log(err);
    //     res.status(500).json({ message:err.message });
    // });
})

module.exports = router;