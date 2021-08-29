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

  }

  onShelfChange = (book,shelf) => {

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
            <SearchComponent/>
          )}
        />


      </div>
    )
  }
}

export default BooksApp
