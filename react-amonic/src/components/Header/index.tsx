import React from "react";
import {styled} from "@mui/system";

const Header: React.FC = () => {
    return (
        <HeaderTitle>AMONIC Airlines Automation System</HeaderTitle>
    )
}

const HeaderTitle = styled('h1')({
    textAlign:"center",
})

export default Header