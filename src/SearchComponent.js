import React from 'react'
import {Link} from 'react-router-dom'
import BookItem from './BookItem'

class SearchComponent extends React.Component {
  render(){
    const errorClass = this.props.error === ''? "ui icon hidden message": "ui icon message"
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to={{
            pathname: '/'
          }}>
            <button className="close-search">
            </button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value = {this.props.value}
              onChange = {(e) => {
                this.props.onSearchInputChange(e.target.value)
              }}
              />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { this.props.results &&
              (this.props.results.map((book) => {
                if (book.hasOwnProperty('shelf')) {
                  console.log(book);
                }
                return (
                  <BookItem
                    key = {book.id}
                    id = {book.id}
                    title = {book.title}
                    authors = {book.authors}
                    url = {book.imageLinks ? book.imageLinks.thumbnail: '' }
                    onShelfChange = {this.props.onShelfChange}
                  />
                );
              }))
          }
          </ol>
        </div>
        <div className={errorClass}>
          <i className="search icon"></i>
          <div className="content">
            <div className="header">
              `Searching for {this.props.value}?`
            </div>
            <p>{this.props.error}</p>
          </div>
        </div>

      </div>
    );
  }
}

export default SearchComponent
