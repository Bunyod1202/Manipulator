import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';

interface LoginForm {
    username: string;
    password: string;
}

interface AuthProps {
    onLogin: (username: string, password: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
    const { control, handleSubmit } = useForm<LoginForm>();

    const onSubmit = (data: LoginForm) => {
        onLogin(data.username, data.password);
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 300, margin: 'auto', mt: 4 }}>
            <Controller
                name="username"
                control={control}
                defaultValue=""
                rules={{ required: 'Username is required' }}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        label="Username"
                        fullWidth
                        margin="normal"
                        error={!!error}
                        helperText={error?.message}
                    />
                )}
            />
            <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: 'Password is required' }}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        error={!!error}
                        helperText={error?.message}
                    />
                )}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                Login
            </Button>
        </Box>
    );
};

export default Auth;