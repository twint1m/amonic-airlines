import React from 'react';
import { styled } from '@mui/system';

const StyledTable = styled('table')({
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: 'Arial, sans-serif',
    marginBottom: '20px',

    'th, td': {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
    },

    'th': {
        backgroundColor: '#f2f2f2',
        fontWeight: 'bold',
    },

    '.error': {
        backgroundColor: '#f8d7da',
        color: '#721c24',
    }
});

const activityLogs = [
    { date: '02/13/2017', loginTime: '17:15', logoutTime: '18:45', timeSpent: '1:30', crashReason: '' },
    { date: '02/13/2017', loginTime: '8:25', logoutTime: '**', timeSpent: '**', crashReason: 'Power outage' },
    { date: '02/12/2017', loginTime: '8:35', logoutTime: '18:45', timeSpent: '10:10', crashReason: '' },
    { date: '02/11/2017', loginTime: '8:45', logoutTime: '18:30', timeSpent: '9:45', crashReason: '' },
];

const UserActivityTable: React.FC = () => {
    return (
        <>
            <p>Hi Henri, Welcome to AMONIC Airlines.</p>
            <p>Time spent on system: 00:19:03 &nbsp;&nbsp;&nbsp; Number of crashes: 1</p>

            <StyledTable>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Login time</th>
                    <th>Logout time</th>
                    <th>Time spent on system</th>
                    <th>Unsuccessful logout reason</th>
                </tr>
                </thead>
                <tbody>
                {activityLogs.map((log, index) => (
                    <tr key={index} className={log.crashReason ? 'error' : ''}>
                        <td>{log.date}</td>
                        <td>{log.loginTime}</td>
                        <td>{log.logoutTime}</td>
                        <td>{log.timeSpent}</td>
                        <td>{log.crashReason}</td>
                    </tr>
                ))}
                </tbody>
            </StyledTable>
        </>
    );
};

export default UserActivityTable;
