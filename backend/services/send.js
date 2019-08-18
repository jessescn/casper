const request = require('request');
const PAGE_ACCESS_TOKEN = "EAAGqZAWF3rk0BABfa2IUKte5UPfWqPK042Vurt2kpt5nNdwbW88wl9qCYLEwPw08CQatGrJpzQ5g0Y2DhZCYWHcUCk4rXJF1DAia1E4WbVX0YLv3MBfWIzyBNpfZBdccCI6rU8ePVezzGI1rX8zluZBDM3NZCi7mvU2TbjxAOeQZDZD";

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
          "qs": { "access_token": PAGE_ACCESS_TOKEN },
          "method": "POST",
          "json": request_body
        }, (err, res, body) => {
          if (!err) {
            
            console.log('message sent!')
          } else {
            console.error("Unable to send message:" + err);
          }
        })
      }
}