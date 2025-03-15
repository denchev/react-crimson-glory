import './App.css';
import { Outlet } from 'react-router';
import Nav from './components/Nav';
import { Container } from '@mui/material';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Container>
        <Nav />
        <Outlet />
      </Container>
    </AuthProvider>
  );
}

export default App;
