import { getMemberAge, getMemberParty, states } from '../Helper';

import { DataGrid, } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

require('../css/TableInfo.css');

export default function TableInfo(props) {
    const color = useSelector((state) => state.color);
    const useStyles = makeStyles({
        root: {
            '& .firstName': {
                backgroundColor: color,
            },
            '& .lastName': {
                backgroundColor: color
            },
            '& .state': {
                backgroundColor: color
            },
            '& .age': {
                backgroundColor: color
            },
            '& .seniority': {
                backgroundColor: color
            },
            '& .title': {
                backgroundColor: color
            },
            '& .party': {
                backgroundColor: color
            },
            '& .totalVotes': {
                backgroundColor: color
            },
            '& .missedVotes': {
                backgroundColor: color
            },
            '& .totalPresent': {
                backgroundColor: color
            }
        },
    });

    const classes = useStyles();

    const columns = [
        { field: 'firstName', headerClassName: 'firstName', headerAlign: 'center', headerName: 'First Name', width: 150 },
        { field: 'lastName', headerClassName: 'lastName', headerAlign: 'center', headerName: 'Last Name', width: 150 },
        { field: 'state', headerClassName: 'state', headerAlign: 'center', headerName: 'State', width: 180 },
        { field: 'age', headerClassName: 'age', headerAlign: 'center', headerName: 'Age', type: 'number', width: 110 },
        { field: 'seniority', headerClassName: 'seniority', headerAlign: 'center', headerName: 'Seniority', type: 'number', width: 110 },
        { field: 'title', headerClassName: 'title', headerAlign: 'center', headerName: 'Title', width: 160 },
        { field: 'party', headerClassName: 'party', headerAlign: 'center', headerName: 'Party', width: 120 },
        { field: 'totalVotes', headerClassName: 'totalVotes', headerAlign: 'center', headerName: 'Total Votes', type: 'number', width: 130 },
        { field: 'missedVotes', headerClassName: 'missedVotes', headerAlign: 'center', headerName: 'Missed Votes', type: 'number', width: 130 },
        { field: 'totalPresent', headerClassName: 'totalPresent', headerAlign: 'center', headerName: 'Total Present', type: 'number', width: 130 }
    ];

    let members = null;
    if (props.senators && props.representatives) {
        members = props.senators.concat(props.representatives).sort((a, b) => (a.last_name > b.last_name) ? 1 : -1)
    }

    let rows = [];
    if (members) {
        rows = members.map(member => {    
            return {
                id: member.id,
                firstName: member.first_name,
                lastName: member.last_name,
                state: states[member.state],
                age: getMemberAge(member.date_of_birth),
                seniority: member.seniority,
                title: member.title,
                party: getMemberParty(member.party),
                totalVotes: member.total_votes,
                missedVotes: member.missed_votes,
                totalPresent: member.total_present,
                member: member
            };
        });

    
        console.log('rows', rows)
    }

    return (
        <div style={{ height: 400, width: '95%', margin: 'auto', marginTop: '50px' }} className={classes.root}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10, 20, 50, 100]}
                onRowClick={(RowParams) => console.log('RowParams', RowParams)}
                disableSelectionOnClick={true} />
        </div>
    );
}