import React, {Component} from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import TodoItem from "./TodoItem";

import Header from '../layout/Header';

class AddTodo extends Component {

    state = {
        title: ''
    };

    onChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({
            title: ''
        });
        this.props.history.push('tasks');

    };

    render() {
        return (
            <React.Fragment>
                <Header />

                <form onSubmit={this.onSubmit}>
                    <textarea
                        name="title"
                        placeholder="Add task"
                        value={this.state.title}
                        onChange={this.onChange}
                        className="textarea-large"
                    />

                    <nav className="controls two-step">
                        <ul>
                            <li><Link to="/"><button>Cancel</button></Link></li>
                            <li><button type="submit">Done</button></li>
                        </ul>
                    </nav>
                </form>
            </React.Fragment>
        );
    }
}

// PropTypes
TodoItem.propTypes = {
    addTodo: PropTypes.func.isRequired
};

export default withRouter(AddTodo);
