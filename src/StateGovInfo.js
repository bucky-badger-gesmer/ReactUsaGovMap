import React from 'react';
import Member from './Member';

export default function StateGovInfo(props) {
    return (
        <div style={{ height: '500px', overflowY: 'scroll' }}>
            <h2>Senators</h2>
            <ul>
                {props.senators.filter(senator => senator.state === props.stateAbb)
                    .sort((a, b) => a.title > b.title ? 1 : -1)
                    .map((senator, i) => <Member key={i} member={senator} mapColor={props.mapColor} />)}
            </ul>
            <h2>Representatives</h2>
            <ul>
                {props.representatives.filter(representative => representative.state === props.stateAbb)
                    .sort((a, b) => a.district - b.district)
                    .map((representative, i) => <Member key={i} member={representative} mapColor={props.mapColor} />)}
            </ul>
        </div>
    );
}