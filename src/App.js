import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchBooks from './Search';
import ListBooks from './ListBook';
import './App.css';

class BooksApp extends Component {
  state = {
    books: [],
    showSearchPage: false
  }

  // Initialize
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  // Render
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() =>
          <ListBooks books={this.state.books} />
        }/>
      </div>
    )
  }
}

export default BooksApp
