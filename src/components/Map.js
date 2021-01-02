import { Button, Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popup } from 'semantic-ui-react';
import { SketchPicker } from 'react-color';
import StateGovInfo from './StateGovInfo';
import USAMap from 'react-usa-map';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { states } from '../Helper';

require('../css/Map.css');

export default function Map(props) {
    const mapColor = useSelector((state) => state.color);
    const dispatch = useDispatch();

    const [selectedState, setSelectedState] = useState(null);
    const [selectedStateAbbr, setSelectedStateAbbr] = useState(null);
    const [show, setShow] = useState(false);
    const [selectedStateColor, setSelectedStateColor] = useState('#FFD701');
    const [statesColorConfig, setStatesColorConfig] = ([]);

    const mapHandler = event => {
        const stateName = states[event.target.dataset.name];
        setSelectedStateAbbr(event.target.dataset.name)
        setSelectedState(stateName);
        setShow(true);
    };

    const handleChangeComplete = color => {
        dispatch({
            type: 'CHANGE_COLOR',
            payload: {
                color: color.hex
            }
        });
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const handleSelectedStateColorChange = color => {
    //     setSelectedStateColor(color.hex);
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
    // <FontAwesomeIcon style={{ float: 'left' }} icon={faInfoCircle} />

    // const onStateSelect = (total) => {
    //     console.log('ON STATE SELECT', total)
    // };

    return (
        <div className="app-container">
            <h1>Who <em>Is</em> Our Congress? {popup}</h1>
            <div className="usa-map">
                <USAMap defaultFill={mapColor} onClick={mapHandler} />
            </div>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton style={{ backgroundColor: mapColor }}>
                    <Modal.Title style={{ color: 'white' }}>{selectedState && selectedState.toUpperCase()}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StateGovInfo stateAbb={selectedStateAbbr} 
                        mapColor={mapColor}
                        senators={props.senators}
                        representatives={props.representatives}
                        // onStateSelect={onStateSelect} 
                        />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: mapColor }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
