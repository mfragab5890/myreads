import React from 'react'
import BookItem from './BookItem'

class BookShelf extends React.Component {
  render(){
    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.name}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {
                  this.props.books.map((book) => {
                    return (
                      <BookItem
                        key = {book.id}
                        title = {book.title}
                        authors = {book.authors}
                        url = {book.imageLinks.thumbnail}
                      />
                    );
                  })
                }
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BookShelf
