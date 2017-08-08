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
                data: [1,2,3]
        };
        console.log('before ', this.props.value);
        store.dispatch({ type: 'INCREMENT' });
        console.log('after ', store.getState());
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

ReactDOM.render(<Parent value={store.getState()}>
                    <span>One</span>
                    <span>Two</span>
                    <span>Three</span>
                </Parent>, document.getElementById('root'));