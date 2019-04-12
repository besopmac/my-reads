import React, { Component } from 'react';
class Book extends Component {

    handleChange = event => {
        this.props.onShelfChange(this.props.book, event.target.value);
    };

    render() {
        const backgroundImage = this.props.book.imageLinks && this.props.book.imageLinks.thumbnail;
        
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 130, height: 190, backgroundImage: `url(${backgroundImage})` }}/>
                        <div className="book-shelf-changer">
                            <select defaultValue={ this.props.book.shelf } onChange={ this.handleChange }>
                                <option value="choose" disabled>Move to...</option>
                                <option value="currentlyReading" > Currently Reading</option>
                                <option value="wantToRead" > Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none"> None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{ this.props.book.title }</div>
                    <div className="book-authors">{ this.props.book.authors }</div>
                </div>
            </li>
        );
    }
}

export default Book;