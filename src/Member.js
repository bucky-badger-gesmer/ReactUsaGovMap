import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faTumblr, faYoutube, faLinkedin, faGooglePlus } from "@fortawesome/free-brands-svg-icons";
import { districtGenerator } from './Helper';
import './css/Member.css';


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
        <div className="card">
            <div className="card-header">
                <div className="image-cropper">
                    <img src={`https://theunitedstates.io/images/congress/225x275/${props.member.id}.jpg`} alt="Profile Image" className="profile-img" />
                </div>
            </div>
            <div className="card-body">
                <p className="full-name">({props.member.party}) {props.member.first_name} {props.member.last_name}</p>
                <p className="username">{`@${props.member.twitter_account}`}</p>
                <p className="city">{props.member.senate_class ? props.member.title : `${districtGenerator(props.member.district)} District`}</p>
                <p className="desc">Full stack developer, avid reader, love to take a long walk, swim.</p>
                <p>
                    <a href="#" className="social-icon facebook"><FontAwesomeIcon icon={faFacebook} /></a>
                    <a href="#" className="social-icon twitter"><FontAwesomeIcon icon={faTwitter} /></a>
                    <a href="#" className="social-icon tumblr"><FontAwesomeIcon icon={faTumblr} /></a>
                    <a href="#" className="social-icon youtube"><FontAwesomeIcon icon={faYoutube} /></a>
                    <a href="#" className="social-icon linkedin"><FontAwesomeIcon icon={faLinkedin} /></a>
                    <a href="#" className="social-icon google-plus"><FontAwesomeIcon icon={faGooglePlus} /></a>
                </p>
            </div>
            <div className="card-footer">
                <div className="col vr">
                    <p><span className="count">1.8K</span> Followers</p>
                </div>
                <div className="col">
                    <p><span className="count">2.0K</span> Following</p>
                </div>
            </div>
        </div>
    );
}