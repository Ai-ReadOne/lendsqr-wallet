import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('wallet', function(table){
        table.uuid('id').primary().notNullable().unique();
        table.uuid('user_id').references('id').inTable('user');
        table.string('currency').notNullable().defaultTo("NGN");
        table.float('balance').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('wallet');
}

