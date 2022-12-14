import React, { useEffect,useState } from "react";
import { graphql } from 'react-apollo';
import { getBooksQuery} from '../query';
import BookDetail from './BookDetail.js';
function BookList(props) {

 const [selected,setSelected] = useState(null);

    function DisplayBooks() {
        let data = props.data;
        if (data.loading) {
            return <option disabled>LoadingBooks...</option>
        } else {
            return data.books.map((book) => {
                return <li 
                 style={{
                    color:'pink',
                    background:'white',
                    border:'3px solid pink',
                    display:'flex',
                    padding:'0px 15px',
                    justifyContent:'center',
                    alignItems:'center',
                    maxHeight:'50px',
                    borderRadius:'10px'
                 }}
                onClick={() => {setSelected(book.id)}} key={book.id}>{book.name}</li>
            })
        }
    }

  return (
    <div style={{
        display:'flex',
    }}>
      <ul style={{
        width:'50%',
      display:'flex',
      flexWrap:'wrap',
      listStyle:'none',
      gap:'10px'
      }}>
        <DisplayBooks />
      </ul>
      <BookDetail bookid={selected}/>
    </div>
  );
}

export default graphql(getBooksQuery)(BookList);
