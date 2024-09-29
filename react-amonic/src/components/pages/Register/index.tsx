import * as React from 'react';
import { AuthProvider as ToolpadAuthProvider, AppProvider, SignInPage } from '@toolpad/core';
import { useTheme } from '@mui/material/styles';

type SupportedAuthProvider = 'credentials';

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
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const response = await fetch('http://127.0.0.1:8000/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            const token = data.token;
            localStorage.setItem('token', token);
            window.location.href = data.redirect_url;
        } else {
            alert(data.error || 'Invalid credentials');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Error connecting to the server');
    }
};

export default function CredentialsSignInPage() {
    const theme = useTheme();
    return (
        <AppProvider theme={theme}>
            <SignInPage
                signIn={signIn}
                providers={providers}
                slotProps={{
                    forgotPasswordLink: { style: { display: "block" } },
                }}
            />
        </AppProvider>
    );
}
