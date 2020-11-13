import React from 'react';
import USAMap from 'react-usa-map';
import { SketchPicker } from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { states } from './Helper';
require('./Map.css');

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapColor: '#FFD701',
        };
    }

    mapHandler = (event) => {
        let foo = states[event.target.dataset.name];
        console.log('foo', foo)
        alert(event.target.dataset.name, foo);
    };

    handleChangeComplete(color) {
        this.setState({ mapColor: color.hex });
    }

    render() {
        console.log('map render', this.state)
        return (
            <div>
                <h1>USA!  <FontAwesomeIcon icon={faCog} /></h1>
                <div className="usa-map">
                    <USAMap defaultFill={this.state.mapColor} onClick={this.mapHandler} />
                </div>
                <SketchPicker color={this.state.mapColor} onChangeComplete={this.handleChangeComplete.bind(this)} />
            </div>
        );
    }
}




