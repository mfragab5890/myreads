import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'
import SearchComponent from './SearchComponent'
import {Route} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    shelves : {
      currentlyReading : [],
      wantToRead : [],
      read : []
    },
    searchTerm : '',
    results : []

  }

  onShelfChange = (bookId,shelf) => {
    let prevShelf = ''
    let newBook = {}
    BooksAPI.get(bookId)
    .then(book => {
      newBook = book
      newBook.shelf = shelf
      prevShelf = book.shelf
      console.log(prevShelf);
      BooksAPI.update(book,shelf)
    })
    .then(() => {
      if (prevShelf !== 'none') {
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
          this.setState((prevState) => {
            return {
              shelves :{
                currentlyReading : prevState.shelves.currentlyReading,
                wantToRead : prevState.shelves.wantToRead.concat(newBook),
                read : prevState.shelves.read
            }};
          })
        }else if (shelf === 'read') {
          this.setState((prevState) => {
            return {
              shelves :{
                currentlyReading : prevState.shelves.currentlyReading,
                wantToRead : prevState.shelves.wantToRead,
                read : prevState.shelves.read.concat(newBook)
            }};
          })
        }

        if (prevShelf === 'currentlyReading') {
          this.setState((prevState) => {
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
          this.setState((prevState) => {
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
          this.setState((prevState) => {
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
      console.log(bookId, shelf, prevShelf);
    })
  }

  onSearchInputChange = async (searchTerm) => {
    await this.setState({
      searchTerm : searchTerm
    })
    if (searchTerm !== '') {
      BooksAPI.search(searchTerm).then((books) => {
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
      this.setState({
        results : [],
        error : ''
      })
    }

  }

  componentDidMount(){
      BooksAPI.getAll()
      .then((books) =>{
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
            />
          )}
        />


      </div>
    )
  }
}

export default BooksApp
