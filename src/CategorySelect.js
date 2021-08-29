import React from 'react'

class CategorySelect extends React.Component {
  state = {
    value : ''
  }
  onShelfChange = (e) => {
    this.props.onShelfChange(e.target.id, e.target.value)
    this.setState({
      value : ''
    })
  }

  render(){
    return (
      <div className="book-shelf-changer">
        <select value = {this.state.value} id = {this.props.id} onChange = {this.onShelfChange}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default CategorySelect
