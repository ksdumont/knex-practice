require('dotenv').config()
const knex = require('knex')
const ArticlesService = require('./articles-service')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})
// Use all the ArticlesService methods!!
ArticlesService.getAllArticles(knexInstance)
.then(articles => console.log(articles))
.then(() => 
    ArticlesService.insertArticle(knexInstance, {
        title: 'new title',
        content: 'new content',
        date_published: new Date(),
    })
)
.then(newArticle => {
    console.log(newArticle)
    return ArticlesService.updateArticle(
        knexInstance,
        newArticle.id,
        {title: 'updated title'}
    ).then(() => ArticlesService.getById(knexInstance, newArticle.id))
})
.then(article => {
    console.log(article)
    return ArticlesService.deleteArticle(knexInstance, article.id)
})
