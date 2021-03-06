import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'
import SearchComponent from './SearchComponent'
import {Route} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    allBooks : [],
    shelves : {
      currentlyReading : [],
      wantToRead : [],
      read : []
    },
    searchTerm : '',
    results : [],
    error : ''
  }

  addToShelf = async (shelf,newBook) => {
    if (shelf === 'currentlyReading') {
      this.setState((prevState) => {
        return {
          shelves :{
            currentlyReading : prevState.shelves.currentlyReading.concat(newBook),
            wantToRead : prevState.shelves.wantToRead,
            read : prevState.shelves.read

        }};
      })

    }else if (shelf === 'wantToRead') {
      await this.setState((prevState) => {
        return {
          shelves :{
            currentlyReading : prevState.shelves.currentlyReading,
            wantToRead : prevState.shelves.wantToRead.concat(newBook),
            read : prevState.shelves.read
        }};
      })
    }else if (shelf === 'read') {
      await this.setState((prevState) => {
        return {
          shelves :{
            currentlyReading : prevState.shelves.currentlyReading,
            wantToRead : prevState.shelves.wantToRead,
            read : prevState.shelves.read.concat(newBook)
        }};
      })
    }

  }

  removeFromShelf = async (prevShelf,bookId) => {
    if (prevShelf === 'currentlyReading') {
      await this.setState((prevState) => {
        return {
          shelves :{
            currentlyReading : prevState.shelves.currentlyReading.filter(
              (book) => book.id !== bookId
            ),
            wantToRead : prevState.shelves.wantToRead,
            read : prevState.shelves.read
        }};
      })

    }else if (prevShelf === 'wantToRead') {
      await this.setState((prevState) => {
        return {
          shelves :{
            currentlyReading : prevState.shelves.currentlyReading,
            wantToRead : prevState.shelves.wantToRead.filter(
              (book) => book.id !== bookId
            ),
            read : prevState.shelves.read
        }};
      })
    }else if (prevShelf === 'read') {
      await this.setState((prevState) => {
        return {
          shelves :{
            currentlyReading : prevState.shelves.currentlyReading,
            wantToRead : prevState.shelves.wantToRead,
            read : prevState.shelves.read.filter(
              (book) => book.id !== bookId
            )
        }};
      })
    }
  }

  updateAllBooks = async (shelf,bookId) => {
    await this.setState((prevState) => {
      const newAllBooks = prevState.allBooks.map((book) => {
        if (book.id === bookId) {
          book.shelf = shelf
        }
        return book;
      })
      return {
        allBooks : newAllBooks
      }
    })
  }

  addToAllBooks = async (newBook) => {
    await this.setState((prevState) => {
      return {allBooks : prevState.allBooks.concat(newBook)}
    })
  }

  onShelfChange = async (bookId,shelf) => {
    let prevShelf = ''
    let newBook = {}
    await BooksAPI.get(bookId)
    .then(book => {
      prevShelf = book.shelf
      newBook = book
      newBook.shelf = shelf
      BooksAPI.update(book,shelf)
    })
    .then(() => {
      if (prevShelf !== 'none') {
        this.addToShelf(shelf,newBook)
        this.removeFromShelf(prevShelf,bookId)
        this.updateAllBooks(shelf,bookId)
      }
      else {
        this.addToShelf(shelf,newBook)
        this.addToAllBooks(newBook)
      }
    })
  }

  onSearchInputChange = async (searchTerm) => {
    await this.setState({
      searchTerm : searchTerm
    })
    if (searchTerm !== '') {
      await BooksAPI.search(searchTerm).then((books) => {
        if (!books.hasOwnProperty('error')) {
          this.setState({
            results : books,
            error : ''
          })
        }
        else {
          this.setState({
            results : [],
            error : 'No results found, please try another query.'
          })
        }

      })
    }
    else {
      await this.setState({
        results : [],
        error : ''
      })
    }

  }

  async componentDidMount(){
      await BooksAPI.getAll()
      .then((books) =>{
        this.setState({allBooks:books})
        const currentlyReading = []
        const wantToRead = []
        const read = []
        books.map((book) => {
          if ( book.shelf === 'currentlyReading'){
            currentlyReading.push(book)
          }
          else if ( book.shelf === 'wantToRead'){
            wantToRead.push(book)

          }
          else if ( book.shelf === 'read') {
            read.push(book)
          }
          return '';
          })
        this.setState((prevState) => {
          return {shelves :{
            currentlyReading : prevState.shelves.currentlyReading.concat(...currentlyReading),
            wantToRead : prevState.shelves.wantToRead.concat(...wantToRead),
            read : prevState.shelves.read.concat(...read)
          }}
        })
      })
    }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render ={() => (
            <BookList
              shelves = {this.state.shelves}
              onShelfChange = {this.onShelfChange}
            />
          )}
        />
      <Route exact path='/search' render ={() => (
            <SearchComponent
              onSearchInputChange = {this.onSearchInputChange}
              value = {this.state.searchTerm}
              results = {this.state.results}
              error = {this.state.error}
              onShelfChange = {this.onShelfChange}
              allBooks = {this.state.allBooks}
            />
          )}
        />


      </div>
    )
  }
}

export default BooksApp
