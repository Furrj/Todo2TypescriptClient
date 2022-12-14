import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//UI
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";

//VIEWS
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import HomePage from "./views/HomePage";
import MyTodos from "./views/MyTodos";
import MyCompletedTodos from "./views/MyCompletedTodos";
import Dashboard from "./views/Dashboard";

//STATE
export type IUser = {
  username: string;
  id: string;
  valid: boolean;
};

export const initState = {
  username: "",
  id: "",
  valid: false,
};

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUser>(initState);

  return (
    <BrowserRouter>
      <div>
        <Navbar
          userName={userInfo.username}
          loggedIn={loggedIn}
          setUserInfo={setUserInfo}
          setLoggedIn={setLoggedIn}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <LoginPage
                setLoggedIn={setLoggedIn}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
              />
            }
          />
          <Route
            path="/register"
            element={
              <RegisterPage
                setLoggedIn={setLoggedIn}
                setUserInfo={setUserInfo}
              />
            }
          />
          <Route path="/mytodos" element={<MyTodos userId={userInfo.id} />} />
          <Route
            path="mycompletedtodos"
            element={<MyCompletedTodos userID={userInfo.id} />}
          />
          <Route path="dashboard" element={<Dashboard userInfo={userInfo} />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
