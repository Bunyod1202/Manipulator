import React, { useState } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Auth from './components/Auth';
import Manipulator from './components/Manipulator';
import Visualizer from './components/Visualizer';
import History from './components/History';
import Notification from './components/Notification';

const theme = createTheme();

interface HistoryEntry {
  originalCommand: string;
  optimizedCommand: string;
  date: string;
  time: string;
  beforeState: string;
  afterState: string;
}

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [commands, setCommands] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleLogin = (username: string, password: string) => {
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
    }
  };

  const handleSendCommands = (optimizedCommands: string) => {
    setCommands(optimizedCommands);
    const now = new Date();
    setHistory(prev => [
      ...prev,
      {
        originalCommand: commands,
        optimizedCommand: optimizedCommands,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        beforeState: 'Initial State',
        afterState: 'Final State',
      },
    ]);
    setNotificationOpen(true);
  };

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          {!isLoggedIn ? (
              <Auth onLogin={handleLogin} />
          ) : (
              <>
                <Manipulator onSendCommands={handleSendCommands} />
                <Visualizer commands={commands} speed={500} />
                <History entries={history} />
                <Notification
                    open={notificationOpen}
                    message="Operation completed successfully!"
                    onClose={() => setNotificationOpen(false)}
                />
              </>
          )}
        </Container>
      </ThemeProvider>
  );
};

export default App;