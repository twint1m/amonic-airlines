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
    const [selectedOffice, setSelectedOffice] = useState<string>("All offices");
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [offices, setOffices] = useState<string[]>([]);
    const [refresh, setRefresh] = useState<boolean>(false); // Добавлен новый state для перезапроса

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:8000/api/users/', {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });

                const usersData = response.data;
                const uniqueOffices = [
                    "All offices",
                    "Without Office",
                    ...new Set(usersData.map((user: any) => user.office).filter((office: any) => office))
                ];

                setUsers(usersData);
                setOffices(uniqueOffices);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch users");
                setLoading(false);
            }
        };

        fetchUsers();
    }, [refresh]); // Обновление данных при изменении refresh

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:8000/api/users/', {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });

                const usersData = response.data;
                setUsers(usersData);
            } catch (error) {
                console.error("Failed to fetch users after update:", error);
            }
        };

        if (selectedUserId !== null) {
            fetchUsers();
        }
    }, [selectedUserId]);

    const handleOfficeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOffice(event.target.value);
    };

    const handleUserClick = (userId: number) => {
        setSelectedUserId(userId);
    };

    const filteredUsers = selectedOffice === "All offices"
        ? users
        : selectedOffice === "Without Office"
            ? users.filter(user => !user.office)
            : users.filter(user => user.office === selectedOffice);

    const toggleRole = async () => {
        if (selectedUserId === null) {
            console.error("Пользователь не выбран");
            return;
        }

        const currentUser = users.find(user => user.id === selectedUserId);
        if (!currentUser) {
            console.error("Пользователь не найден");
            return;
        }

        const newRoleId = currentUser.role === "Administrator" ? 2 : 1;

        try {
            const token = localStorage.getItem('token');
            await axios.patch(`http://127.0.0.1:8000/api/users/${selectedUserId}/change-role/`, {
                role: newRoleId,
            }, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            setRefresh(prev => !prev); // Переключаем refresh для обновления данных
        } catch (error) {
            console.error("Error toggling role:", error);
        }
    };

    const toggleActiveStatus = async () => {
        if (selectedUserId === null) {
            console.error("Пользователь не выбран");
            return;
        }

        const currentUser = users.find(user => user.id === selectedUserId);
        if (!currentUser) {
            console.error("Пользователь не найден");
            return;
        }

        const newActiveStatus = !currentUser.active;

        try {
            const token = localStorage.getItem('token');
            await axios.patch(`http://127.0.0.1:8000/api/users/${selectedUserId}/toggle-active/`, {
                active: newActiveStatus,
            }, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            setRefresh(prev => !prev); // Переключаем refresh для обновления данных
        } catch (error) {
            console.error("Error toggling active status:", error);
        }
    };

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
                <select id="officeSelect" value={selectedOffice} onChange={handleOfficeChange}>
                    {offices.map((office) => (
                        <option key={office} value={office}>
                            {office}
                        </option>
                    ))}
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
                {filteredUsers.map((user) => (
                    <tr
                        key={user.id}
                        className={`${user.active ? 'active' : 'inactive'}`}
                        onClick={() => handleUserClick(user.id)}
                    >
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.age}</td>
                        <td>{user.role}</td>
                        <td>{user.email}</td>
                        <td>{user.office || "Without Office"}</td>
                    </tr>
                ))}
                </tbody>
            </StyledTable>
            <div>
                <button onClick={toggleRole} disabled={selectedUserId === null}>Change Role</button>
                <button onClick={toggleActiveStatus} disabled={selectedUserId === null}>
                    {selectedUserId !== null && users.find(user => user.id === selectedUserId) && users.find(user => user.id === selectedUserId).active ? "Disable" : "Enable"} Login
                </button>
            </div>
        </>
    );
}

export default UsersTable;
