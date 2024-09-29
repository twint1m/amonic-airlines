import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import axios from "axios";

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
    '.active': {
        backgroundColor: '#dff0d8',
    },
    '.inactive': {
        backgroundColor: '#f2dede',
    }
});

const UsersTable: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.get('http://127.0.0.1:8000/api/users/', {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });

                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch users");
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div>
                <label htmlFor="officeSelect">Office:</label>
                <select id="officeSelect">
                    <option>All offices</option>
                    <option>Abu Dhabi</option>
                    <option>Bahrain</option>
                    <option>Doha</option>
                </select>
            </div>

            <StyledTable>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                    <th>User Role</th>
                    <th>Email Address</th>
                    <th>Office</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr key={index} className={user.active ? 'active' : 'inactive'}>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.age}</td>
                        <td>{user.role}</td>
                        <td>{user.email}</td>
                        <td>{user.office}</td>
                    </tr>
                ))}
                </tbody>
            </StyledTable>
            <div>
                <button>Change Role</button>
                <button>Enable/Disable Login</button>
            </div>
        </>
    );
}

export default UsersTable;
