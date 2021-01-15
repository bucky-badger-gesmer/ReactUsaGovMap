import { Button, Modal } from 'react-bootstrap';
import {
    CURRENT_CONGRESS,
    districtGenerator,
    getMemberAge,
    getMemberParty,
    getSpecificMember,
    getSpecificMemberCosponsoredBills,
    states
} from '../Helper';

import Committee from './Member/Committee';
import CosponsoredBill from './Member/CosponsoredBill';
import { DataGrid, } from '@material-ui/data-grid';
import Member from './Member/Member';
import Subcommittee from './Member/Subcommittee';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function TableInfo(props) {
    const color = useSelector((state) => state.colorReducer.color);
    const [show, setShow] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [committees, setCommittees] = useState(null);
    const [subcommittees, setSubcommittees] = useState(null);
    const [cosponsoredBills, setCosponsoredBills] = useState(null);

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
            },
            '& .MuiDataGrid-row:hover': {
                cursor: 'pointer'
            }
        },
    });

    const classes = useStyles();

    const handleClose = () => {
        setShow(false);
        setSelectedMember(null);
        setCommittees(null);
        setSubcommittees(null);
        setCosponsoredBills(null);
    };

    const onRowClick = (RowParams) => {
        setSelectedMember(RowParams.row.member);
        setShow(true);

        getSpecificMemberCosponsoredBills(RowParams.row.member.id, 'cosponsored')
            .then(resp => {
                const cosponsoredBills = resp.results[0].bills
                    .filter(bill => parseInt(bill.congress) === CURRENT_CONGRESS)
                    .map((bill, i) => {
                        return <CosponsoredBill bill={bill} key={i} />
                    });

                setCosponsoredBills(cosponsoredBills);

                getSpecificMember(RowParams.row.member.id)
                    .then(resp => {
                        const roles = resp.results[0].roles;
                        const currentRole = roles.filter(role => parseInt(role.congress) === CURRENT_CONGRESS)[0];
                        const committees = currentRole.committees.map((committee, i) => {
                            return <Committee committee={committee} key={i} />
                        });

                        const subcommittees = currentRole.subcommittees.map((subcommittee, i) => {
                            return <Subcommittee subcommittee={subcommittee} key={i} />
                        });

                        setCommittees(committees);
                        setSubcommittees(subcommittees);
                    });
            });
    };

    const columns = [
        { field: 'firstName', headerClassName: 'firstName', headerAlign: 'center', headerName: 'First Name', width: 150 },
        { field: 'lastName', headerClassName: 'lastName', headerAlign: 'center', headerName: 'Last Name', width: 150 },
        { field: 'state', headerClassName: 'state', headerAlign: 'center', headerName: 'State', flex: 1 },
        { field: 'age', headerClassName: 'age', headerAlign: 'center', headerName: 'Age', type: 'number', flex: 1 },
        { field: 'seniority', headerClassName: 'seniority', headerAlign: 'center', headerName: 'Seniority', type: 'number', flex: 1 },
        { field: 'title', headerClassName: 'title', headerAlign: 'center', headerName: 'Title', flex: 1 },
        { field: 'party', headerClassName: 'party', headerAlign: 'center', headerName: 'Party', flex: 1 },
        { field: 'nextElection', headerClassName: 'nextElection', headerAlign: 'center', headerName: 'Next Election', flex: 1 },
        { field: 'totalVotes', headerClassName: 'totalVotes', headerAlign: 'center', headerName: 'Total Votes', type: 'number', flex: 1 },
        { field: 'missedVotes', headerClassName: 'missedVotes', headerAlign: 'center', headerName: 'Missed Votes', type: 'number', flex: 1 },
        { field: 'totalPresent', headerClassName: 'totalPresent', headerAlign: 'center', headerName: 'Total Present', type: 'number', flex: 1 }
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
        switch (selectedMember.title) {
            case 'Representative':
                selectedMemberDisplay = `${selectedMember.title} ${selectedMember.first_name} ${selectedMember.middle_name === null ? '' : selectedMember.middle_name} ${selectedMember.last_name} | ${states[selectedMember.state]} ${districtGenerator(selectedMember.district)} District`;
                break;
            case 'Delegate':
                selectedMemberDisplay = `${selectedMember.title} ${selectedMember.first_name} ${selectedMember.middle_name === null ? '' : selectedMember.middle_name} ${selectedMember.last_name} | ${states[selectedMember.state]}`;
                break;
            default:
                selectedMemberDisplay = `${selectedMember.title.substring(0, 7)} ${selectedMember.first_name} ${selectedMember.middle_name === null ? '' : selectedMember.middle_name} ${selectedMember.last_name} | ${states[selectedMember.state]}`;
                break;
        }
    }

    const committeesDisplay = committees && committees.length > 0 ? (
        <div>
            <h2 style={{ margin: '10px' }}>Committees:</h2>
            {committees}
        </div>
    ) : null;

    const subcommitteesDisplay = subcommittees && subcommittees.length > 0 ? (
        <div>
            <h2 style={{ margin: '10px' }}>Subcommittees:</h2>
            {subcommittees}
        </div>
    ) : null;

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
                    {committeesDisplay}
                    {subcommitteesDisplay}
                    <h2 style={{ margin: '10px' }}>Cosponsored Bills:</h2>
                    {cosponsoredBills ? cosponsoredBills : 'Loading...'}
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