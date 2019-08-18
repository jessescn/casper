module.exports = {

    genericModel(news){
        const genModel = {
            "title": news.title,
            "image_url":news.image,
            "subtitle": news.description,
            "default_action":{
                "type": "web_url",
                "url": news.link,
                "messenger_extensions": "false",
                "webview_height_ratio":"tall"
            },  
            "buttons": [{
                "type":"web_url",
                "url": news.link,
                "title": "Conferir"
            }]
        }
        return genModel;
    },

    genericCarrousel(genModels){        
        const carrousel = {
            "attachment": {
              "type": "template",
              "payload": {
                "template_type": "generic",
                "elements": genModels
              }
            }
          }
          return carrousel;
    },

    getQuickReply(){

        let quickReply = {
            "text": "selecione uma das categorias abaixo",
            "quick_replies":[
              {
                "content_type":"text",
                "title":"Esportes",
                "payload":"esportes"
              },{
                "content_type":"text",
                "title":"Política",
                "payload":"politica"
              }, {
                "content_type":"text",
                "title":"Entretenimento",
                "payload":"entretenimento"
              }, {
                "content_type":"text",
                "title":"Famosos",
                "payload":"famosos"
              }
            ]
          }

          return quickReply;
    }
}