const send = require('../services/send');
const responseHandler = require('../services/response');
const postbackHandler = require('../services/postbacks');

module.exports = {
  receive(req, res) {

    let body = req.body;

    // Check the webhook event is from a Page subscription
    if (body.object === 'page') {

      body.entry.forEach(function (entry) {

        let webhook_event = entry.messaging[0];

        let sender_psid = webhook_event.sender.id;

        if(webhook_event.message){
          if (webhook_event.message.quick_reply) {
             //console.log(`lidando com o postback ${webhook_event.message.text}`);
            
             handlePostback(sender_psid, webhook_event.message.quick_reply);
  
          } else if (webhook_event.message) {
            // console.log(`lidando com a mensagem ${webhook_event.message.text}`);
            handleMessage(sender_psid, webhook_event.message);
          }
        }

      });

      res.status(200).send('EVENT_RECEIVED');

    } else {
      res.sendStatus(404);
    }
  },

  handleWebhook(req, res) {

    const VERIFY_TOKEN = "fstwfcydwvda";

    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && token) {

      if (mode === 'subscribe' && token === VERIFY_TOKEN) {

        res.status(200).send(challenge);

      } else {

        res.sendStatus(403);
      }
    }
  }
}

function handleMessage(sender_psid, received_message) {
  responseHandler.handleMessage(sender_psid);
}

function handlePostback(sender_psid, received_postback) {
  postbackHandler.handlePostbacks(sender_psid, received_postback.payload);
}


