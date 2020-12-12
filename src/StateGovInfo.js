import React, { useEffect, useState } from 'react';
import Member from './Member';
import { getSenators, getRepresentatives } from './Helper';

export default function StateGovInfo(props) {
    const [representatives, setRepresentatives] = useState(null);
    const [senators, setSenators] = useState(null);

    useEffect(() => {
        // Senators:
        getSenators().then(resp => {
            let senators = [];
            senators = resp.results[0].members.filter(member => member.state === props.stateAbb);
            senators = senators.sort((a, b) => a.title > b.title ? 1 : -1);
            setSenators(senators);
        });

        // Representatives:
        getRepresentatives().then(resp => {
            let reps = [];
            reps = resp.results[0].members.filter(member => member.state === props.stateAbb);
            reps = reps.sort((a, b) => a.district - b.district); // sorts them by ascending districts:
            setRepresentatives(reps);
        });
    }, []);

    return (
        <div style={{ height: '500px', overflowY: 'scroll' }}>
            <h2>Senators</h2>
            {senators && 
                <ul>
                    {senators.filter(sen => sen.in_office).map((sen, i) => <Member member={sen} key={i} mapColor={props.mapColor} />)}
                </ul>
            }
            <h2>Representatives</h2>
            {representatives &&
                <ul>
                    {representatives.filter(rep => rep.in_office).map((rep, i) => <Member member={rep} key={i} mapColor={props.mapColor} />)}
                </ul>
            }
        </div>
    );
}