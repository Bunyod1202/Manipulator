import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface HistoryEntry {
    originalCommand: string;
    optimizedCommand: string;
    date: string;
    time: string;
    beforeState: string;
    afterState: string;
}

interface HistoryProps {
    entries: HistoryEntry[];
}

const History: React.FC<HistoryProps> = ({ entries }) => {
    return (
        <TableContainer component={Paper} sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Original Command</TableCell>
                        <TableCell>Optimized Command</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Before State</TableCell>
                        <TableCell>After State</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {entries.map((entry, index) => (
                        <TableRow key={index}>
                            <TableCell>{entry.originalCommand}</TableCell>
                            <TableCell>{entry.optimizedCommand}</TableCell>
                            <TableCell>{entry.date}</TableCell>
                            <TableCell>{entry.time}</TableCell>
                            <TableCell>{entry.beforeState}</TableCell>
                            <TableCell>{entry.afterState}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default History;