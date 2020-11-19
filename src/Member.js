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

    return (
        <Card>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >
                <Tab eventKey="home" title="Home">
                {/* <Sonnet /> */}
                    <img src={`https://theunitedstates.io/images/congress/225x275/${props.member.id}.jpg`} />
                    <h2>({props.member.party}) {props.member.first_name} {props.member.last_name}</h2>
                </Tab>
                <Tab eventKey="profile" title="Profile">
                {/* <Sonnet /> */}
                </Tab>
                <Tab eventKey="contact" title="Contact">
                {/* <Sonnet /> */}
                </Tab>
                <img src="https://theunitedstates.io/images/congress/225x275/G000552.jpg" />
            </Tabs>
        </Card>


        // <Card>
        //     <Card.Header>
        //         <Nav variant="tabs" defaultActiveKey="#first">
        //         <Nav.Item>
        //             <Nav.Link href="#first">Active</Nav.Link>
        //         </Nav.Item>
        //         <Nav.Item>
        //             <Nav.Link href="#link">Link</Nav.Link>
        //         </Nav.Item>
        //         <Nav.Item>
        //             <Nav.Link href="#disabled" disabled>
        //             Disabled
        //             </Nav.Link>
        //         </Nav.Item>
        //         </Nav>
        //     </Card.Header>
        //     <Card.Body>
        //         <Card.Title>Special title treatment</Card.Title>
        //         <Card.Text>
        //         With supporting text below as a natural lead-in to additional content.
        //         </Card.Text>
        //         <Button variant="primary">Go somewhere</Button>
        //     </Card.Body>
        // </Card>

        // <Card className={classes.root}>
        //     <CardContent>
        //         <Typography className={classes.title} color="textSecondary" gutterBottom>
        //             Word of the Day
        //         </Typography>
        //         <Typography variant="h5" component="h2">
        //             be{bull}nev{bull}o{bull}lent
        //         </Typography>
        //         <Typography className={classes.pos} color="textSecondary">
        //             adjective
        //         </Typography>
        //         <Typography variant="body2" component="p">
        //             well meaning and kindly.
        //             <br />
        //             {'"a benevolent smile"'}
        //         </Typography>
        //     </CardContent>
        //     <CardActions>
        //         <Button size="small">Learn More</Button>
        //     </CardActions>
        // </Card>
    );
}