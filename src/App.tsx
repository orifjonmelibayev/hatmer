import { Box, VStack } from '@chakra-ui/react';
import { Outlet, Link } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar';

function App() {

  return (
    <>
        <Navbar></Navbar>
        <Box>
          <Outlet />
        </Box>
    </>
  )
}

export default App
