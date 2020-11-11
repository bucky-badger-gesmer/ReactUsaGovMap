import React from 'react';
import USAMap from 'react-usa-map';
import { states } from './Helper';

require('./Map.css');

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapColor: 'gold'
        };
    }


    mapHandler = (event) => {
        let foo = states[event.target.dataset.name];
        console.log('foo', foo)
        alert(event.target.dataset.name, foo);
    };

    render() {
        return (
            <div>
                <h1>USA!</h1>
                <div className="usa-map">
                    <USAMap defaultFill={this.state.mapColor} onClick={this.mapHandler} />
                </div>
            </div>
        );
    }
}




