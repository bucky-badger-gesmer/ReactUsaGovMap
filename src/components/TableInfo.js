import { Button, Modal } from 'react-bootstrap';
import { getMemberAge, getMemberParty, states } from '../Helper';

import { DataGrid, } from '@material-ui/data-grid';
import Member from './Member';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function TableInfo(props) {
    const color = useSelector((state) => state.color);
    const [show, setShow] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

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
            '& .nextElection': {
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

    const handleClose = () => {
        setShow(false);
        setSelectedMember(null);
    };

    const onRowClick = (RowParams) => {
        setSelectedMember(RowParams.row.member);
        setShow(true);
    };

    const columns = [
        { field: 'firstName', headerClassName: 'firstName', headerAlign: 'center', headerName: 'First Name', width: 150 },
        { field: 'lastName', headerClassName: 'lastName', headerAlign: 'center', headerName: 'Last Name', width: 150 },
        { field: 'state', headerClassName: 'state', headerAlign: 'center', headerName: 'State', width: 180 },
        { field: 'age', headerClassName: 'age', headerAlign: 'center', headerName: 'Age', type: 'number', width: 110 },
        { field: 'seniority', headerClassName: 'seniority', headerAlign: 'center', headerName: 'Seniority', type: 'number', width: 110 },
        { field: 'title', headerClassName: 'title', headerAlign: 'center', headerName: 'Title', width: 160 },
        { field: 'party', headerClassName: 'party', headerAlign: 'center', headerName: 'Party', width: 120 },
        { field: 'nextElection', headerClassName: 'nextElection', headerAlign: 'center', headerName: 'Next Election', width: 100 },
        { field: 'totalVotes', headerClassName: 'totalVotes', headerAlign: 'center', headerName: 'Total Votes', type: 'number', width: 100 },
        { field: 'missedVotes', headerClassName: 'missedVotes', headerAlign: 'center', headerName: 'Missed Votes', type: 'number', width: 100 },
        { field: 'totalPresent', headerClassName: 'totalPresent', headerAlign: 'center', headerName: 'Total Present', type: 'number', width: 100 }
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
                nextElection: member.next_election,
                totalVotes: member.total_votes,
                missedVotes: member.missed_votes,
                totalPresent: member.total_present,
                member: member
            };
        });
    }

    let selectedMemberDisplay = null;
    if (selectedMember) {
        selectedMemberDisplay = selectedMember.gender === 'M'
        ? `Congressman ${selectedMember.first_name} ${selectedMember.middle_name === null ? '' : selectedMember.middle_name} ${selectedMember.last_name}`
        : `Congresswoman ${selectedMember.first_name} ${selectedMember.middle_name === null ? '' : selectedMember.middle_name} ${selectedMember.last_name}`;
    }

    return (
        <div style={{ height: 400, width: '95%', margin: 'auto', marginTop: '50px' }} className={classes.root}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10, 20, 50, 100]}
                onRowClick={onRowClick}
                disableSelectionOnClick={true} />
            
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton style={{ backgroundColor: color }}>
                    <Modal.Title style={{ color: 'white' }}>
                        {selectedMemberDisplay}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedMember && <Member member={selectedMember} mapColor={color} />}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: color }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}