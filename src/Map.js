import React from 'react';
import USAMap from 'react-usa-map';

require('./Map.css');

export default class Map extends React.Component {
    mapHandler = (event) => {
        alert(event.target.dataset.name);
    };

    render() {
        return (
            <div>
                <h1>USA!</h1>
                <div className="usa-map">
                    <USAMap defaultFill={'gold'} onClick={this.mapHandler} />
                </div>
            </div>
        );
    }
}




