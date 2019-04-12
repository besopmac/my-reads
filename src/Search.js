import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './BookDetails';

class SearchBooks extends Component {
    state = {
        query: '',
        resultNum: 20,
        books: []
    };

    updateQuery = (query) => {
        this.setState({ query: query });
        this.searchBooks(query);
    };

    searchBooks = (query) => {
        if (query === '') {
            this.setState({ books: [] });
        } else {
            BooksAPI.search(query, this.resultNum).then(books => {
                if (Array.isArray(books)) {
                    this.checkShelvesOfBooks(books, this.props.books);
                }
            });
        }
    };

    checkShelvesOfBooks = (searchBooks, currentBooks) => {
        const shelvedBooks = searchBooks.map(searchBook => {
            const currentBook = currentBooks.filter(
                Book => Book.id === searchBook.id
            )[0];
            if (currentBook) {
                searchBook.shelf = currentBook.shelf;

            } else {
                searchBook.shelf = 'none';
            }
            return searchBook;
        });
        this.setState({ books: shelvedBooks });
    };

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={ this.state.query } onChange = { event => this.updateQuery(event.target.value) }/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books.map(book =>
                            <Book key={ book.id } book={ book } onShelfChange={ this.props.updateBook } />
                        )}
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchBooks;