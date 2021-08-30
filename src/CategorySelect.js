import React from 'react'

class CategorySelect extends React.Component {
  state = {
    value : 'move'
  }
  onShelfChange = (e) => {
    this.setState({
      value : e.target.value
    })
    this.props.onShelfChange(e.target.id, e.target.value)
  }

  render(){
    return (
      <div className="book-shelf-changer">
        <select
          id = {this.props.id}
          onChange = {this.onShelfChange}
          defaultValue = {this.state.value}
        >
          <option value="move" disabled>`Move to...`</option>
          <option value="currentlyReading">{this.props.shelf === 'currentlyReading'? `✓` : '...'} Currently Reading</option>
          <option value="wantToRead">{this.props.shelf === 'wantToRead'? `✓` : '...'} Want to Read</option>
          <option value="read">{this.props.shelf === 'read'? `✓` : '...'} Read</option>
          <option value="none">{this.props.shelf === 'none'? `✓` : '...'} None</option>
        </select>
      </div>
    );
  }
}

export default CategorySelect
