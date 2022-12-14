import {graphql} from 'react-apollo';
import {getBookQuery} from '../query.js';

function BookDetail(props) {

	return(
		<div>
           <h1 style={{color:'black'}}>BookDetail</h1>
           {props.data.book?(
           	<div>
				<h1>{props.data.book.name}</h1>
				<p>{props.data.book.genre}</p>
				<p>{props.data.book.author.name}</p>
				<ul style={{listStyle:'none'}}>
                  {props.data.book.author.books.map(item=><li style={{color:'pink',
                    background:'white',
                    border:'3px solid pink',
                    width:'200px',
                    height:'25px',
                    borderRadius:'10px'}} key={item.id}>{item.name}</li>)}
				</ul>
           	</div>
           	):<p>No selected book</p>}
		</div>
	)
}

export default graphql(getBookQuery,{
	options:(props) => {
		return {
			variables: {
				id:props.bookid
			}
		}
	}
})(BookDetail);
