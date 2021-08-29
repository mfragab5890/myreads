import React from 'react'
import CategorySelect from './CategorySelect'
class BookItem extends React.Component {
  render(){
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.url})` }}></div>
              <CategorySelect/>
            </div>
            <div className="book-title">{this.props.title}</div>
            <div className="book-authors">{this.props.authors.join(', ')}</div>
          </div>
      </li>
    );
  }
}

export default BookItem
