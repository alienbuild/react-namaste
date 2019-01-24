import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
    getStyle = () => {
        return{
            background: 'f4f4f4',
            padding: '10px',
            borderBottom: '1px solid #ccc',
            textDecoration: this.props.todo.completed ? 'line-through' : 'none'
        }
    };

    render() {
        const { id, title } = this.props.todo;
        return (
            <div style={this.getStyle()}>
                <p>
                    <input type="checkbox" onChange={this.props.markComplete.bind(this, id)}/>
                    {title}
                    <button onClick={this.props.delTodo.bind(this, id)} style={btnStyle}>X</button>
                </p>
            </div>
        );
    }
}

// PropTypes
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired
};

const btnStyle = {
    background: '#ff0000',
    color: '#fff',
    border: 'none',
    height: '20px',
    width: '20px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
};

export default TodoItem;