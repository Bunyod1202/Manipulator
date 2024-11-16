import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

interface ManipulatorProps {
    onSendCommands: (commands: string) => void;
}
function optimizeCommands(commands: string): string {
    const regex = /(.)\1+/g;
    let optimized = commands.replace(regex, (match, char) => `${match.length}${char}`);

    const patternRegex = /(.+?)\1+/g;
    optimized = optimized.replace(patternRegex, (match, pattern) => {
        const count = match.length / pattern.length;
        return `${count}(${pattern})`;
    });

    return optimized;
}
const Manipulator: React.FC<ManipulatorProps> = ({ onSendCommands }) => {
    const { control, handleSubmit, reset } = useForm<{ commands: string }>();
    const [optimizedCommands, setOptimizedCommands] = useState('');

    const onSubmit = (data: { commands: string }) => {
        const optimized = optimizeCommands(data.commands);
        setOptimizedCommands(optimized);
        onSendCommands(optimized);
        reset();
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
            <Controller
                name="commands"
                control={control}
                defaultValue=""
                rules={{ required: 'Commands are required' }}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        label="Enter commands"
                        fullWidth
                        margin="normal"
                        error={!!error}
                        helperText={error?.message}
                    />
                )}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                Send Commands
            </Button>
            {optimizedCommands && (
                <Box mt={2}>
                    <strong>Optimized commands:</strong> {optimizedCommands}
                </Box>
            )}
        </Box>
    );
};

export default Manipulator;