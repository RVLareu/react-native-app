import React, { useState } from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { ThemeProvider } from "react-native-rapi-ui";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [register, setRegister] = useState(false)
  const [auth, setAuth] = useState(false)
  return (
    <ThemeProvider>
      {!loggedIn && <Login setLoggedIn={setLoggedIn} setRegister={setRegister} setAuth={setAuth}/>}
      {register && <Register setLoggedIn={setLoggedIn} setRegister={setRegister} setAuth={setAuth}/>}

      {auth && <AppNavigator />}
    </ThemeProvider>
  );
}
