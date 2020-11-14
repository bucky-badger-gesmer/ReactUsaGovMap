import React, { useEffect, useState } from 'react';
import USAMap from 'react-usa-map';
import { SketchPicker } from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Popup } from 'semantic-ui-react';
import { states } from './Helper';
require('./Map.css');

export default function Map() {
    const [mapColor, setMapColor] = useState('#FFD701');

    const mapHandler = event => {
        let foo = states[event.target.dataset.name];
        console.log('foo', foo)
        alert(event.target.dataset.name, foo);
    };

    const handleChangeComplete = color => {
        setMapColor(color.hex);
    }

    const icon = <FontAwesomeIcon style={{ float: 'right', marginRight: '50px' }} icon={faCog} />;
    const colorPicker = <SketchPicker color={mapColor} onChangeComplete={handleChangeComplete} />;
    const popup = <Popup
                    trigger={icon}
                    content={colorPicker}
                    on='click' />;

    return (
        <div>
            <h1>USA!{popup}</h1>
            <div className="usa-map">
                <USAMap defaultFill={mapColor} onClick={mapHandler} />
            </div>
        </div>
    );
}
