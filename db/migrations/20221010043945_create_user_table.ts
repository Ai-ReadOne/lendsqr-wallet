import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('user', function(table){
        table.uuid('id').primary().notNullable().unique();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').notNullable().unique();
        table.bigInteger('phone').notNullable().unique();
        table.boolean('is_admin').defaultTo(false);
        table.string('address').notNullable().unique();
        table.bigInteger('bvn').notNullable().unique();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('user');
}

