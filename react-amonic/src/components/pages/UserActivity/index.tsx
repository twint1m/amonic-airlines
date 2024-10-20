import React, { useState, useEffect } from 'react';
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

    'td.red': {
        backgroundColor: '#f8d7da',
        color: '#721c24',
    },
});

const UserActivityTable: React.FC = () => {
    const [timeSpent, setTimeSpent] = useState(0); // Время в секундах

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeSpent((prevTime) => prevTime + 1);
        }, 1000);

        // Очистка таймера при размонтировании компонента
        return () => clearInterval(timer);
    }, []);

    // Функция для форматирования времени в чч:мм:сс
    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Данные конкретного пользователя
    const userLogins = [
        {
            date: '02/13/2017',
            login_time: '8:25',
            logout_time: '**',
            time_spent: '**',
            unsuccessful_logout_reason: 'Power outage',
        },
        {
            date: '02/12/2017',
            login_time: '8:35',
            logout_time: '18:45',
            time_spent: '10:10',
            unsuccessful_logout_reason: '',
        },
        {
            date: '02/11/2017',
            login_time: '8:45',
            logout_time: '18:30',
            time_spent: '9:45',
            unsuccessful_logout_reason: '',
        },
    ];

    return (
        <>
            <p>Привет, Tim, Добро пожаловать в AMONIC Airlines.</p>
            <p>Время, проведённое в системе: {formatTime(timeSpent)} &nbsp;&nbsp;&nbsp; Количество сбоев: 0</p>

            <StyledTable>
                <thead>
                <tr>
                    <th>Дата</th>
                    <th>Время входа</th>
                    <th>Время выхода</th>
                    <th>Время в системе</th>
                    <th>Причина неудачного выхода</th>
                </tr>
                </thead>
                <tbody>
                {userLogins.map((login, index) => (
                    <tr key={index} className={login.unsuccessful_logout_reason ? 'red' : ''}>
                        <td>{login.date}</td>
                        <td>{login.login_time}</td>
                        <td>{login.logout_time}</td>
                        <td>{login.time_spent}</td>
                        <td>{login.unsuccessful_logout_reason || ''}</td>
                    </tr>
                ))}
                </tbody>
            </StyledTable>
        </>
    );
};

export default UserActivityTable;
