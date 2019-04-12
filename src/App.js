import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchBooks from './Search';
import ListBooks from './BookList';
import './App.css';

class BooksApp extends Component {
  state = {
    books: [],
    showSearchPage: false
  }

  // initialize
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  // update books
  updateBook = (book, shelf) => {
    this.setState(previousState => {
      if (shelf === 'none') {
        return {
          books: previousState.books.filter(currentBook => currentBook.id !== book.id)
        };
      }
      return {
        books: previousState.books.map(currentBook => {
          if (currentBook.id === book.id) {
            currentBook.shelf = shelf;
          }
          return currentBook;
        })
      };
    });
  };

  // adding new book
  addBook = (book, shelf) => {
    this.setState(previousState => {
      book.shelf = shelf;
      previousState.books.push(book);
      return {
        books: previousState.books
      };
    });
  };

  // checking if book is new
  checkIsNewBook = book => {
    const shelfBooks = this.state.books.filter(
      shelfBook => shelfBook.id === book.id
    );

    return shelfBooks.length === 0;
  };

  changeShelfOfBook = (book, shelf) => {
    if (this.checkIsNewBook(book)) {
      this.addBook(book, shelf);
    } else {
      this.updateBook(book, shelf);
    }

    BooksAPI.update(book, shelf);
  };

  // update search
  updateSearchStatus = showSearchPage => {
    this.setState({ showSearchPage: true });
  }

  // Render
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() =>
          <ListBooks books={this.state.books} updateBook={this.changeShelfOfBook} />
        }/>

        <Route path="/search" render={() =>
          <SearchBooks books={this.state.books} updateBook={this.changeShelfOfBook} showSearchPage={this.updateSearchStatus} />
        }/>
      </div>
    )
  }
}

export default BooksApp
