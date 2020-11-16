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

    const handleGet = () => {
        console.log('handle get', selectedStateAbbr, selectedState)
        fetch('https://api.propublica.org/congress/v1/116/House/members.json', {
            headers: {
                'x-api-key': 'jGxfPjMYvOkeKZX2YlPvaK4FctW2Vzj1Makj66vR'
            }
        }).then(resp => resp.json())
        .then(resp => {
            let reps = [];
            resp.results[0].members.forEach(member => {
                if (member.state === selectedStateAbbr) {
                    reps.push(member);
                }
            });

            // sorts them by ascending districts:
            reps = reps.sort((a, b) => a.district - b.district);

            console.log('reps', reps)
        });
    };

    /* optional customization of filling per state and calling custom callbacks per state */
    const statesCustomConfig = () => {
        return {
            "NJ": {
                fill: "navy",
                clickHandler: (event) => console.log('Custom handler for NJ', event.target.dataset)
            },
            "NY": {
                fill: "#CC0000"
            }
        };
    };

    const icon = <FontAwesomeIcon style={{ float: 'right', marginRight: '50px' }} icon={faCog} />;
    const colorPicker = <SketchPicker color={mapColor} onChangeComplete={handleChangeComplete} />;
    const popup = <Popup
                    trigger={icon}
                    content={colorPicker}
                    on='click' />;

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
                    <StateGovInfo stateAbb={selectedStateAbbr} />
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
