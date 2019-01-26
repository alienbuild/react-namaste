import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            left: 0,
            originalOffset: 0,
            velocity: 0,
            timeOfLastDragEvent: 0,
            touchStartX: 0,
            prevTouchX: 0,
            beingTouched: false,
            intervalId: null
        };
    }

    animateSlidingToZero() {
        let {left, velocity, beingTouched} = this.state;
        if (!beingTouched && left < -0.01) {
            velocity += 10 * 0.033;
            left += velocity;
            if (left < -70) {
                window.clearInterval(this.state.intervalId);
                this.handleRemoveSelf();
            }
            this.setState({left, velocity});
        } else if (!beingTouched) {
            left = 0;
            velocity = 0;
            window.clearInterval(this.state.intervalId);
            this.setState({left, velocity, intervalId: null, originalOffset: 0});
        }
    }

    handleRemoveSelf() {
        const id = this.props.todo.id;
        this.props.delTodo(id);
    }

    handleStart(clientX) {
        if (this.state.intervalId !== null) {
            window.clearInterval(this.state.intervalId);
        }
        this.setState({
            originalOffset: this.state.left,
            velocity: 0,
            timeOfLastDragEvent: Date.now(),
            touchStartX: clientX,
            beingTouched: true,
            intervalId: null
        });
    }

    handleMove(clientX) {
        if (this.state.beingTouched) {
            const touchX = clientX;
            const currTime = Date.now();
            const elapsed = currTime - this.state.timeOfLastDragEvent;
            const velocity = 20 * (touchX - this.state.prevTouchX) / elapsed;
            let deltaX = touchX - this.state.touchStartX + this.state.originalOffset;
            if (deltaX < -100) {
                this.handleRemoveSelf();
                deltaX = -100;
                this.setState({
                    left: deltaX,
                    beingTouched: false
                });
            } else if (deltaX > 100) {
                alert('Complete');
                this.setState({
                    left: deltaX,
                    beingTouched: false
                })
            }
            this.setState({
                left: deltaX,
                velocity,
                timeOfLastDragEvent: currTime,
                prevTouchX: touchX
            });
        } else{
            setTimeout(() => {
                this.setState({
                    left: 0
                })
            },1500);
        }
    }

    handleEnd() {
        this.setState({
            velocity: this.state.velocity,
            touchStartX: 0,
            beingTouched: false,
            intervalId: this.animateSlidingToZero.bind(this)
        });
    }

    handleTouchStart(touchStartEvent) {
        touchStartEvent.preventDefault();
        this.handleMotionStart(touchStartEvent.targetTouches[0].clientX);
    }

    handleTouchMove(touchMoveEvent) {
        this.handleMove(touchMoveEvent.targetTouches[0].clientX);
    }

    handleTouchEnd() {
        this.handleEnd();
    }

    handleMouseDown(mouseDownEvent) {
        mouseDownEvent.preventDefault();
        this.handleStart(mouseDownEvent.clientX);
    }

    handleMouseMove(mouseMoveEvent) {
        this.handleMove(mouseMoveEvent.clientX);
    }

    handleMouseUp() {
        this.handleEnd();
    }

    handleMouseLeave() {
        this.handleMouseUp();
    }

    render() {
        const { id, title } = this.props.todo;
        return (
            <li className="task"

                onTouchStart={touchStartEvent => this.handleTouchStart(touchStartEvent)}
                onTouchMove={touchMoveEvent => this.handleTouchMove(touchMoveEvent)}
                onTouchEnd={() => this.handleTouchEnd()}
                // The following event handlers are for mouse compatibility:
                onMouseDown={mouseDownEvent => this.handleMouseDown(mouseDownEvent)}
                onMouseMove={mouseMoveEvent => this.handleMouseMove(mouseMoveEvent)}
                onMouseUp={() => this.handleMouseUp()}
                onMouseLeave={() => this.handleMouseLeave()}
            >
                <div className="taskwrapper" style={{left: this.state.left + 'px'}}>
                    <div className="left"></div>
                    <div className="middle">
                        <span className="task-desc">{title}</span>
                        <span className="task-time">8am</span>
                    </div>
                    <div className="right"></div>

                    <p>
                        <input type="checkbox" onChange={this.props.markComplete.bind(this, id)}/>
                    </p>
                </div>
            </li>
        );
    }
}

// PropTypes
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
};


export default TodoItem;