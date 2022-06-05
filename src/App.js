import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import styled from "styled-components";
import NavigationBar from "./components/NavigationBar";
import StickyFooter from "./components/StickyFooter";
import StepsDiv from "./components/StepsDiv";
import Testimonials from "./components/Testimonials";
import { config } from "./config/config";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import AboutUs from "./pages/Poll_Results";
import LoginPage from "./pages/Login";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import SignUp from "./pages/SignUp";
import NewPoll from "./pages/NewPoll";
import UserProfile from "./pages/UserProfile";
import PrePoll from "./pages/PrePoll";
import ConfirmPayment from "./pages/ConfirmPayment";
import { RefreshTokenContext } from "./store/RefreshTokenContext";

// get data from firestore
initializeApp(config.firebaseConfig);

const AuthenticatedComponent = ({ children }) => {
  const tokenFromCookies = localStorage.getItem("UserAccessToken");
  if (tokenFromCookies) {
    console.log(children);
    return children;
  }
  return <LoginPage />;
};

async function newRefreshToken() {
  console.log("New Refresh Token Function")
  let newData, resData;

  const dataToServer = {
    refreshToken: localStorage.getItem("UserRefreshToken"),
  };

  const access = localStorage.getItem("UserAccessToken");

  const auth = "Bearer " + access;

  const json = JSON.stringify(dataToServer);

  const res = await fetch("https://poll-it.cs.colman.ac.il/auth/refreshToken", {
    method: "POST",
    body: json,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
  });
  resData = res;
  newData = await res.json();

  if (resData.ok) {
    console.log("Update Tokens")
    localStorage.setItem("UserRefreshToken", newData.refreshToken);
    localStorage.setItem("UserAccessToken", newData.accessToken);
    return (resData)
  } else {
    console.log("New Token Error")
  }

}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <RefreshTokenContext.Provider value={newRefreshToken}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about_us" element={<AboutUs />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/NewPoll" element={<NewPoll />} />
            <Route path="/ConfirmPayment" element={<ConfirmPayment />} />
            
            <Route
              path="/prePoll"
              element={
                <AuthenticatedComponent>
                  <PrePoll />
                </AuthenticatedComponent>
              }
            />
            <Route
              path="/userProfile"
              element={
                <AuthenticatedComponent>
                  <UserProfile />
                </AuthenticatedComponent>
              }
            />
          </Routes>
        </RefreshTokenContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
