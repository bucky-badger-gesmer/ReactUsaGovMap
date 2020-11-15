import React, { useEffect, useState } from 'react';
import USAMap from 'react-usa-map';
import { SketchPicker } from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Popup } from 'semantic-ui-react';
import { Modal, Button } from 'react-bootstrap';
import { states } from './Helper';
require('./Map.css');

export default function Map() {
    const [mapColor, setMapColor] = useState('#FFD701');
    const [selectedState, setSelectedState] = useState(null);
    const [show, setShow] = useState(false);

    const mapHandler = event => {
        const stateName = states[event.target.dataset.name];
        setSelectedState(stateName);
        setShow(true);
    };

    const handleChangeComplete = color => {
        setMapColor(color.hex);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{selectedState}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
