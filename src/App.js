import React, { Component } from 'react';
import List from './List';
import TodoForm from './TodoForm';
import Footer from './Footer';
import Clock from './Clock';
import Market from './Market';

class App extends Component {
  state = { 
    todos: [], 
    filter: 'All', 
    showClock: false, 
    showMarket: false,
  }

  toggleShowMarket = () => {
    this.setState( state => {
      return { showMarket: !state.showMarket }
    });
  }

  toggleShowClock = () => {
    this.setState( state => {
      return { showClock: !state.showClock }
    });
  }

  setFilter = (filter) => {
    this.setState({ filter })
  }

  visibleItems = () => {
    const { todos, filter } = this.state;
    switch(filter) {
      case 'Active':
        return todos.filter( t => !t.complete )
      case 'Complete':
        return todos.filter( t => t.complete )
      default:
        return todos
    }
  }

  handleClick = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.map( todo => {
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete
          }
        }

        return todo
      })
    })
  }

  byName = (x,y) => {
    if (x.name > y.name)
      return 1 
    if (x.name < y.name)
      return -1
    return 0
  }

  getId = () => {
    //NOTE We are just using this as a helper function for id's since we aren't using a db yet
   return Math.floor((1 + Math.random()) * 0x10000)
     .toString(16)
     .substring(1);
  }

  addTodo = (name) => {
    const { todos } = this.state;
    const todo = { name, id: this.getId(), complete: false }
    this.setState({ todos: [todo, ...todos] })
  }

  render() {
    const { filter, showClock, showMarket } = this.state;
    return (
      <div>
        { showClock && <Clock /> }
        <button
          onClick={this.toggleShowClock}
        >
          Toggle Clock
        </button>
        { showMarket && <Market /> }
        <button
          onClick={this.toggleShowMarket}
        >
          Toggle Market
        </button>
        <TodoForm addItem={this.addTodo}/>
        <List 
          todoClick={this.handleClick}
          items={this.visibleItems()} 
        />
        <Footer 
          filter={filter} 
          setFilter={this.setFilter}
        />
      </div>
    );
  }
}

export default App;
