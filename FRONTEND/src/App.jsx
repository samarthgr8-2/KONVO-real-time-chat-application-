import React from 'react'
import { Route,Routes } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import OnboardingPage from './pages/OnboardingPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import NotificationsPage from "./pages/NotificationsPage.jsx";
import CallPage from './pages/CallPage.jsx';
import toast, { Toaster } from 'react-hot-toast';
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import { axiosInstance } from './lib/axios.js';
import { Navigate } from 'react-router';
import PageLoader from './components/PageLoader.jsx';
import useAuthUser from './hooks/useAuthUser.js';
import Layout from './components/Layout.jsx';
import { useThemeStore } from './store/useThemeStore.js';




const App = () => {


  const { isLoading, authUser } = useAuthUser();


  const {theme}=useThemeStore();




  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;







  //react-hot-toasts
  // <div className='bg-red-500 h-screen text-6xl'>App</div> //make the entire screen red ie 100% viewport height



  // console.log({data});
  // console.log({isLoading});
  // console.log({error});
  


if(isLoading) return <PageLoader/>;



//ZUSTAND PACKAGE WILL BE USED FOR THEME SELECTION



  return (
    <div className="h-screen" data-theme={theme}>
      {/* <button onClick={() => toast.success("Hello world!")}>
        Create a Toast
      </button> */}
      {/* Routes are defined here */}
      {/* <button onClick={()=>setTheme("night")}>Update to night</button> */}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignUpPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (

              <Layout showSidebar={true}>
                <NotificationsPage/> 
              </Layout>
            ):(
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>
            )
          }
        />
        <Route
          path="/call/:id"
          element={isAuthenticated && isOnboarded ?
            (
              <CallPage/>
            ) : (
              <Navigate  to={!isAuthenticated ? "/login" : "/onboarding"}/>
            )
          }
        />
        <Route
          path="/chat/:id"
          element={isAuthenticated && isOnboarded ? 
            (<Layout showSidebar={false}>
              <ChatPage/>
            </Layout>) : (
              <Navigate to={!isAuthenticated ?"/login" : "/onboarding" }/>
            )
          }
        />
      </Routes>
      {/* <Toaster  /> */}
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

export default App;



