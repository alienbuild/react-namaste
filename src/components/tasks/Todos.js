import React, { Component } from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

class Todos extends Component {

    render() {
        return(
            <React.Fragment>
                {this.props.todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} markComplete={this.props.markComplete} delTodo={this.props.delTodo} />
                ))}
                <Link to="/create-task">
                <button id="new-task-btn"><span role="img">🤔</span> waiting for another task ...</button>
                </Link>
            </React.Fragment>

        );

    }
}

// PropTypes
Todos.propTypes = {
    todos: PropTypes.array.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
};

export default Todos;
