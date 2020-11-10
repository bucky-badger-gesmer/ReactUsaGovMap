import React from 'react';
import USAMap from 'react-usa-map';

export default class Map extends React.Component {
    mapHandler = (event) => {
        alert(event.target.dataset.name);
    };

    render() {
        return (
            <USAMap defaultFill={'gold'} onClick={this.mapHandler} />
        );
    }
}




