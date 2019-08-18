const validUrl = require('valid-url');

const responseHandler = require('./response');
const templates = require('./template');
const send = require('./send');
const NewsController = require('../controllers/NewsController');

const defaultImg = "http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png";
const defaultUrl = "https://google.com";

module.exports = {
    handlePostbacks(sender_psid, payload) {
        getNews(payload, sender_psid);
    }
}


async function getNews(topic, id) {

    let news = await NewsController.getNewByTopic(topic);

    news = checkUrl(news);

    if (news.length == 0) {

        const label = { "text": "Sinto muito, mas não temos noticias disponiveis sobre esse tópico, por favor selecione uma das outras categorias abaixo para eu te mostrar noticias sobre elas!" }

        let quickReply = templates.getQuickReply();
        quickReply.text = label.text;

        send.callSendAPI(id, quickReply);
         
    } else {
        let genModels = []
    
        news.forEach(notice => {
            let model = templates.genericModel(notice);
            genModels.push(model)
        })
    
        const carrousel = templates.genericCarrousel(genModels);
    
        send.callSendAPI(id, carrousel);
    }

}

    function checkUrl(news) {
        let filteredNotices = [];

        news.forEach(notice => {
            if (!validUrl.isUri(notice.link) || validUrl.isUri(notice.image)) {
                if (!validUrl.isUri(notice.link)) {
                    notice.link = defaultUrl
                }
                if (!validUrl.isUri(notice.image)) {
                    notice.image = defaultImg
                }
            }
            filteredNotices.push(notice)
        })

        return filteredNotices;
    }