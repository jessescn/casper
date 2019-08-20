const New = require('../models/new');

module.exports = {
    async index(req, res) {

        const news = await New.find();

        if (news.length == 0) {
            return res.json({ "log": "A lista de notícias está vazia" })
        }

        return res.json(news);
    },
    // retorna a lista de todas as noticias pelo topico recebido como parametro
    async getNewByTopic(topic) {

        return await New.find({ topic: topic }).limit(10);
    },
    // recebe os valores pelo corpo e cria a nova noticia
    async post(req, res) {

        const news = await New.create(req.body);

        console.log("Noticia criada com sucesso!");

        return res.json(news);
    },
    // Recebe o id pelo parametro da rota e da update na noticia
    async update(req, res) {

        const { id } = req.params;

        const newsUpdated = await New.findOneAndUpdate({ _id: id }, req.body);

        console.log("Noticia atualizada com sucesso!");

        return res.json(newsUpdated);
    },

    async delete(req, res) {

        const { id } = req.params;
        
        const newsRemoved = await New.findByIdAndDelete(id);

        if (!newsRemoved) {
            return res.status(400).send({ "error": "news doesnt exists" });
        }

        console.log("Noticia removida com sucesso");

        return res.json(newsRemoved);
    }
}