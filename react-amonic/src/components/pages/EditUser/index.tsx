import React from "react";
import Input from '../../ui/Input'
import {Select} from '../../ui/Select'
import {styled} from "@mui/system";
import Button from '../../ui/Buttons/BlueButton'
import RadioButton from '../../ui/Radio'
import {RedCancelButton} from "../../ui/Buttons/RedCancelButton";

const EditUser : React.FC = () => {
    return (
        <>
            <h1>Edit user</h1>
            <FormContainer>
                <Input placeholder={'E-mail'}/>
                <Input placeholder={'First name'}/>
                <Input placeholder={'Last name'}/>
                <Select/>
                <RadioButton/>
                <Container>
                    <Button>Apply</Button>
                    <RedCancelButton>Cancel</RedCancelButton>
                </Container>
            </FormContainer>
        </>
    )
}
const FormContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center'
});

const Container = styled('div')({
    display: 'flex',
    gap: '10px',
})
export default EditUser