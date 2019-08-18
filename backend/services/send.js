const request = require('request');
require('dotenv-safe').config();

module.exports = {
  callSendAPI(sender_psid, response) {

    let request_body = {
      "recipient": {
        "id": sender_psid
      },
      "message": response
    }


    return request({
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
      "method": "POST",
      "json": request_body
    }, (err, res, body) => {
      if (!err) {
        console.log(body);
        
        console.log('message sent!')
      } else {
        console.error("Unable to send message:" + err);
      }
    })
  }
}