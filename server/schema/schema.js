let graphql = require("graphql");
let AuthorSchema = require("../models/author");
let BookSchema = require("../models/book");

let { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLID, GraphQLInt } =
  graphql;

//dummy data
let books = [
  { name: "Name of the Wind", genre: "fantasy", id: "1", authorId: "1" },
  { name: "Name of the World", genre: "horror", id: "2", authorId: "2" },
  { name: "Name of the Sun", genre: "comedy", id: "3", authorId: "3" },
  { name: "Name of the China", genre: "politics", id: "4", authorId: "1" },
  { name: "Name of the Mongolia", genre: "politics", id: "5", authorId: "1" },
];

let authors = [
  { name: "Windy", age: 11, id: "1" },
  { name: "Worldy", age: 12, id: "2" },
  { name: "Sunny", age: 13, id: "3" },
];

//Type
let BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, _args) {
        return authors.find((author) => author.id === parent.authorId);
      },
    },
  }),
});

let AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, _args) {
        return books.filter((book) => book.authorId === parent.id);
      },
    },
  }),
});

//RootQuery
let RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(_parent, args) {
        return BookSchema.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(_parent, args) {
        return AuthorSchema.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        return BookSchema.find();
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return AuthorSchema.find();
      },
    },
  },
});

let Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {
          type: GraphQLString,
        },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let author = new AuthorSchema({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: {
          type: GraphQLString,
        },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let book = new BookSchema({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book.save();
      },
    },
  },
});

//exports
module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
