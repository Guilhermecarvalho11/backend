const knex = require('../database/knex/index.js');

class TeamController {
    async create(req, res){
        const {team, boss, league} = req.body;
        const {users_id} = req.params;

        const team_id = await knex('teams').insert({
            users_id,
            team,
            boss,
            league
        })

        res.json();
    }

    // async show(req, res){
    //     const { id } = req.params;

    //     const note = await knex('notes').where({id}).first();
    //     const tags = await knex('tags').where({note_id: id}).orderBy('name');
    //     const links = await knex('links').where({note_id: id}).orderBy('created_at');

    //     return res.json({
    //         ...note,
    //         tags,
    //         links
    //     })
    // }
}

module.exports = TeamController;