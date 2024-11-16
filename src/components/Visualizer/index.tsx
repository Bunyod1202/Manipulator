import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper } from '@mui/material';

interface VisualizerProps {
    commands: string;
    speed: number;
}

const Visualizer: React.FC<VisualizerProps> = ({ commands, speed }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [sample, setSample] = useState<{ x: number; y: number } | null>(null);
    useEffect(() => {
        const executeCommands = async () => {
            for (const command of commands) {
                await new Promise(resolve => setTimeout(resolve, speed));
                setPosition(prev => {
                    switch (command) {
                        case 'Л':
                            return { ...prev, x: Math.max(0, prev.x - 1) };
                        case 'П':
                            return { ...prev, x: Math.min(4, prev.x + 1) };
                        case 'В':
                            return { ...prev, y: Math.max(0, prev.y - 1) };
                        case 'Н':
                            return { ...prev, y: Math.min(4, prev.y + 1) };
                        default:
                            return prev;
                    }
                });
    
                if (command === 'О') {
                    setSample(prev => prev); // Access current position state directly
                } else if (command === 'Б') {
                    setSample(null);
                }
            }
        };
    
        if (commands) {
            executeCommands();
        }
    }, [commands, speed]); // No need to include 'position' here
    // useEffect(() => {
    //     const executeCommands = async () => {
    //         for (const command of commands) {
    //             await new Promise(resolve => setTimeout(resolve, speed));
    //             switch (command) {
    //                 case 'Л':
    //                     setPosition(prev => ({ ...prev, x: Math.max(0, prev.x - 1) }));
    //                     break;
    //                 case 'П':
    //                     setPosition(prev => ({ ...prev, x: Math.min(4, prev.x + 1) }));
    //                     break;
    //                 case 'В':
    //                     setPosition(prev => ({ ...prev, y: Math.max(0, prev.y - 1) }));
    //                     break;
    //                 case 'Н':
    //                     setPosition(prev => ({ ...prev, y: Math.min(4, prev.y + 1) }));
    //                     break;
    //                 case 'О':
    //                     setSample(position);
    //                     break;
    //                 case 'Б':
    //                     setSample(null);
    //                     break;
    //             }
    //         }
    //     };

    //     executeCommands();
    // }, [commands, speed]);

    return (
        <Box sx={{ width: 250, height: 250, margin: 'auto', mt: 4 }}>
            <Grid container spacing={1}>
                {Array.from({ length: 25 }).map((_, index) => {
                    const x = index % 5;
                    const y = Math.floor(index / 5);
                    return (
                        <Grid item xs={2.4} key={index}>
                            <Paper
                                sx={{
                                    height: 50,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor:
                                        x === position.x && y === position.y
                                            ? 'primary.main'
                                            : sample && x === sample.x && y === sample.y
                                                ? 'secondary.main'
                                                : 'default',
                                }}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default Visualizer;