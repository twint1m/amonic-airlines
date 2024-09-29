import React, { useState, useEffect } from "react";
import Input from '../../ui/Input';
import { Select, Option } from '../../ui/Select';
import { styled } from "@mui/system";
import Button from '../../ui/Buttons/BlueButton';
import DateInput from "../../ui/DateInput";
import { RedCancelButton } from "../../ui/Buttons/RedCancelButton";
import axios from "axios";

const AddUser: React.FC = () => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [password, setPassword] = useState("");
    const [offices, setOffices] = useState([]);

    useEffect(() => {
        const fetchOffices = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:8000/api/offices/', {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
                setOffices(response.data);
            } catch (error) {
                console.error("Ошибка при получении офисов:", error);
            }
        };

        fetchOffices();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userData = { email, first_name: firstName, last_name: lastName, role, birthdate, password };

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://127.0.0.1:8000/api/users/add/', userData, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });
        } catch (error) {
            console.error("Ошибка при добавлении пользователя:", error);
        }
    };

    return (
        <CenteredContainer>
            <h1>Add User</h1>
            <FormContainer onSubmit={handleSubmit}>
                <Input placeholder={'E-mail'} value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder={'First name'} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <Input placeholder={'Last name'} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <SelectWrapper>
                    <StyledSelect value={role} onChange={(event, value) => setRole(value)}>
                        {offices.map((office) => (
                            <Option key={office.id} value={office.id}>
                                {office.title}
                            </Option>
                        ))}
                    </StyledSelect>
                </SelectWrapper>
                <DateInputWrapper>
                    <DateInput value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
                </DateInputWrapper>
                <Input type={'password'} placeholder={'Password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                <ButtonContainer>
                    <Button type="submit">Submit</Button>
                    <RedCancelButton onClick={() => {/* handle cancel */}}>Cancel</RedCancelButton>
                </ButtonContainer>
            </FormContainer>
        </CenteredContainer>
    );
};

const CenteredContainer = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
`;

const FormContainer = styled('form')`
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 400px;
    width: 100%;
`;

const ButtonContainer = styled('div')`
    display: flex;
    justify-content: space-between;
`;

const SelectWrapper = styled('div')`
    width: 100%;
`;

const StyledSelect = styled(Select)`
    width: 100%;
    min-width: 100%;
`;

const DateInputWrapper = styled('div')`
    width: 100%;
`;

export default AddUser;
