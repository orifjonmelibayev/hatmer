import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './index.css'
import App from './App'
import Detail from './routes/Detail';
import TodoList from './routes/TodoList';
import { ChakraProvider } from '@chakra-ui/react';
import SignIn from './pages/SignIn';
import SignUp from "./pages/SignUp";
import { AuthProvider } from './hooks/auth';

ReactDOM.render(
  <React.StrictMode>
      <AuthProvider>
        <ChakraProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />}>
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="detail/:id" element={<Detail />} />
                <Route index element={<TodoList />} />
              </Route>
              <Route
                path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>There's nothing here!</p>
                  </main>
                }
              />
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
