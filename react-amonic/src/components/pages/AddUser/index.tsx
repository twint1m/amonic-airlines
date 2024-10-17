import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    CenteredContainer,
    FormContainer,
    StyledInput,
    StyledSelect,
    StyledButton,
    ButtonContainer,
    UserDetails
} from './styles';

const AddUser: React.FC = () => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [password, setPassword] = useState("");
    const [officeId, setOfficeId] = useState("");
    const [offices, setOffices] = useState([]);
    const [newUser, setNewUser] = useState(null);

    useEffect(() => {
        const fetchOffices = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/offices/');
                setOffices(response.data);
            } catch (error) {
                console.error("Ошибка при получении офисов:", error);
            }
        };

        fetchOffices();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            email: email,
            first_name: firstName,
            last_name: lastName,
            birthdate: birthdate,
            password: password,
            office: officeId,
            role: 2,  // Устанавливаем роль по умолчанию как 2
        };

        console.log("User data to submit:", userData);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/add/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(userData),  // Преобразуем объект в JSON
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log('Ошибка при добавлении пользователя:', errorData);
                alert('Ошибка при добавлении пользователя');
                return;
            }

            const newUser = await response.json();
            setNewUser(newUser);  // Сохраняем нового пользователя в состоянии
            console.log('Пользователь успешно добавлен:', newUser);
            alert('Пользователь успешно добавлен');
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при добавлении пользователя');
        }
    };

    return (
        <CenteredContainer>
            <h1>Add User</h1>
            <FormContainer onSubmit={handleSubmit}>
                <StyledInput
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <StyledInput
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <StyledInput
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <StyledSelect value={officeId} onChange={(e) => setOfficeId(e.target.value)}>
                    <option value="" disabled>Select Office</option>
                    {offices.map((office) => (
                        <option key={office.id} value={office.id}>
                            {office.title}
                        </option>
                    ))}
                </StyledSelect>
                <StyledInput
                    type="date"
                    placeholder="Birthdate"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                />
                <StyledInput
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <ButtonContainer>
                    <StyledButton type="submit">Submit</StyledButton>
                    <StyledButton type="button" onClick={() => {/* handle cancel */}}>Cancel</StyledButton>
                </ButtonContainer>
            </FormContainer>
        </CenteredContainer>
    );
};

export default AddUser;
