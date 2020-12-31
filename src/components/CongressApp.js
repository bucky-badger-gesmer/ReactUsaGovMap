import React, { useEffect, useState } from 'react';
import { getRepresentatives, getSenators } from '../Helper';

import Map from './Map';
import TableInfo from './TableInfo';

export default function CongressApp() {
    const [representatives, setRepresentatives] = useState(null);
    const [senators, setSenators] = useState(null);

    useEffect(() => {
        // get senators
        getSenators().then(resp => {
            const senators = resp.results[0].members.filter(member => member.in_office);
            setSenators(senators);
        });

        // get representatives
        getRepresentatives().then(resp => {
            const representatives = resp.results[0].members.filter(member => member.in_office);
            setRepresentatives(representatives);
        });
    }, []);

    return (
        <div>
            <Map senators={senators} representatives={representatives} />
            <TableInfo senators={senators} representatives={representatives} />
        </div>
    );
}