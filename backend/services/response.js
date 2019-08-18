const templates = require('../services/template');
const send  = require('./send');

module.exports = {
    handleMessage(sender_psid) {
        
        const label = {"text": "Ola! por favor, selecione uma da categorias abaixo para eu te mostrar noticias sobre elas  :)"}
        let quickReply = handleQuickReply();
        quickReply.text = label.text;
        send.callSendAPI(sender_psid, quickReply);     
    }

}

function handleQuickReply(){
    return  templates.getQuickReply();
}