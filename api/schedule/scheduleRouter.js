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

const eventStartTime = new Date()
const eventEndTime = new Date()
eventEndTime.setMinutes(eventEndTime.getMinutes() + 30)

let clientnumber = 14436267118
let eventtest = 1

const event = {
    summary: 'Dog groom',
    location: '13009 Oakland Rd, Ridgely, MD 21660',
    description: "Groomingzzzz",
    start: {
        dateTime: eventStartTime,
        timeZone: 'America/New_York',
    },
    end: {
        dateTime: eventEndTime,
        timeZone: 'America/New_York',
    }
}

router.all('/', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
  });

router.get('/calendar', function (req, res) {
    res.status(200).json(google.calendars.get({calendarId: 'primary'}));
})

router.post('/calendar', function (req, res) {
    const calendar = google.calendar({ version: 'v3', auth: AuthClient })
    try{
        calendar.events.insert({calendarId: 'primary', resource: event},
        // err =>
        //     {if (err) return console.log("Could not insert event.", err)}
        )
        .then(twilio.messages.create({
            to: clientnumber,
            from: process.env.TWILIO_PHONE,
            body: 'You have a new event!'
        }))
        .then(res.status(200).json({message: 'event added', calendar: calendar}))
        } 
        catch (err) {res.status(500).json({message: "Add event failed,", err, calendar: calendar})}
})

router.delete('/calendar', function (req, res) {
    const calendar = google.calendar({ version: 'v3', auth: AuthClient })
    console.log(calendar.events.list({calendarId: 'primary'}))
    try{
        calendar.events.delete({calendarId: 'primary', eventId: eventtest },
        err =>
            {if (err) return console.log("Could not delete event.", err)})
            .then(twilio.messages.create({
                to: clientnumber,
                from: process.env.TWILIO_PHONE,
                body: 'Your event was removed!'
            }))
            .then(res.status(200).json({message: 'event deleted', calendar: calendar}))
    } catch (err) {res.status(500).json({message: "Delete event failed,", calendar: calendar})}
})


module.exports = router;