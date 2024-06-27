exports.up = knex => knex.schema.createTable('teams', table => {
    table.increments('id');
    table.text('team').notNullable();
    table.text('boss').notNullable();
    table.text('league').notNullable();

    table.integer('users_id').references('id').inTable('users');

    table.timestamp('created_at').default(knex.fn.now());
    table.timestamp('update_at').default(knex.fn.now());
    
});


exports.down = knex => knex.schema.dropTable('teams');