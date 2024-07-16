import React, { useEffect } from "react";
import { ChakraProvider, theme as chakraTheme } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./ReduxToolkit/store";
import { setUser, clearUser } from './ReduxToolkit/userSlice';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Overview from "./components/overview/Overview";
import Login from "./components/Auth/Login/Login";
import SignUp from "./components/Auth/SignUp/SignUp";

const App = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  function isTokenExpired(token) {
    const payloadBase64 = token.split('.')[1];
    const decodedJson = atob(payloadBase64);
    const decoded = JSON.parse(decodedJson);
    const exp = decoded.exp * 1000; // JWT exp is in seconds
    const currentTime = Date.now();
    const timeLeft = (exp - currentTime) / 60000; // Calculate time left in minutes
  
    if (timeLeft > 0) {
      console.log(`Token will expire in ${timeLeft.toFixed(2)} minutes`); // Log the time left
      return false;
    } else {
      console.log("Token has expired"); // Log expired token
      return true;
    }
  }
  

  useEffect(() => {
    console.log("Checking local storage for user data...");
    const userData = localStorage.getItem('user');
    console.log("Retrieved user data from local storage:", userData);
    if (userData) {
      const parsedUser = JSON.parse(userData);
      console.log("Parsed user data:", parsedUser);
      if (!isTokenExpired(parsedUser.token)) {
        console.log("Token is valid, dispatching setUser...");
        dispatch(setUser(parsedUser));
      } else {
        console.log("Token is expired, clearing user data...");
        localStorage.removeItem('user');
        dispatch(clearUser());
      }
    }
  }, [dispatch]);
  
  

  return (
    <ChakraProvider theme={chakraTheme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={user ? <Navigate replace to="/overview" /> : <Login />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate replace to="/overview" /> : <SignUp />}
            />
            <Route
              path="/overview"
              element={user ? <Overview /> : <Navigate replace to="/login" />}
            />
          </Routes>
        </Router>
      </Provider>
    </ChakraProvider>
  );
};

export default App;
