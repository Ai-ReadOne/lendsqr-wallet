import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('transaction', function(table){
        table.uuid('id').primary().notNullable().unique();
        table.uuid('wallet_id').references('id').inTable('wallet');
        table.string('currency').notNullable().defaultTo("NGN");
        table.float('amount').notNullable();
        table.string('transaction_type').notNullable();
        table.string('status').notNullable();
        table.timestamp('transaction_date').defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('transaction');
}
