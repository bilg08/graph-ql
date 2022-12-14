import React, { useEffect, useState } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from 'lodash';
import { getAuthorsQuery, addBookMutation,getBooksQuery } from "../query";


function AddBook(props) {
    let [input, setInput] = useState({});
    function handleAddBook(e) {
        e.preventDefault();
        props.addBookMutation({
          variables: input,
          refetchQueries: [{ query: getBooksQuery }],
        });
    }

    function DisplayAuthors() {
        let data = props.getAuthorsQuery;
      if (data.loading) {
        return <option>LoadingBooks...</option>;
      } else {
        return data.authors.map((author) => {
          return <option value={author.id} key={author.id}>{author.name}</option>;
        });
      }
    }


  return (
    <form onSubmit={handleAddBook}>
      <div className="field">
        <label>Book name:</label>
        <input
          name="name"
          onChange={(e) =>
            setInput({ ...input, [e.target.name]: e.target.value })
          }
          type="text"
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          name="genre"
          onChange={(e) =>
            setInput({ ...input, [e.target.name]: e.target.value })
          }
          type="text"
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select
          onChange={(e) =>
            setInput({ ...input, [e.target.name]: e.target.value })
          }
          name="authorId">
          <DisplayAuthors />
        </select>
      </div>
      <button type="submit">+</button>
    </form>
  );
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
