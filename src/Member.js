import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Nav from 'react-bootstrap/Nav';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';


export default function Member(props) {
    const [key, setKey] = useState('home');
    const useStyles = makeStyles({
        root: {
            // minWidth: 275,
            // backgroundColor: 'red'
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
    });

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    console.log('MEMBA', props.member);

    return (
        <Card style={{ marginBottom: '10px', padding: '10px', height: '380px' }}>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >
                <Tab eventKey="home" title="Home">
                    <img src={`https://theunitedstates.io/images/congress/225x275/${props.member.id}.jpg`} />
                    <h3>({props.member.party}) {props.member.first_name} {props.member.last_name}</h3>




                </Tab>
                <Tab eventKey="profile" title="Profile">
                </Tab>
                <Tab eventKey="contact" title="Contact">
                </Tab>
            </Tabs>
        </Card>
    );
}