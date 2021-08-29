import React from 'react'
import {Link} from 'react-router-dom'
import BookShelf from './BookShelf'
class BookList extends React.Component {

  render(){
    const shelves = this.props.shelves
    const BookShelves = []
    for (const shelf in shelves) {
      BookShelves.push(
        <BookShelf
          key = {shelf}
          name = {shelf}
          books = {shelves[shelf]}
        />
        )
    }
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {BookShelves}
        <div className="open-search">
          <Link to={{
            pathname: '/search'
          }}>
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default BookList