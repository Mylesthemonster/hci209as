const { google } = require('googleapis')
const {OAuth2} = google.auth
const oath2Client = new OAuth2(
    '28311222963-rcdis1o9mqlcesueiut7i3nau0phhaar.apps.googleusercontent.com', 
    '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'
)

oath2Client.setCredentials({refresh_token: '1//04W4JJ4MQV9cKCgYIARAAGAQSNwF-L9Ir9dEQGpDbze7oyU-fCatovxtUoS9c7feMUwA-ImQNK51jb7bbe6QoJPKn74Kh6PsgS1I'})
const calendar = google.calendar({version: 'v3', auth: oath2Client})
const eventStartTime = new Date()
eventStartTime.setDate(eventStartTime.getDay() + 2)
eventEndTime = new Date()
eventEndTime.setDate(eventEndTime.getDay() + 2)
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

const event = {
    summary: 'Meeting with David',
    location: '10955 Weyburn Ave, Los Angeles, CA 90024',
    description: 'Catching up on life.',
    start:{
        dateTime: eventStartTime,
        timeZone: 'America/Denver',
    },
    end:{
        dateTime: eventEndTime,
        timeZone: 'America/Denver',
    },
    colorId: 1, 
}

calendar.freebusy.query({
    resource:{
        timeMin: eventStartTime,
        timeMax: eventEndTime,
        timeZone: 'America/Denver',
        items: [{id:'primary'} ]
    }
}, (err,res)=>{
    if (err) return console.log("Free query busy error")

    const eventsArray = res.data.calendars.primary.busy;
    if(eventsArray.length === 0){
        return calendar.events.insert({
            calendarId:'primary',
            resource: event
        }, err =>{
            if (err) return console.error("Calendar Event Creation Error", err)
            return console.log("Calendar Event Created")
        })
    }

    return console.log("Sorry I am busy")

})