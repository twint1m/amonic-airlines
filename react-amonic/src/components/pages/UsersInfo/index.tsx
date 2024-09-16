import React from "react";
import { styled } from "@mui/system";

// Определяем стили для таблицы
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
        backgroundColor: '#dff0d8', // Зелёный фон для активных
    },

    '.inactive': {
        backgroundColor: '#f2dede', // Красный фон для неактивных
    }
});

const users = [
    { name: "Peter", lastName: "Severin", age: 40, role: "administrator", email: "peter.s@yahoo.com", office: "Abu Dhabi", active: true },
    { name: "Henri", lastName: "Kerasha", age: 24, role: "user", email: "severin2007@gmail.com", office: "Abu Dhabi", active: true },
    { name: "Olga", lastName: "Navin", age: 65, role: "user", email: "olga.olga@gmail.com", office: "Bahrain", active: true },
    { name: "Henri", lastName: "Morf", age: 34, role: "administrator", email: "h.morg@amonic.com", office: "Doha", active: true },
    { name: "Mahan", lastName: "Aliof", age: 45, role: "user", email: "aliof1985@gmail.com", office: "Bahrain", active: false },
    { name: "Iraj", lastName: "Asadi", age: 37, role: "administrator", email: "asadi.irajj@amonic.com", office: "Doha", active: false }
];

const UsersTable: React.FC = () => {
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
                        <td>{user.name}</td>
                        <td>{user.lastName}</td>
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
