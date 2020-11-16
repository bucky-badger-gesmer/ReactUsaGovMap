import React, { useEffect, useState } from 'react';

export default function StateGovInfo(props) {
    console.log('props', props)
    const [foo, setFoo] = useState([]);

    useEffect(() => {
        console.log('STATE USE EFFECT!')
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
            console.log('reps', reps)

            setFoo(reps);
        });
    }, []);
    
    return (
        <div>
            {props.stateAbb}
            {foo}
        </div>
    );
}