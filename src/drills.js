require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
})

function getItemsWithText(searchTerm) {
    knexInstance
    .select('item_id', 'name', 'price', 'category')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
        console.log(result)
    })
}
// getItemsWithText('beef')

function paginateItems(page) {
    const itemsPerPage = 6
    const offset = itemsPerPage * (page - 1)
    knexInstance
    .select('item_id', 'name', 'price', 'category')
    .from('shopping_list')
    .limit(itemsPerPage)
    .offset(offset)
    .then(result => {
        console.log(result)
    })
}
// paginateItems(2)

function getItemsAddedAfterDate(daysAgo) {
    knexInstance
    .select('item_id', 'name', 'price', 'category')
    .where('date_added', '>', 
    knexInstance
    .raw(`now() -  '?? days'::INTERVAL`, daysAgo))
    .from('shopping_list')
    .then(result => {
        console.log(result)
    })
}
// getItemsAddedAfterDate(2)

function getTotalCostforCategory() {
    knexInstance
    .select('category')
    .count('name as items')
    .sum('price as total')
    .from('shopping_list')
    .groupBy('category')
    .then(result => {
        console.log(result)
    })
}
getTotalCostforCategory()


