import * as React from 'react';
import { AuthProvider as ToolpadAuthProvider, AppProvider, SignInPage } from '@toolpad/core';
import { useTheme } from '@mui/material/styles';

type SupportedAuthProvider = 'credentials' | 'google' | 'github';

interface CustomAuthProvider {
    id: SupportedAuthProvider;
    name: string;
}

// preview-start
const providers: CustomAuthProvider[] = [
    { id: 'credentials', name: 'Email and Password' }
];
// preview-end

const signIn: (provider: ToolpadAuthProvider, formData: FormData) => void = async (
    provider,
    formData,
) => {
    const promise = new Promise<void>((resolve) => {
        setTimeout(() => {
            alert(
                `Signing in with "${provider.name}" and credentials: ${formData.get('email')}, ${formData.get('password')}`,
            );
            resolve();
        }, 300);
    });
    return promise;
};

export default function CredentialsSignInPage() {
    const theme = useTheme();
    return (
        <AppProvider theme={theme}>
            <SignInPage         signIn={signIn}
                                providers={providers}
                                slotProps={{
                                    forgotPasswordLink: { style: {display: "block"} },
                                }} />
        </AppProvider>
    );
}
