import React, { useState } from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { ThemeProvider } from "react-native-rapi-ui";
import Login from "./src/screens/Login";
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <ThemeProvider>
      {!loggedIn && <Login setLoggedIn={setLoggedIn}/>}
      {loggedIn && <AppNavigator />}
    </ThemeProvider>
  );
}
