import React, { useEffect, useState } from 'react';
import Member from './Member';

export default function StateGovInfo(props) {
    const [representatives, setRepresentatives] = useState(null);
    const [senators, setSenators] = useState(null);

    useEffect(() => {
        // Senators:
        fetch('https://api.propublica.org/congress/v1/116/Senate/members.json', {
            headers: {
                'x-api-key': 'jGxfPjMYvOkeKZX2YlPvaK4FctW2Vzj1Makj66vR'
            }
        }).then(resp => resp.json())
        .then(resp => {
            let senators = [];
            senators = resp.results[0].members.filter(member => member.state === props.stateAbb);
            senators = senators.sort((a, b) => a.title > b.title ? 1 : -1);

            console.log('senators', senators)
            setSenators(senators);
        });

        // Representatives:
        fetch('https://api.propublica.org/congress/v1/116/House/members.json', {
            headers: {
                'x-api-key': 'jGxfPjMYvOkeKZX2YlPvaK4FctW2Vzj1Makj66vR'
            }
        }).then(resp => resp.json())
        .then(resp => {
            let reps = [];
            resp.results[0].members.forEach(member => {
                if (member.state === props.stateAbb) {
                    reps.push(member);
                }
            });

            // sorts them by ascending districts:
            reps = reps.sort((a, b) => a.district - b.district);
            console.log('reps', reps);

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