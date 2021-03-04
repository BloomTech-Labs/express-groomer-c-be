
exports.up = async(knex) => {
    await knex.schema.createTable('groomer-favorites', (table) => {
        table.increments('id');
        table
            .string('customer_id')
            .references('user_id')
            .inTable('customer')
            .onDelete('cascade')
            .onUpdate('cascade')
        table
            .string('groomer_id')
            .references('user_id')
            .inTable('groomer')
            .onDelete('cascade')
            .onUpdate('cascade')
            .notNull();
            
    });
};

exports.down = async(knex) => {
    await knex.schema.dropTableIfExists('groomer-favorites');
};
