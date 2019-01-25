import React from 'react';
import Header from "../../App";
import Todos from '../../components/tasks/Todos';
import AddTodo from '../../components/tasks/AddTodo';
import About from "./About";
import {Route} from "react-router-dom";


function Tasks() {

    return(

        <React.Fragment>
            <Route path="/about" component={About} />
            <Header />
            <ul className="task-list">
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
            </ul>
            <AddTodo addTodo={this.addTask} />
        </React.Fragment>
    )
}

export default Tasks;