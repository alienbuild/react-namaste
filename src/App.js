import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';
import Todos from './components/tasks/Todos';
import AddTodo from './components/tasks/AddTodo';
import Header from './components/layout/Header';
import About from './components/pages/About';
import Greeting from './components/pages/Greeting';

import './App.css';

class App extends Component {
   state = {
       todos: []
   };

   componentDidMount() {
     axios.get('https://jsonplaceholder.typicode.com/todos?_limit=3')
     .then(res => this.setState({ todos: res.data }))
     .catch(err => console.log(err));
   };

    // Toggle task complete
    markComplete = (id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo;
            })
        });
    };

    // Delete task
    delTodo = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(res => this.setState({
            todos: [...this.state.todos.filter(todo => todo.id !== id)]
        }));
    };

    // Add Task
    addTask = (title) => {
        axios.post('https://jsonplaceholder.typicode.com/todos', {
            title,
            completed: false
        })
        .then(res => this.setState({
            todos: [...this.state.todos, res.data]
        }));

    };

  render() {
    return (
        <Router>
          <div className="App">
              <div className="container">
                  <Route exact path="/" component={Greeting}/>
                  <Route path="/tasks" render={ props => (
                      <React.Fragment>
                          <Header />
                          <ul className="task-list">
                              <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
                          </ul>
                      </React.Fragment>
                  )}  />
                  <Route path="/about" component={About} />
                  <Route path="/create-task" render={ props => (
                      <AddTodo addTodo={this.addTask} />
                  )}/>
              </div>
          </div>
        </Router>
    );
  }
}

export default App;
