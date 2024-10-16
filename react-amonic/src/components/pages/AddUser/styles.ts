import { styled } from "@mui/system";

export const CenteredContainer = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
`;

export const FormContainer = styled('form')`
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 400px;
    width: 100%;
`;

export const StyledInput = styled('input')`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
`;

export const StyledSelect = styled('select')`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
`;

export const StyledButton = styled('button')`
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

export const ButtonContainer = styled('div')`
    display: flex;
    justify-content: space-between;
`;

export const UserDetails = styled('div')`
    margin-top: 20px;
    white-space: pre-wrap;
`;
