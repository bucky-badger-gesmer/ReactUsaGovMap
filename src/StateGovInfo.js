import React, { useEffect, useState } from 'react';

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

            setRepresentatives(reps);
        });
    }, []);
    
    return (
        <div>
            <h3>Senators</h3>
            {senators && 
                <ul>
                    {senators.map(o => {
                        return <li>{o.first_name}</li>
                    })}
                </ul>
            }
            <h3>Representatives</h3>
            {representatives &&
                <ul>
                    {representatives.map(o => {
                        return <li>{o.first_name}</li>
                    })}
                </ul>
            }
        </div>
    );
}