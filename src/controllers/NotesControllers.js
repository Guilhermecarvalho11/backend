const knex = require('../database/knex/index.js');

class NotesController {
    async create(req, res){
        const {title, description, tags, links} = req.body;
        const {users_id} = req.params;

        const [note_id] = await knex('notes').insert({
            title,
            description,
            users_id
        })

        const linksInsert = links.map(link => {
            return {
                note_id,
                url: link
            }
        })

        await knex('links').insert(linksInsert);

        const tagsInsert = tags.map(name => {
            return {
                note_id,
                name,
                users_id
            }
        })

        await knex('tags').insert(tagsInsert);

        res.json();
    }

    async show(req, res){
        const { id } = req.params;

        const note = await knex('notes').where({id}).first();
        const tags = await knex('tags').where({note_id: id}).orderBy('name');
        const links = await knex('links').where({note_id: id}).orderBy('created_at');

        return res.json({
            ...note,
            tags,
            links
        })
    }
}

module.exports = NotesController;