const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const {connectToDb} = require('./db');
const cors = require('cors');
const app = express();
connectToDb();
app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(8000,() => console.log(`listening in ${8000}`))