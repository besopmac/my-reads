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
    getBooksByFilterShelf = shelf => {
        return this.props.books.filter(book => shelf.id === book.shelf);
    };
    // Rendering
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>My Reads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {this.state.bookShelves.map(shelf =>
                            <Shelf
                                key={ shelf.id }
                                shelf={ shelf }
                                books={ this.getBooksByFilterShelf(shelf) }
                                updateBook={ this.props.updateBook }
                            />
                        )}
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add book</Link>
                </div>
            </div>
        );
    }
}

export default ListBooks;