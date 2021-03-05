const express = require('express');
const authRequired = require('../middleware/authRequired');
const router = express.Router();


const { google } = require('googleapis')
const { OAuth2 } = google.auth

const AuthClient = new OAuth2(process.env.OAUTH_ID, process.env.OAUTH_SECRET_SHHH)

const TwilioSID = process.env.TWILIO_ACCOUNT_SID
const TwilioAuth = process.env.TWILIO_AUTH_TOKEN

const twilio = require('twilio')(TwilioSID, TwilioAuth)

AuthClient.setCredentials({
    refresh_token: process.env.OAUTHREFRESH,
})

const calendar = google.calendar({ version: 'v3', auth: AuthClient })

const eventEndTime = new Date()
eventEndTime.setMinutes(eventEndTime.getMinutes() + 30)

const event = {
    summary: 'Dog groom',
    location: '13009 Oakland Rd, Ridgely, MD 21660',
    description: "Groomingzzzz",
    start: {
        dateTime: Date.now(),
        timeZone: 'America/Baltimore',
    },
    end: {
        dateTime: eventEndTime,
        timeZone: 'America/Baltimore',
    }
}

router.all('/', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
  });

router.get('/calendar', function (req, res) {
    res.status(200).json(calendar);
})

router.post('/calendar', function (req, res) {
    const calendar = google.calendar({ version: 'v3', auth: AuthClient })
    try{
        calendar.freebusy.query(
            {
                resource: {
                    timeMin: Date.now(),
                    timeMax: eventEndTime,
                    timeZone: 'America/Baltimore',
                    items: [{ id: 'primary' }],
                },
        },
    (err, res) => {
        const eventsArr = res.data.calendars.primary.busy
        newcalendar = calendar.events.insert({calendarId: 'primary', resource: event})
        if (eventsArr.length === 0) {    
        res.status(200).json({message: "event added", calendar: newcalendar})
    } 
    } 
        )} catch (err) {res.status(500).json({message: "Add event failed", calendar: calendar})}
})


module.exports = router;