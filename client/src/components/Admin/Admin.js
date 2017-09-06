import React, { Component } from 'react';

export default class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }

    increase(e) {
        this.setState({
            count: this.state.count + 1
        });
    }

    decrease(e) {
        this.setState({
            count: this.state.count - 1
        });
    }
    
    shouldComponentUpdate(nextProps, nextState){
      if (nextState.count < 0){
          return false;
      } else {
          return true;
      }
    }

    render() {
        return (
            <div>
                <h1>{this.state.count}</h1>
                <button onClick={this.increase.bind(this)}>Count Up!!</button>
                <button onClick={this.decrease.bind(this)}>Count Down!!</button>
            </div>
        )
    }
}