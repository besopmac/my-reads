import React from 'react';
import { Link } from 'react-router-dom';
import Shelf from './BookShelf';

class ListBooks extends React.Component {
    state = {
        bookShelves: [
            { id: 'currentlyReading', title: 'Currently Reading' },
            { id: 'wantToRead', title: 'Want to Read' },
            { id: 'read', title: 'Read' }
        ]
    };

    // Filtering books
    getBooksByShelfId = shelf => {
        return this.props.books.filter(book => shelf.id === book.shelf);
    };

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>My Reads</h1>
                </div>
            </div>
        );
    }
}

export default ListBooks;