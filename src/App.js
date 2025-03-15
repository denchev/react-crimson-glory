import './App.css';
import { Outlet } from 'react-router';
import Nav from './components/Nav';
import { Container } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import WrappedTheme from './components/WrappedTheme';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <WrappedTheme>
          <Container>
            <Nav />
            <Outlet />
        </Container>
      </WrappedTheme>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
