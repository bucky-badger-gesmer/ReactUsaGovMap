import React from 'react';
import USAMap from 'react-usa-map';
import { SketchPicker } from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Popup } from 'semantic-ui-react';
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
        let icon = <FontAwesomeIcon style={{ float: 'right', marginRight: '50px' }} icon={faCog} />;
        let colorPicker = <SketchPicker color={this.state.mapColor} onChangeComplete={this.handleChangeComplete.bind(this)} />;
        let popup = <Popup
                        trigger={icon}
                        content={colorPicker}
                        on='click' />;

        return (
            <div>
                <h1>USA!{popup}</h1>
                <div className="usa-map">
                    <USAMap defaultFill={this.state.mapColor} onClick={this.mapHandler} />
                </div>
            </div>
        );
    }
}




