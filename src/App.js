import './App.css';
import { Outlet } from 'react-router';
import Nav from './components/Nav';
import { Container } from '@mui/material';

function App() {
  return (
    <Container>
      <Nav />
      <Outlet />
    </Container>
  );
}

export default App;
