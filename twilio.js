//********************************************************
//for sending text messages from a Node server
//pass in USA phone number Without international prefix as send_to_phone_num
//pass in string as message_to_send
// --env files needed ---//
// API_KEY = account key
// ACCOUNT = account string
// TWILIO_APP_PHONE_NUM = Twilio account phone number
//********************************************************
require('dotenv').load();
var twilio = require('twilio');



module.exports = {

  sendMessage(send_to_phone_num, message_to_send) {
    return new Promise(function(resolve, reject){
      var client = new twilio.RestClient(process.env.ACCOUNT, process.env.API_KEY);
      client.sms.messages.create({
          to: '+1' + send_to_phone_num,
          from: process.env.TWILIO_APP_PHONE_NUM,
          body: message_to_send
      },
      function(error, message){
        if (!error) {
                resolve(message);
        } else {
                reject(error);
        }
      });
    });
  }

};
