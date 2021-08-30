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
          onShelfChange = {this.props.onShelfChange}
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
            <i className="plus circle link huge green icon"></i>
          </Link>
        </div>
      </div>
    );
  }
}

export default BookList
