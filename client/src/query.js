import { gql } from "apollo-boost";

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;
const addBookMutation = gql`
  mutation ($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
      genre
    }
  }
`;

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const getBookQuery = gql`
query($id:ID) {
  book(id:$id){
    name
    id
    genre 
    author{
      id
      name
      age
      books{
        name
        id
      }
    }
  }
}
`
export { getAuthorsQuery,getBookQuery, addBookMutation, getBooksQuery };
