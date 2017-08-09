import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import counter from './reducers';
import './index.css'

const store = createStore(counter);

class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                data: ['alpha', 'beta', 'gamma']
        };
    }

    render() {
        let children = React.Children.map(
                            this.props.children, (child, i) => {
                                return <li className="child">{child} {this.state.data[i]}</li>
                            }
                        );
        return (
            <ul>{ children }</ul>
        );
    }
}

class Child extends React.Component {
    constructor(props) {
        super(props);
        store.dispatch({ type: 'INCREMENT'});
        this.val = store.getState();
    }

    render() {
        return (
            <div>{this.props.name} {this.val}</div>
        );
    }
}

ReactDOM.render(<Parent>
                    <Child name="One"/>
                    <Child name="Two"/>
                    <Child name="Three"/>
                </Parent>, document.getElementById('root'));