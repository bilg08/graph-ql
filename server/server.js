const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const {connectToDb} = require('./db')

const app = express();
connectToDb()
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(8000,() => console.log(`listening in ${8000}`))