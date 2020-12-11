import React, { useEffect, useState } from 'react';
import USAMap from 'react-usa-map';
import { SketchPicker } from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Popup } from 'semantic-ui-react';
import { Modal, Button } from 'react-bootstrap';
import { states } from './Helper';
import StateGovInfo from './StateGovInfo';
require('./Map.css');

export default function Map() {
    const [mapColor, setMapColor] = useState('#FFD701');
    const [selectedState, setSelectedState] = useState(null);
    const [selectedStateAbbr, setSelectedStateAbbr] = useState(null);
    const [show, setShow] = useState(false);
    // const [selectedStateColor, setSelectedStateColor] = useState('#FFD701');
    // const [statesColorConfig, setStatesColorConfig] = ([]);

    const mapHandler = event => {
        const stateName = states[event.target.dataset.name];
        setSelectedStateAbbr(event.target.dataset.name)
        setSelectedState(stateName);
        setShow(true);
    };

    const handleChangeComplete = color => {
        setMapColor(color.hex);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /* optional customization of filling per state and calling custom callbacks per state */
    const statesCustomConfig = () => {
        // return {
        //     "NJ": {
        //         fill: "navy",
        //     },
        //     "NY": {
        //         fill: "#CC0000"
        //     }
        // };
        return {};
    };

    // const handleSelectedStateColorChange = color => {
    //     setSelectedStateColor(color.hex);
    //     console.log('stuff', selectedState, selectedStateAbbr, selectedStateColor, statesColorConfig);
    //     statesColorConfig.push({
    //         selectedStateAbbr: selectedStateColor
    //     });
    //     setStatesColorConfig(statesColorConfig);
    // };

    const icon = <FontAwesomeIcon style={{ float: 'right', marginRight: '50px' }} icon={faCog} />;
    const colorPicker = <SketchPicker color={mapColor} onChangeComplete={handleChangeComplete} />;
    const popup = <Popup
                    trigger={icon}
                    content={colorPicker}
                    on='click' />;
    
    // const icon1 = <FontAwesomeIcon style={{ float: 'right', marginRight: '50px' }} icon={faCog} />;
    // const colorPicker1 = <SketchPicker color={selectedStateColor} onChangeComplete={handleSelectedStateColorChange} />;
    // const popup1 = <Popup
    //                 style={{ zIndex: 9999999 }}
    //                 trigger={icon1}
    //                 content={colorPicker1}
    //                 on='click' />;
                    
    // console.log('BEFORE RETURN!', statesColorConfig)

    return (
        <div className="app-container">
            <h1>Who Represents You In Congress?{popup}</h1>
            <div className="usa-map">
                <USAMap defaultFill={mapColor} onClick={mapHandler} customize={statesCustomConfig()} />
            </div>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{selectedState}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Button variant="primary" onClick={handleGet}>GET SOME DATA!</Button> */}
                    {/* {popup1} */}
                    <StateGovInfo stateAbb={selectedStateAbbr} mapColor={mapColor} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
