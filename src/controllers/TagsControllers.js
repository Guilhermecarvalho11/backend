const knex = require('../database/knex')

class TagsController{
    async index(req, res) {
        const {users_id} = req.params;

        const tags = await knex('tags')
        .where({users_id})

        return res.json(tags)

    }
}

module.exports = TagsController;